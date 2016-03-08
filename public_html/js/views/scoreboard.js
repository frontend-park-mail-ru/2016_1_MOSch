define(function(
	require
) {

	var Backbone = require('backbone'),
		getExample = require('getExampleScoresCollection'),
		tmpl = require('tmpl/scoreboard');

	var scoreboardView = Backbone.View.extend({

		template: tmpl,
		initialize: function () {

		},
		render: function () {
			var data = {
				items: getExample().toJSON().sort()
			};
			this.$el.html(this.template(data));
			return this;
		},
		show: function () {

		},
		hide: function () {

		}

	});

	return scoreboardView;
});
