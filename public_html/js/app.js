define(function(
	require
) {

	var Backbone = require('backbone'),
		Router = require('router'),
		Session = require('models/session'),
		appView = require('views/application'),
		ApiManager = require('serverAPI');

	var App = function() {
		this.session = new Session({
			host: "/api"
		});
		this.connectAPI();
		this.view = new appView(this.apiManager, this.session);
		this.router = new Router(this.view);

		Backbone.history.start();
	};

	App.prototype = {
		view: null,
		router: null,
		connectAPI: function() {
			this.apiManager = new ApiManager();
		}
	};

	return App;
});
