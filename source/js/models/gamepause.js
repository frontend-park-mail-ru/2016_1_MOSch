define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		cfg = require('models/gameconfig'),
		_ = require('underscore'),
		$ = require('jquery');

	var pauseFunc = function () {
		if (this._state !== states.pause && this._state !== states.finish) {
			this._state = states.pause;
			$('#fade').show();
			$('#pause').hide();
		} else if (this._state === states.pause) {
			this._state = states.play;
			$('#fade').hide();
			$('#pause').show();
		}
		console.log('pause');
	};

	return pauseFunc;

});
