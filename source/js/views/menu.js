define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/menu');

	var menuView = Backbone.View.extend({

		template: tmpl,
		events: {
			'click .exit': 'logout'
		},
		initialize: function (options) {
			this._user = options.user;
			this.$el.hide();
			Backbone.Events.on('loadUserInfo', this.loadUserInfo, this);
		},
		render: function () {
			this.$el.html(this.template());
			this._user.fetch();
			return this;
		},
		show: function () {
			if (!this._user.get('logged_in')) {
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
		}
	});

	return menuView;
});
