define([
	'serverAPI',
	'views/application',
	'router',
	'backbone',
	'resizer',
	'models/session'
], function(
	ApiManager,
	appView,
	Router,
	Backbone,
	resizer,
	Session
) {

	var App = function() {
		$(document).ready(resizer);
		$(window).resize(resizer);
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
			//alert("connectAPI()");
			this.apiManager = new ApiManager();
		}
	};

	return App;
});
