define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		cfg = require('models/gameconfig'),
		_ = require('underscore');

	var actionFunc = function () {
		if (this._state !== states.play) {
			return;
		}
		this._score++;
		this.addBlock();
		console.log('action');
	};

	return actionFunc;

});
