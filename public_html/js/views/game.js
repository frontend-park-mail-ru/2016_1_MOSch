define(function(
	require
) {

	var Backbone = require('backbone'),
		tmpl = require('tmpl/game');

	var gameView = Backbone.View.extend({

		template: tmpl,
		initialize: function () {

		},
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		show: function () {

		},
		hide: function () {

		}

	});

	return gameView;
});
