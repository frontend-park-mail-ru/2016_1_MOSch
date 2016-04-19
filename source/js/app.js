define(function (require) {

	var Backbone = require('backbone'),
		Router = require('router');

	var App = function (options) {
		options = options || {};
		new Router();
		Backbone.history.start();
	};

	return new App();
});
