define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		cfg = require('models/gameconfig'),
		_ = require('underscore'),
		$ = require('jquery');

	var animateFunc = function () {
		var viewportWidth = this._ctx.canvas.width;
		var viewportHeight = this._ctx.canvas.height;

		if (this._env.colorStep !== 0) {
			if (this._env.hp === 0) {
				this._env.currentColor = this._env.currentColor.setHue((this._env.currentColor.getHue() + this._env.colorStepH) % 360);
				this._env.colorStep--;
				this._env.hp = cfg.envSpeedHp;
			} else {
				this._env.hp--;
			}
		}
	};

	return animateFunc;

});
