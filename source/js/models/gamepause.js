define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		_ = require('underscore'),
		$ = require('jquery');

	var pauseFunc = function () {
		if (this._state === states.play) {
			this._state = states.pause;
			$('#fade').show();
			$('#pause').hide();
			$('#scores').css('font-size', '80px');
		} else if (this._state === states.finish) {
			setTimeout(function () {
				Backbone.history.navigate('menu', {trigger: true});
			}, 100);
			return;
		} else if (this._state === states.pause) {
			this._state = states.play;
			$('#fade').hide();
			$('#pause').show();
			$('#scores').css('font-size', 'inherit');
		}
		if (this._state === states.pause) {
			if ('ontouchstart' in window) {
				// mobile device (work only in modern browsers)
				this._scoresElem.innerHTML = 'Tap to continue';
			} else {
				this._scoresElem.innerHTML = 'Click to continue';
			}
		} else if (this._state === states.play) {
			this._scoresElem.innerHTML = this._score;
		}
	};

	return pauseFunc;

});
