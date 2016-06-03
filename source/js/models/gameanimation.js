define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		crosses = require('models/crosses'),
		ColorJS = require('color'),
		_ = require('underscore'),
		$ = require('jquery');

	var animateFunc = function () {
		if (this._state !== states.play) {
			return;
		}
		var viewportWidth = this._ctx.canvas.width;
		var viewportHeight = this._ctx.canvas.height;

		if (this._env.colorStep !== 0) {
			if (this._env.hp === 0) {
				this._env.currentColor = this._env.currentColor.setHue((this._env.currentColor.getHue() + this._env.colorStepH) % 360);
				this._env.colorStep--;
				this._env.hp = this.cfg.envSpeedHp;
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
					this._iters++;
				} else {
					block.position.x += this.cfg.block_speed;
				}
				break;
			case crosses.nx:
				if (block.position.x < -5) {
					block.position.x = -5;
					block.x_dir = crosses.px;
					this._iters++;
				} else {
					block.position.x -= this.cfg.block_speed;
				}
				break;
			case crosses.pz:
				if (block.position.z > 5) {
					block.position.z = 5;
					block.x_dir = crosses.nz;
					this._iters++;
				} else {
					block.position.z += this.cfg.block_speed;
				}
				break;
			case crosses.nz:
				if (block.position.z < -5) {
					block.position.z = -5;
					block.x_dir = crosses.pz;
					this._iters++;
				} else {
					block.position.z -= this.cfg.block_speed;
				}
				break;
		}
		if (this._iters > this.cfg.specIters) {
			if (block.x_cross === crosses.x) {
				block.scaling.z -= this._trimRatio;
				if (block.scaling.z <= 0) {
					this.fixBlock(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero());
					this.finish();
				}
			} else {
				block.scaling.x -= this._trimRatio;
				if (block.scaling.x <= 0) {
					this.fixBlock(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero());
					this.finish();
				}
			}
			if (this._trimRatio > this.cfg.minTrimPixels) {
				this._trimRatio -= this.cfg.trimFallRatio;
			}
		}
	};

	return animateFunc;

});
