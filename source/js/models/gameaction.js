define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		crosses = require('models/crosses'),
		ColorJS = require('color'),
		_ = require('underscore');

	var actionFunc = function () {
		if (this._state === states.finish) {
			this.pause();
			return;
		}
		if (this._state !== states.play) {
			return;
		}
		var isgameover = false;
		var block_down = this._blocks[this._blocks.length - 2];
		var block = this._blocks[this._blocks.length - 1];
		var scalingnew = block.scaling.clone();
		var positionnew = block.position.clone();
		var len;
		var dist;
		if (block.x_cross === crosses.x) {
			dist = Math.abs(block.position.x - block_down.position.x);
			len = (block.scaling.x + block_down.scaling.x) / 2;
			if (dist >= len) {
				isgameover = true;
			} else {
				positionnew.x = (block.position.x + block_down.position.x) / 2;
				scalingnew.x = (len - dist);
			}
		} else {
			dist = Math.abs(block.position.z - block_down.position.z);
			len = (block.scaling.z + block_down.scaling.z) / 2;
			if (dist >= len) {
				isgameover = true;
			} else {
				positionnew.z = (block.position.z + block_down.position.z) / 2;
				scalingnew.z = (len - dist);
			}
		}

		if (isgameover) {
			this.fixBlock(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero());
			this.trash(block.position, block.scaling, this._color);
			this.finish();
		} else {
			this._score++;
			this.fixBlock(positionnew, scalingnew);
			//this.trash(block.position, block.scaling, this._color);
			this.addBlock();
			if (this._state === states.play) {
				this._scoresElem.innerHTML = this._score;
			}
		}
		console.log('action');
	};

	return actionFunc;

});
