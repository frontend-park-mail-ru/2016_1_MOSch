define(function (require) {

	var Backbone = require('backbone'),
		$ = require('jquery'),
		User = require('models/user'),
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
		'upgrade': require('views/upgrade')
	};

	var applicationView = Backbone.View.extend({

		el: 'body',
		template: wrapper,
		initialize: function (options) {
			options = options || {};
			this._user = new User();
			this._views = {};
			this._currentView = null;
			Backbone.Events.on('showToast', this.showToasts, this);
			Backbone.Events.on('setBlur', this.setBlur, this);
		},
		render: function (options) {
			options = options || {};
			this.$el.html(this.template());
		},
		show: function (options) {
			options = options || {'view': 'main'};
			options.view = options.view.split('/')[0];
			if (!this._views[options.view]) {
				if (Views[options.view]) {
					this._views[options.view] = new Views[options.view]({'user': this._user});
					this.$('.content').append(this._views[options.view].$el);
				} else {
					return this.render({'view': 'main'});
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
		hide: function () {

		},

		showToasts: function (options) {
			options = options || {};
			if (options) {
				var ell = (new toast()).render(options).$el;
				this.$('.notice').append(ell);
			}
		},
		setBlur: function (options) {
			options = options || {};
			if (options) {
				var value = 'blur(8px) brightness(0.85)';
				if (options.status === 'dark') {
					value = 'blur(16px) brightness(0.5)';
				}
				this.$('.background').css('filter', value);
				this.$('.background').css('webkit-filter', value);
			}
		}
	});
	return applicationView;
});
