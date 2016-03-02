define([
	'serverAPI',
	'views/application',
	'router'
],
function(
	ApiManager,
	appView,
	Router
) {
	var App = function() {
		this.connectAPI();
		this.view = new appView(this.apiManager);
		this.router = new Router(this.view);
		Backbone.history.start();
	};

	App.prototype = {
		view: null,
		router: null,
		connectAPI: function() {
			alert("connectAPI()");
			this.apiManager = new ApiManager();
		}
	};

	return App;
});
