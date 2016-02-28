define([
	'backbone',
	'tmpl/game'
], function(
	Backbone,
	tmpl
){

	var gameView = Backbone.View.extend({

		template: tmpl,
		initialize: function () {
			// TODO
		},
		render: function () {
			// TODO
			this.$el.html(this.template());
			return this;
		},
		show: function () {
			// TODO
		},
		hide: function () {
			// TODO
		}

	});

	return new gameView();
});
