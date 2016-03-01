define([
	'backbone',
	'tmpl/main',
	'tmpl/wrapper'
], function(
	Backbone,
	tmpl,
	wrapper
){

	var mainView = Backbone.View.extend({

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

	return mainView;
});
