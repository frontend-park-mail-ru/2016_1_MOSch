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
		initialize: function (_api) {
			this.api = _api;
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
					alert( 'Окно "Об игре"' );
					this.showAboutScreen();
					break;
				case 'scoreboard':
					alert( 'Окно с таблицей лидеров' );
					this.showScoreboardScreen();
					break;
				case 'login':
					alert( 'Окно с формой логина' );
					this.showLoginScreen();
					break;
				case 'register':
					alert( 'Окно с формой регистрации' );
					this.showRegisterScreen();
					break;
				case 'game':
					alert( 'Игровой экран' );
					this.showGameScreen(options);
					break;
				case 'mainMenu':
				default:
					alert( 'Главное меню' );
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
			this.$('.content').html(this.views.main.render().$el);
			
		},

		showAboutScreen: function(options) {
			this.$el.html(this.wrap());
			this.$('.content').html(this.views.about.render().$el);
			
		},

		showLoginScreen: function(options) {
			this.$el.html(this.wrap());
			this.$('.content').html(this.views.login.render().$el);
			
		},

		showRegisterScreen: function(options) {
			this.$el.html(this.wrap());
			this.$('.content').html(this.views.register.render().$el);
			
		},

		showScoreboardScreen: function(options) {
			this.$el.html(this.wrap());
			this.$('.content').html(this.views.scoreboard.render().$el);
			
		},

		showGameScreen: function(options) {
			this.$('body').html(this.views.game.render().$el);
		}

	});

	return applicationView;
});
