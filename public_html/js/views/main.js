define([
	'backbone',
	'tmpl/main'
], function(
	Backbone,
	tmpl
){

	var mainView = Backbone.View.extend({

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

	return mainView;
});
