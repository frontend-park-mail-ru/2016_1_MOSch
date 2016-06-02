define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		_ = require('underscore'),
		$ = require('jquery');

	var finishFunc = function () {
		$('#fade').show();
		$('#pause').hide();
		if (window.innerHeight <= 400 || window.innerWidth <= 400) {
			$('#scores').css('font-size', '60px').css('bottom', '40vh');
		} else {
			$('#scores').css('font-size', '80px').css('bottom', '50vh');
		}
		this._state = states.finish;
		window.removeEventListener('keydown', this.keyGrabber);
		if ('ontouchstart' in window) {
			// mobile device (work only in modern browsers)
			this._fadeElem.removeEventListener('touchstart', this.pause);
			this._fadeElem.addEventListener('touchstart', this.prettyClose);
			this._scoresElem.innerHTML = 'Your score: ' + this._score + '<br />Tap to exit';
		} else {
			this._fadeElem.removeEventListener('mousedown', this.pause);
			this._fadeElem.addEventListener('mousedown', this.prettyClose);
			this._scoresElem.innerHTML = 'Your score: ' + this._score + '<br />Click to exit';
		}
		if (this._mode === modes.singleplayer) {
			if (this._user.loggedIn()) {
				this._user.updateData({
					score: this._score
				})
			}
		}
	};

	return finishFunc;

});
