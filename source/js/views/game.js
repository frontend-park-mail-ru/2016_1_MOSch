define(function (require) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/game'),
		game = require('models/gamescript');

	var gameView = Backbone.View.extend({

		template: tmpl,
		initialize: function (options) {
			this._session = options.session;
			this.$el.hide();
		},
		render: function () {
			this.$el.html(this.template());
			game.aaa(this._session);
			return this;
		},
		show: function () {
			this.render();
			this.$el.show();
			return this;
		},
		hide: function () {
			game.stop();
			this.$el.hide();
			return this;
		}

	});

	return gameView;
});
