define([
	'backbone',
	'tmpl/wrapper',
	'views/main',
	'views/menu',
	'views/register',
	'views/login',
	'views/scoreboard',
	'views/about',
	'views/game'
], function(
	Backbone,
	wrapper,
	mainView,
	menuView,
	registerView,
	loginView,
	scoreboardView,
	aboutView,
	gameView
) {

	var applicationView = Backbone.View.extend({

		wrap: wrapper,
		views: {},
		activeView: null,
		initialize: function (_api, _session) {
			this._api = _api;
			this._session = _session;			
			this.views.main = new mainView();
			this.views.menu = new menuView();
			this.views.register = new registerView();
			this.views.login = new loginView();
			this.views.scoreboard = new scoreboardView();
			this.views.about = new aboutView();
			this.views.game = new gameView();
		},
		render: function (options) {
			if (this.activeView != null) {
				this.activeView.hide();
			}
			options = options || {};
			switch (options['view']) {
				case 'about':
					this.showAboutScreen();
					break;
				case 'scoreboard':
					this.showScoreboardScreen();
					break;
				case 'login':
					this.showLoginScreen();
					break;
				case 'register':
					this.showRegisterScreen();
					break;
				case 'game':
					this.showGameScreen(options);
					break;
				case 'mainMenu':
				default:
					this.showMainScreen();
					break;
			}
			return this;
		},
		show: function () {
			// TODO
		},
		hide: function () {
			// TODO
		},

		showMainScreen: function(options) {
			this.$el.html(this.wrap());
			if (this._session.get('logged_in') == false){
				this.$('.content').html(this.views.main.render().$el);
			}
			else
			{
				this.$('.content').html(this.views.menu.render().$el);
			}
		},

		showAboutScreen: function(options) {
			this.$el.html(this.wrap());
			this.$('.content').html(this.views.about.render().$el);			
		},

		showLoginScreen: function(options) {
			this.$el.html(this.wrap());
			if (this._session.get('logged_in') == false){
				this.$('.content').html(this.views.login.render().$el);
			}
			else
			{
				console.log('refresh window');
				Backbone.history.navigate('refresh', {trigger: true});
			}
		},

		showRegisterScreen: function(options) {
			this.$el.html(this.wrap());			
			if (this._session.get('logged_in') == false){
				this.$('.content').html(this.views.register.render().$el);
			}
			else
			{
				console.log('refresh window');
				Backbone.history.navigate('refresh', {trigger: true});
			}
		},

		showScoreboardScreen: function(options) {
			this.$el.html(this.wrap());
			this.$('.content').html(this.views.scoreboard.render().$el);			
		},

		showGameScreen: function(options) {
			if (this._session.get('logged_in') == true){
				this.$el.html(this.views.game.render().$el);			
			}
			else
			{
				console.log('refresh window');
				Backbone.history.navigate('refresh', {trigger: true});
			}
		}

	});

	return applicationView;
});
