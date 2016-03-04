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
			// TODO
		},
		render: function () {
			// TODO
			this.data.reqrating = 72000;
			this.data.onlinerating = 666;
			this.$el.html(this.template(this.data));
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
