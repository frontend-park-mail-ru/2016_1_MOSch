define([
	'backbone',
	'tmpl/register'
], function(
	Backbone,
	tmpl
) {

	var registerView = Backbone.View.extend({

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

	return registerView;
});
