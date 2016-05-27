define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		crosses = require('models/crosses'),
		ColorJS = require('color'),
		cfg = require('models/gameconfig'),
		_ = require('underscore');

	var addBlockFunc = function (scaling_new) {
		if (this._colorJumpStep == 0 && _.random(100000) / 100000 <= cfg.colorJumpProbability) {
			var rnd = _.random(-500, 500) / 1000;
			var sign = 1;
			if (rnd < 0) {
				sign = -1;
			}
			var chng = rnd * cfg.bigColorStepH + sign * cfg.colorStepH;
			this._color = this._color.setHue((this._color.getHue() + chng) % 360);
			this._colorJumpStep = cfg.stepCnt;
		} else {
			this._color = this._color.setHue((this._color.getHue() + cfg.colorStepH) % 360);
			if (this._colorJumpStep > 0) {
				this._colorJumpStep--;
			}
		}
		var block = BABYLON.Mesh.CreateBox('box', 1.0, this._scene, true);
		var block_old = this._blocks[this._blocks.length - 1];
		block.scaling = scaling_new || cfg.defaultBoxScaling;
		block.position = BABYLON.Vector3.Zero();
		block.position.y = this._blocks[this._blocks.length - 1].position.y + cfg.defaultBoxScaling.y;
		this._camera.position.y += cfg.defaultBoxScaling.y;
		block.material = new BABYLON.StandardMaterial("texture", this._scene);
		block.material.diffuseColor = new BABYLON.Color3(this._color.getRed(), this._color.getGreen(), this._color.getBlue());
		block.x_cross = (block_old.x_cross === crosses.x) ? crosses.z : crosses.x;
		block.x_dir = (block.x_cross === crosses.x) ? crosses.px : crosses.pz;
		if (block.x_dir === crosses.px) {
			block.position.x = -5;
		} else {
			block.position.z = -5;
		}
		this._blocks.push(block);

		this._env.colorStep = cfg.envColorStepCnt;
		this._env.colorStepH = this._color.getHue() - this._env.currentColor.getHue();
		if (Math.abs(this._env.colorStepH) > 180) {
			if (this._env.colorStepH > 0) {
				this._env.colorStepH -= 360;
			} else {
				this._env.colorStepH += 360;
			}
		}
		this._env.colorStepH /= cfg.envColorStepCnt;

		console.log('addBlock');
	};

	return addBlockFunc;

});
