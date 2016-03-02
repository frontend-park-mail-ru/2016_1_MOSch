define([
	'backbone',
	'tmpl/scoreboard',
	'collections/scores'
], function(
	Backbone,
	tmpl,
	scoresCollection
) {

	var scoreboardView = Backbone.View.extend({

		template: tmpl,
		initialize: function () {
			// TODO
		},
		render: function () {
			// TODO
			var coll = new scoresCollection();
			var data = {
				items: coll.getExample().toJSON().sort()
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
