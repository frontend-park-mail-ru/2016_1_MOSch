define([
	'backbone',
	'tmpl/scoreboard',
	'collections/scores'
], function(
	Backbone,
	tmpl,
	collection
){

	var scoreboardView = Backbone.View.extend({

		template: tmpl,
		initialize: function () {
			// TODO
		},
		render: function () {
			collection.add();
			collection.sort();
			// TODO
			this.$el.html(this.template({
				items: collection
			}));
			return this;
		},
		show: function () {
			// TODO
		},
		hide: function () {
			// TODO
		}

	});

	return new scoreboardView();
});
