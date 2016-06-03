define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		_ = require('underscore'),
		$ = require('jquery'),
		GameCaptureTmpl = require('tmpl/gamecapture');

	var pauseFunc = function (event) {
		if (event && event.button && event.button !== 0) {
			return;
		}

		if (this._mode === modes.multiplayer) {
			if (this._state === states.pause) {
				this._state = states.play;
			}
			if (this._state === states.play) {
				this.showScore();
			}
			return;
		}

		if (this._state === states.play) {
			this._state = states.pause;
			$('#fade').show();
			$('#pause').hide();
		} else if (this._state === states.pause) {
			this._state = states.play;
			$('#fade').hide();
			$('#pause').show();
		}

		if (this._state === states.pause) {
			var data = {
				exitText: false,
				mainSize: 'small',
				mainText: '',
				helpSize: 'small',
				helpText: false
			};
			if ('ontouchstart' in window) {
				// mobile device (work only in modern browsers)
				data.mainText = 'Tap to continue';
			} else {
				data.mainText = 'Click to continue';
			}
			$('#gameStatus').html(GameCaptureTmpl(data));
		} else if (this._state === states.play) {
			this.showScore();
		}
	};

	return pauseFunc;

});
