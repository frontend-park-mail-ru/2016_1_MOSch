define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/upgrade');

	var upgradeView = Backbone.View.extend({

		template: tmpl,
		initialize: function (options) {
			this._user = options.user;
			this.$el.hide();
		},
		render: function () {
			this.$el.html(this.template());
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
		}
	});

	return upgradeView;
});
