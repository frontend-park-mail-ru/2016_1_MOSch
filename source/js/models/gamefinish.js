define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		cfg = require('models/gameconfig'),
		_ = require('underscore'),
		$ = require('jquery');

	var finishFunc = function () {
		$('#fade').show();
		$('#pause').hide();
		$('#scores').css('font-size', '80px');
		this._state = states.finish;
		if ('ontouchstart' in window) {
			// mobile device (work only in modern browsers)
			this._scoresElem.innerHTML = 'your score: ' + this._score + '.<br />Tap to exit';
		} else {
			this._scoresElem.innerHTML = 'your score: ' + this._score + '.<br />Click to exit';
		}
		console.log('finish');
	};

	return finishFunc;

});
