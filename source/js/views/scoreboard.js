define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/scoreboard'),
		Users = require('collections/users');

	var scoreboardView = Backbone.View.extend({

		template: tmpl,
		initialize: function (options) {
			this._session = options.session;
			this.$el.hide();
		},
		render: function () {
			users = new Users();
			Backbone.sync("read", users, {success: this.updateScores});
			var data = {
				items: users.toJSON()
			};
			this.$el.html(this.template(data));
			return this;
		},

		updateScores: function(users, data, opts) {
			var data = {
				items: JSON.stringify(data)
			};
			this.$el.html(this.template(data));
		},

		show: function () {
			this.render();
			this.$el.show();
			return this;
		},
		hide: function () {
			this.$el.hide();
			return this;
		}
	});

	return scoreboardView;
});
