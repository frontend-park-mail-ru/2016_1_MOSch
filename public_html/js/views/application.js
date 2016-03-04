define(function(
	require
) {

	var mainView = require('views/main'),
		menuView = require('views/menu'),
		registerView = require('views/register'),
		loginView = require('views/login'),
		scoreboardView = require('views/scoreboard'),
		aboutView = require('views/about'),
		gameView = require('views/game'),
		Backbone = require('backbone'),
		wrapper = require('tmpl/wrapper');

	var applicationView = Backbone.View.extend({

		wrap: wrapper,
		activeView: null,
		initialize: function (_api, _session) {
			this._api = _api;
			this._session = _session;
		},
		render: function (options) {
			if (this.activeView != null) {
				this.activeView.hide();
			}
			options = options || {};
			switch (options['view']) {
				case 'about':
					this.$el.html(this.wrap());
					this.$('.content').html((new aboutView()).render().$el);
					break;
				case 'scoreboard':
					this.$el.html(this.wrap());
					this.$('.content').html((new scoreboardView()).render().$el);
					break;
				case 'login':
					this.$el.html(this.wrap());
					if (this._session.get('logged_in') == false){
						this.$('.content').html((new loginView()).render().$el);
					}
					else
					{
						console.log('refresh window');
						Backbone.history.navigate('refresh', {trigger: true});
					}
					break;
				case 'register':
					this.$el.html(this.wrap());
					if (this._session.get('logged_in') == false){
						this.$('.content').html((new registerView()).render().$el);
					}
					else
					{
						console.log('refresh window');
						Backbone.history.navigate('refresh', {trigger: true});
					}
					break;
				case 'game':
					if (this._session.get('logged_in') == true){
						this.$el.html((new gameView(options)).render().$el);
					}
					else
					{
						console.log('refresh window');
						Backbone.history.navigate('', {trigger: true});
					}
					break;
				case 'mainMenu':
				default:
					this.$el.html(this.wrap());
					if (this._session.get('logged_in') == false){
						this.$('.content').html((new mainView()).render().$el);
					}
					else
					{
						this.$('.content').html((new menuView()).render().$el);
					}
					break;
			}
			return this;
		},
		show: function () {
			// TODO
		},
		hide: function () {
			// TODO
		}
	});
	return applicationView;
});
