define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/menu');

	var menuView = Backbone.View.extend({

		template: tmpl,
		events: {
			'click .exit': 'logout'
		},
		initialize: function (options) {
			this._session = options.session;
			this._user = null;
			this.$el.hide();
			Backbone.Events.on('loadUserInfo', this.loadUserInfo, this);
		},
		render: function () {
			this.$el.html(this.template());
			if (!this._user) {
				this._user = this._session.getUser();
			} else {
				this.loadUserInfo();
			}
			return this;
		},
		show: function () {
			if (!this._session.get('logged_in')) {
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
			this._user = null;
			this._session.logout();
		},

		loadUserInfo: function (e) {
			console.log('You are logged as ' + this._user.get('login').toUpperCase() + ' (id ' + this._user.get('userID') + ', ' + this._user.get('level') + ':' + this._user.get('rate') + ')');
		}
	});

	return menuView;
});
