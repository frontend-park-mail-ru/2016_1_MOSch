define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		crosses = require('models/crosses'),
		ColorJS = require('color'),
		cfg = require('models/gameconfig'),
		_ = require('underscore'),
		$ = require('jquery');

	var animateFunc = function () {
		if (this._state === states.pause) {
			return;
		}
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

		var block = this._blocks[this._blocks.length - 1];
		switch (block.x_dir) {
			case crosses.px:
				if (block.position.x > 5) {
					block.position.x = 5;
					block.x_dir = crosses.nx;
				} else {
					block.position.x += cfg.block_speed;
				}
				break;
			case crosses.nx:
				if (block.position.x < -5) {
					block.position.x = -5;
					block.x_dir = crosses.px;
				} else {
					block.position.x -= cfg.block_speed;
				}
				break;
			case crosses.pz:
				if (block.position.z > 5) {
					block.position.z = 5;
					block.x_dir = crosses.nz;
				} else {
					block.position.z += cfg.block_speed;
				}
				break;
			case crosses.nz:
				if (block.position.z < -5) {
					block.position.z = -5;
					block.x_dir = crosses.pz;
				} else {
					block.position.z -= cfg.block_speed;
				}
				break;
		}

	};

	return animateFunc;

});
