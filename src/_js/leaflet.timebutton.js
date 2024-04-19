L.TimeButton = L.Control.extend({
	options: {
		position: 'topleft',
		autoZIndex: true,
		crosshairs: null,
	},
	onAdd: function(map) {
		this._map = map;
		const container = L.DomUtil.create('div', 'leaflet-control-time-button-panel leaflet-bar leaflet-control');
		const button = L.DomUtil.create('a', 'leaflet-control-time-button leaflet-bar-part', container);
		button.textContent = 'T';
		button.title = 'Toggle time crosshair'
		button.href = '#';
		L.DomEvent.addListener(button, 'click', this._onClick, this);
		L.DomEvent.disableClickPropagation(button);
		return container;
	},
	_onClick: function(event) {
		L.DomEvent.stopPropagation(event);
		L.DomEvent.preventDefault(event);
		this.options.crosshairs._toggleTime();
	},
});

L.timeButton = function(options) {
	return new L.TimeButton(options);
};
