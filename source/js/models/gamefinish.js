define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		_ = require('underscore'),
		$ = require('jquery'),
		GameCaptureTmpl = require('tmpl/gamecapture');

	var finishFunc = function () {
		this._state = states.finish;
		$('#fade').show();
		$('#pause').hide();
		var data = {
			exitText: false,
			mainSize: 'small',
			mainText: '',
			helpSize: 'small',
			helpText: ''
		};
		if (this._mode === modes.multiplayer) {
			if (this._score < this._opScore) {
				data.mainText = 'You lose';
				data.helpText = 'Your score is ' + this._score + ', but ' + this.opponent + '\'s score is ' + this._opScore;
			} else if (this._score > this._opScore) {
				data.mainText = 'You win!';
				data.helpText = this.opponent + '\'s score is ' + this._opScore + ', but your score is ' + this._score;
			} else {
				data.mainText = 'Dead heat...';
				data.helpText = 'YOU vs ' + this.opponent + '!';
			}
		} else {
			data.mainText = 'Your score is ' + this._score;
			data.helpText = false;
		}

		if ('ontouchstart' in window) {
			// mobile device (work only in modern browsers)
			this._fadeElem.removeEventListener('touchstart', this.pause);
			this._fadeElem.addEventListener('touchstart', this.prettyClose);
			data.exitText = 'Tap to exit';
		} else {
			this._fadeElem.removeEventListener('mousedown', this.pause);
			this._fadeElem.addEventListener('mousedown', this.prettyClose);
			data.exitText = 'Click to exit';
		}

		window.removeEventListener('keydown', this.keyGrabber);
		$('#gameStatus').html(GameCaptureTmpl(data));
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
