define([
	'serverAPI',
	'views/about',
	'views/login',
	'views/main',
	'views/game',
	'views/scoreboard',
	'views/menu',
	'views/register'
],
function(
	ApiManager,
	aboutView,
	loginView,
	mainView,
	gameView,
	scoreboardView,
	menuView,
	registerView
) {
	var App = function() {
		this.views.app = new mainView();
		console.log(mainView);
		$('.content').html(this.views.app.render().$el);

		this.connectAPI();
	};

	App.prototype = {
		views: {},
		
		connectAPI: function() {
			this.apiManager = new ApiManager();
		}
	};

	return App;
});
