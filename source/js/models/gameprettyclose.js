define(function (require) {

	var Backbone = require('backbone'),
		BABYLON = require('babylon'),
		modes = require('models/modes'),
		states = require('models/states'),
		ColorJS = require('color'),
		_ = require('underscore'),
		$ = require('jquery');

	var prettyCloseFunc = function () {
		Backbone.history.navigate('menu', {trigger: true});
	};

	return prettyCloseFunc;

});
