define(function(
	require
) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/menu');

	var menuView = Backbone.View.extend({

		template: tmpl,
		events: {
			'click .exit': 'logout'
		},
		initialize: function ( options ) {
			this._session = options.session;
			this.$el.hide();
		},
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		show: function () {
			if (!this._session.get('logged_in')) {
				Backbone.history.navigate('main', { trigger: true });
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

		logout: function(e) {
			console.log('logout');
			this._session.logout();
		}

	});

	return menuView;
});
