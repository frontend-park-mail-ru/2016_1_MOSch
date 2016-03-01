define([
	'backbone',
	'tmpl/menu',
	'tmpl/wrapper'
], function(
	Backbone,
	tmpl,
	wrapper
){

	var menuView = Backbone.View.extend({

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

	return menuView;
});
