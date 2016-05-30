define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		crosses = require('models/crosses'),
		ColorJS = require('color'),
		_ = require('underscore');

	var actionFunc = function () {
		if (this._state !== states.play) {
			return;
		}
		var isgameover = false;
		var scalingnew = null;
		var block_down = this._blocks[this._blocks.length - 2];
		var block = this._blocks[this._blocks.length - 1];
		if (block.x_cross === crosses.x) {
			var dist = Math.abs(block.position.x - block_down.position.x);
			var len = (block.scaling.x + block_down.scaling.x) / 2;
			if (dist > len) {
				isgameover = true;
			} else {

			}
		} else {
			var dist = Math.abs(block.position.z - block_down.position.z);
			var len = (block.scaling.z + block_down.scaling.z) / 2;
			if (dist > len) {
				isgameover = true;
			} else {

			}
		}

		if (false && isgameover) {
			this.trash(block.position, block.scaling, this._color);
			this.finish();
		} else {
			this._score++;
			this.addBlock(scalingnew);
			if (this._state === states.play) {
				this._scoresElem.innerHTML = this._score;
			}
		}
		console.log('action');
	};

	return actionFunc;

});
