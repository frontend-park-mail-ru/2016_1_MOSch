define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		_ = require('underscore'),
		$ = require('jquery');

	var fixBlockFunc = function (position, scaling) {
		if (!(position && scaling)) {
			return;
		}
		var block = this._blocks[this._blocks.length - 1];
		block.position = position.clone();
		block.scaling = scaling.clone();
	};

	return fixBlockFunc;

});
