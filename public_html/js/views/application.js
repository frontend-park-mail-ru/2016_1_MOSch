define(function(
	require
) {

	var Backbone = require('backbone'),
		$ = require('jquery'),
		Session = require('models/session'),
		wrapper = require('tmpl/wrapper'),
		toast = require('views/toast');

	var Views = {
		'main': require('views/main'),
		'menu': require('views/menu'), // когда пользователь залогинился
		'register': require('views/register'),
		'login': require('views/login'),
		'scoreboard': require('views/scoreboard'),
		'about': require('views/about'),
		'game': require('views/game'),
	};

	var applicationView = Backbone.View.extend({

		el: 'body',
		initialize: function ( options ) {
			options = options || {};
			this.$el.html(wrapper());
			this._session = new Session();
			this._views = {};
			this._currentView = null;
			Backbone.Events.on('showToast', this.showToasts, this);
		},
		render: function ( options ) {
			options = options || { 'view': 'main' };
			options.mode = options.view.split('/')[1];
			options.view = options.view.split('/')[0];
			if (!this._views[options.view]) {
				if (Views[options.view]) {
					this._views[options.view] = new Views[options.view]({ 'session': this._session });
					this.$('.content').append(this._views[options.view].$el);
				} else {
					return this.render({ 'view': 'main' });
				}
			}
			if (this._currentView) {
				this._currentView.hide();
				this._currentView.undelegateEvents();
			}
			this._currentView = this._views[options.view];
			this._currentView.show(options);
			this._currentView.delegateEvents();
			return this;
		},
		show: function () {

		},
		hide: function () {

		},

		showToasts: function( options ) {
			options = options || {};
			console.log('toast');
			if (options) {
				var ell = (new toast()).render(options).$el;
				this.$('.notice').append(ell);
			}
		}
	});
	return applicationView;
});
