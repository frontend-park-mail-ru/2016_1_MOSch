define(function(
	require
) {

	var Backbone = require('backbone'),
		Router = require('router');

	var App = function() {
		this.router = new Router();
		Backbone.Events.on('showAlert', function(args) { alert('Ошибка: ' + args); });
		Backbone.Events.on('showMessage', function(args) { alert('Внимание: ' + args); });

		Backbone.history.start();
	};

	App.prototype = {
		router: null
	};

	return App;
});
