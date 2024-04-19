L.CompassButton = L.Control.extend({
	options: {
		position: 'topleft',
		autoZIndex: true,
		crosshairs: null,
	},
	onAdd: function(map) {
		this._map = map;
		const container = L.DomUtil.create('div', 'leaflet-control-compass-button-panel leaflet-bar leaflet-control');
		const button = L.DomUtil.create('a', 'leaflet-control-compass-button leaflet-bar-part', container);
		button.textContent = 'C';
		button.title = 'Toggle compass crosshairs'
		button.href = '#';
		L.DomEvent.addListener(button, 'click', this._onClick, this);
		L.DomEvent.disableClickPropagation(button);
		return container;
	},
	_onClick: function(event) {
		L.DomEvent.stopPropagation(event);
		L.DomEvent.preventDefault(event);
		this.options.crosshairs._toggleCompass();
	},
});

L.compassButton = function(options) {
	return new L.CompassButton(options);
};
