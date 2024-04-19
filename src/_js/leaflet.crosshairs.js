L.Crosshairs = L.LayerGroup.extend({
    options: {
        style: {
            opacity: 1,
            fillOpacity: 0,
            weight: 2,
            color: '#333',
            clickable: false,
            pointerEvents: 'none'
        }
    },
    initialize: function(options) {
        L.LayerGroup.prototype.initialize.call(this);
        L.Util.setOptions(this, options);
        this.mode = 1; // 0 = normal, 1 = compass, 2 = time, 3 = 16 lines
        this.crosshair = {
            longitude_line_north: L.polyline([], this.options.style),
            longitude_line_south: L.polyline([], this.options.style),
            latitude_line_east: L.polyline([], this.options.style),
            latitude_line_west: L.polyline([], this.options.style),
            diagonal_ne: L.polyline([], { color: 'none', weight: 2 }),
            diagonal_nw: L.polyline([], { color: 'none', weight: 2 }),
            diagonal_se: L.polyline([], { color: 'none', weight: 2 }),
            diagonal_sw: L.polyline([], { color: 'none', weight: 2 }),
            clock_lines: [],
            compass_lines: [],
            sixteen_lines: [] // New line array for 16 lines mode
        };

        // Initialize 12 clock lines
        for (let i = 1; i <= 12; i++) {
            let angle = (Math.PI / 6) * i;
            this.crosshair.clock_lines.push(L.polyline([], { color: 'blue', weight: 2 }));
        }

        // Initialize 8 compass lines
        for (let i = 0; i < 8; i++) {
            let angle = (Math.PI / 4) * i;
            this.crosshair.compass_lines.push(L.polyline([], { color: 'red', weight: 2 }));
        }

        // Initialize 16 lines for the new mode
        for (let i = 0; i < 16; i++) {
            let angle = (Math.PI / 8) * i;
            this.crosshair.sixteen_lines.push(L.polyline([], { color: 'white', weight: 2 }));
        }

        this.anchorLatLng = null;
        for (var layer in this.crosshair) {
            if (Array.isArray(this.crosshair[layer])) {
                this.crosshair[layer].forEach(l => this.addLayer(l));
            } else {
                this.addLayer(this.crosshair[layer]);
            }
        }
    },
    onAdd: function(map) {
        this._map = map;
        this._map.on('click', this._setAnchor, this);
        this._map.on('move', this._updateCrosshairs, this);
        this._map.on('zoomend', this._updateCrosshairs, this);
        this._map.on('mouseover', this._show.bind(this));
        this.eachLayer(map.addLayer, map);
        this._moveCrosshairs({ latlng: this._map.getCenter() });
        this._updateVisibility();  // Update visibility based on initial mode
    },
    onRemove: function(map) {
        this._map.off('click', this._setAnchor);
        this._map.off('move', this._updateCrosshairs);
        this._map.off('zoomend', this._updateCrosshairs);
        this.eachLayer(map.removeLayer, this);
    },
    _setAnchor: function(e) {
        this.anchorLatLng = e.latlng;
        this._moveCrosshairs(e);
    },
    _updateCrosshairs: function() {
        if (this.anchorLatLng) {
            this._moveCrosshairs({ latlng: this.anchorLatLng });
        }
    },
    _moveCrosshairs: function(e) {
        var center = e.latlng;
        this.crosshair.latitude_line_east.setLatLngs([
            [center.lat, this._map.getBounds().getWest()],
            [center.lat, this._map.getBounds().getEast()]
        ]);
        this.crosshair.longitude_line_north.setLatLngs([
            [this._map.getBounds().getNorth(), center.lng],
            [center.lat, center.lng]
        ]);
        this.crosshair.longitude_line_south.setLatLngs([
            [center.lat, center.lng],
            [this._map.getBounds().getSouth(), center.lng]
        ]);
        const diagonalLength = 10000000; // Fixed distance for diagonal lines from the center
        this.crosshair.diagonal_ne.setLatLngs([
            [center.lat, center.lng],
            [center.lat + diagonalLength, center.lng + diagonalLength]
        ]);
        this.crosshair.diagonal_nw.setLatLngs([
            [center.lat, center.lng],
            [center.lat + diagonalLength, center.lng - diagonalLength]
        ]);
        this.crosshair.diagonal_se.setLatLngs([
            [center.lat, center.lng],
            [center.lat - diagonalLength, center.lng + diagonalLength]
        ]);
        this.crosshair.diagonal_sw.setLatLngs([
            [center.lat, center.lng],
            [center.lat - diagonalLength, center.lng - diagonalLength]
        ]);
        // Update clock lines
        this.crosshair.clock_lines.forEach((line, index) => {
            let angle = (Math.PI / 6) * (index + 1);
            let dx = Math.cos(angle) * diagonalLength;
            let dy = Math.sin(angle) * diagonalLength;
            line.setLatLngs([
                [center.lat, center.lng],
                [center.lat + dy, center.lng + dx]
            ]);
        });
        // Update compass lines
        this.crosshair.compass_lines.forEach((line, index) => {
            let angle = (Math.PI / 4) * index;
            let dx = Math.cos(angle) * diagonalLength;
            let dy = Math.sin(angle) * diagonalLength;
            line.setLatLngs([
                [center.lat, center.lng],
                [center.lat + dy, center.lng + dx]
            ]);
        });
        // Update 16 lines
        this.crosshair.sixteen_lines.forEach((line, index) => {
            let angle = (Math.PI / 8) * index;
            let dx = Math.cos(angle) * diagonalLength;
            let dy = Math.sin(angle) * diagonalLength;
            line.setLatLngs([
                [center.lat, center.lng],
                [center.lat + dy, center.lng + dx]
            ]);
        });
    },
    
    _show: function() {
        this.eachLayer(function(l) {
            this._map.addLayer(l);
        }, this);
    },
    _hide: function() {
        this.eachLayer(function(l) {
            this._map.removeLayer(l);
        }, this);
    },
    _toggleCompass: function() {
        this.mode = (this.mode + 1) % 4;  // Rotate through the modes (now including 16 lines mode)
        this._updateVisibility();
    },
    _updateVisibility: function() {
        this.eachLayer(this.removeLayer, this); // Remove all layers to reset visibility

        // Manage layer visibility based on mode
        if (this.mode === 0) {
            // Normal mode: only crosshairs are visible
            this.addLayer(this.crosshair.longitude_line_north);
            this.addLayer(this.crosshair.longitude_line_south);
            this.addLayer(this.crosshair.latitude_line_east);
            this.addLayer(this.crosshair.latitude_line_west);
        } else if (this.mode === 1) {
            // Compass mode: only compass lines are visible
            this.crosshair.compass_lines.forEach(line => this.addLayer(line));
        } else if (this.mode === 2) {
            // Time mode: only clock lines are visible
            this.crosshair.clock_lines.forEach(line => this.addLayer(line));
        } else if (this.mode === 3) {
            // 16 lines mode: only 16 lines are visible
            this.crosshair.sixteen_lines.forEach(line => this.addLayer(line));
        }
    }
});


L.crosshairs = function(options) {
    return new L.Crosshairs(options);
};
