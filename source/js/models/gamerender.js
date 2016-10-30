define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		_ = require('underscore');

	var renderFunc = function () {
		var viewportWidth = this._ctx.canvas.width;
		var viewportHeight = this._ctx.canvas.height;

		var hcolor = this._env.currentColor
			.setHue((this._env.currentColor.getHue() - 20) % 360)
			.setSaturation(60 / 100)
			.setLightness(55 / 100);
		var gr = this._ctx.createLinearGradient(0, 0, 0, viewportHeight);
		gr.addColorStop(0, this._env.currentColor.setLightness(80 / 100).toCSS());
		gr.addColorStop(0.45, hcolor.toCSS());
		gr.addColorStop(0.95, '#11094B');
		this._ctx.fillStyle = gr;
		this._ctx.fillRect(0, 0, viewportWidth, viewportHeight);

		this._scene.render();
	};

	return renderFunc;

});
