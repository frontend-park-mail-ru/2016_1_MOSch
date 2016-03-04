define([
	'backbone',
	'getExampleScoresCollection',
	'tmpl/scoreboard'
], function(
	Backbone,
	getExample,
	tmpl
) {

	var scoreboardView = Backbone.View.extend({

		template: tmpl,
		initialize: function () {
			// TODO
		},
		render: function () {
			var data = {
				items: getExample().toJSON().sort()
			};
			this.$el.html(this.template(data));
			return this;
		},
		show: function () {
			// TODO
		},
		hide: function () {
			// TODO
		}

	});

	return scoreboardView;
});
