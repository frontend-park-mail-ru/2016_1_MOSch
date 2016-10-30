define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		crosses = require('models/crosses'),
		ColorJS = require('color'),
		_ = require('underscore');

	var actionFunc = function (event) {
		if (event && event.button && event.button !== 0) {
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
				if (dist <= this.cfg.assumption) {
					scalingnew = block_down.scaling.clone();
					positionnew = block_down.position.clone();
				} else {
					positionnew.x = (block.position.x + block_down.position.x) / 2;
					scalingnew.x = (len - dist);
				}
			}
		} else {
			dist = Math.abs(block.position.z - block_down.position.z);
			len = (block.scaling.z + block_down.scaling.z) / 2;
			if (dist >= len) {
				isgameover = true;
			} else {
				if (dist <= this.cfg.assumption) {
					scalingnew = block_down.scaling.clone();
					positionnew = block_down.position.clone();
				} else {
					positionnew.z = (block.position.z + block_down.position.z) / 2;
					scalingnew.z = (len - dist);
				}
			}
		}
		positionnew.y = block.position.y;
		if (isgameover) {
			this.fixBlock(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero());
			if (this._mode === modes.multiplayer) {
				var msg2 = {
					username: this._user.get('username'),
					action: 'miss',
					height: this._score
				};
				this._ws.send(JSON.stringify(msg2));
				this._state = states.pause;
			} else {
				this.finish();
			}
		} else {
			this._score++;
			this.fixBlock(positionnew, scalingnew);
			this.addBlock();
			if (this._mode === modes.multiplayer) {
				var msg = {
					username: this._user.get('username'),
					action: 'build',
					height: this._score
				};
				this._ws.send(JSON.stringify(msg))
			}
			if (this._state === states.play) {
				this.showScore();
			}
		}
	};

	return actionFunc;

});
