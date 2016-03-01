define([
	'backbone',
	'tmpl/scoreboard',
	'tmpl/wrapper'
], function(
	Backbone,
	tmpl,
	wrapper
){

	var scoreboardView = Backbone.View.extend({

		wrap: wrapper,
		template: tmpl,
		initialize: function () {
			// TODO
		},
		render: function (collection) {
			// TODO
			this.$el.html(this.wrap())
			this.$('.content').html(this.template({
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

	return scoreboardView;
});
