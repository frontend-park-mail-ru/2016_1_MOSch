define([
	'backbone',
	'tmpl/register',
	'tmpl/wrapper'
], function(
	Backbone,
	tmpl,
	wrapper
){

	var registerView = Backbone.View.extend({

		wrap: wrapper,
		template: tmpl,
		initialize: function () {
			// TODO
		},
		render: function () {
			// TODO
			this.$el.html(this.wrap())
			this.$('.content').html(this.template());
			return this;
		},
		show: function () {
			// TODO
		},
		hide: function () {
			// TODO
		}

	});

	return registerView;
});
