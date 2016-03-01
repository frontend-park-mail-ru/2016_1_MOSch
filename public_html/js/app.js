define([
	'serverAPI',
	'views/about',
	'views/login',
	'views/main',
	'views/game',
	'views/scoreboard',
	'views/menu',
	'views/register',
	'router'
],
function(
	ApiManager,
	aboutView,
	loginView,
	mainView,
	gameView,
	scoreboardView,
	menuView,
	registerView,
	Router
) {
	var App = function() {
		this.views.main = new mainView();
		this.views.login = new loginView();
		this.views.about = new aboutView();
		this.views.game = new gameView();
		this.views.scoreboard = new scoreboardView();
		this.views.menu = new menuView();
		this.views.register = new registerView();
		
		this.connectAPI();

		this.router = new Router(this);
		Backbone.history.start();


		//alert(this.inittt);
		//$('body').html(this.views.main.render().$el);
	};

	App.prototype = {
		views: {},
		router: undefined,
		inittt: undefined,
		connectAPI: function() {
			//alert("connectAPI()");
			this.apiManager = new ApiManager();
		}
	};

	return App;
});
