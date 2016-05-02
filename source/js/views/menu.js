define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/menu'),
		tmplUserbar = require('tmpl/userbar');

	var menuView = Backbone.View.extend({

		template: tmpl,
		events: {
			'click .exit': 'logout'
		},
		initialize: function (options) {
			this._user = options.user;
			this._user.on('change', this.updateUserBar.bind(this));
			this.$el.hide();
		},
		render: function () {
			this.$el.html(this.template());
			this.updateUserBar();
			return this;
		},
		show: function () {
			if (!this._user.loggedIn()) {
				Backbone.history.navigate('main', {trigger: true});
				return;
			}
			this.render();
			this.$el.show();
			return this;
		},

		hide: function () {
			this.$el.hide();
			return this;
		},

		logout: function (e) {
			console.log('logout');
			this._user.logout();
		},

		updateUserBar: function () {
			var info = {};
			if (this._user.loggedIn()) {
				info = this._user.getInfo();
			}
			this.$('.userbar').html(tmplUserbar(info));
		}
	});

	return menuView;
});
