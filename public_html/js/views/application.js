define(function(
	require
) {

	var Backbone = require('backbone'),
		Session = require('models/session'),
		mainView = require('views/main'),
		menuView = require('views/menu'),
		registerView = require('views/register'),
		loginView = require('views/login'),
		scoreboardView = require('views/scoreboard'),
		aboutView = require('views/about'),
		gameView = require('views/game'),
		wrapper = require('tmpl/wrapper');

	var applicationView = Backbone.View.extend({
		el: 'body',
		wrap: wrapper,
		initialize: function ( options ) {
			this._session = new Session();
			this._is_wrap_rendered = false;
			this.currentView = null;
		},
		render: function (options) {
			options = options || {};
			switch (options.view) {
				case 'about':
					this.renderToWrap(aboutView);
					break;
				case 'scoreboard':
					this.renderToWrap(scoreboardView);
					break;
				case 'login':
					this.CheckUnLoginAndShow(loginView);
					break;
				case 'register':
					this.CheckUnLoginAndShow(registerView);
					break;
				case 'game':
					if (this._session.get('logged_in') === true){
						this.$el.html((new gameView(this._session, options)).render().$el);
					}
					else
					{
						console.log('refresh window');
						Backbone.history.navigate('', {trigger: true});
					}
					break;
				case 'mainMenu':
				default:
					if (this._session.get('logged_in') === false) {
						this.renderToWrap(mainView);
					}
					else
					{
						this.renderToWrap(menuView);
					}
					break;
			}
			return this;
		},
		show: function () {

		},
		hide: function () {

		},

		CheckUnLoginAndShow: function(view){
			if (this._session.get('logged_in') === false){
				this.renderToWrap(view);
			}
			else
			{
				console.log('refresh window');
				Backbone.history.navigate('', {trigger: true});
			}
		},

		renderToWrap: function(view) {
			if (this._is_wrap_rendered === false) {
				this.$el.html(this.wrap());
				this._is_wrap_rendered = true;
			}
			if (this.currentView) {
				this.currentView.undelegateEvents();
			}
			this.currentView = new view(this._session);
			this.currentView.render();
		}
	});
	return applicationView;
});
