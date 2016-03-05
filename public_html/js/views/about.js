define([
	'backbone',
	'tmpl/about'
], function(
	Backbone,
	tmpl
) {

	var aboutView = Backbone.View.extend({

		template: tmpl,
		data: {},
		initialize: function () {
			
		},
		render: function () {
			
			this.data.reqrating = 72000;
			this.data.onlinerating = 666;
			this.$el.html(this.template(this.data));
			return this;
		},
		show: function () {
			
		},
		hide: function () {
			
		}

	});

	return aboutView;
});
