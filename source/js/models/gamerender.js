define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		cfg = require('models/gameconfig'),
		_ = require('underscore');

	var renderFunc = function () {
		var viewportWidth = this._ctx.canvas.width;
		var viewportHeight = this._ctx.canvas.height;

		var gr = this._ctx.createLinearGradient(0, 0, 0, viewportHeight);
		if (this._env.colorStep !== 0) {
			this._env.currentColor = this._env.currentColor.setHue((this._env.currentColor.getHue() + this._env.colorStepH) % 360);
			this._env.colorStep--;
		}
		var hcolor = this._env.currentColor
			.setHue((this._env.currentColor.getHue() - 20) % 360)
			.setSaturation(60 / 100)
			.setLightness(55 / 100);
		gr.addColorStop(0, this._env.currentColor.setLightness(80 / 100).toCSS());
		gr.addColorStop(0.45, hcolor.toCSS());
		gr.addColorStop(0.95, '#11094B');
		this._ctx.fillStyle = gr;

		this._ctx.fillRect(0, 0, viewportWidth, viewportHeight);
		if (this._state === states.play) {
			this._scoresElem.innerHTML = this._score;
			this._pauseButton.innerHTML = 'pause';
		}
		if (this._state === states.pause) {
			this._scoresElem.innerHTML = 'paused';
			this._pauseButton.innerHTML = 'play';
		}
		if (this._state === states.finish) {
			this._scoresElem.innerHTML = 'your score: ' + this._score;
			this._pauseButton.innerHTML = 'exit';
		}

		this._scene.render();
	};

	return renderFunc;

});
