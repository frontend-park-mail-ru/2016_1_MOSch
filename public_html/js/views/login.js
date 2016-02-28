define([
	'backbone',
	'tmpl/login'
], function(
	Backbone,
	tmpl
){

	var loginView = Backbone.View.extend({

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

	return new loginView();
});
