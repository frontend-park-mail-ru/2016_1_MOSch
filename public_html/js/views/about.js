define([
	'backbone',
	'tmpl/about',
	'tmpl/wrapper'
], function(
	Backbone,
	tmpl,
	wrapper
){

	var aboutView = Backbone.View.extend({

		wrap: wrapper,
		template: tmpl,
		initialize: function () {
			// TODO
		},
		render: function (data) {
			// TODO			
			this.$el.html(this.wrap())
			this.$('.content').html(this.template(data));
			return this;
		},
		show: function () {
			// TODO
		},
		hide: function () {
			// TODO
		}

	});

	return aboutView;
});
