define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/scoreboard'),
		Users = require('collections/users');

	var scoreboardView = Backbone.View.extend({

		template: tmpl,
		initialize: function (options) {
			this._user = options.user;
			this.$el.hide();
		},
		render: function () {
			var users = new Users();
			Backbone.sync("read", users, {success: this.updateScores.bind(this)});
			var data = {
				items: []
			};
			this.$el.html(this.template(data));
			return this;
		},

		updateScores: function (users, data, opts) {
			var datas = {
				items: users
			};
			for (var i = 0; i < datas.items.length; i++) {
				datas.items[i].n = i + 1;
			}
			this.$el.html(this.template(datas));
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
