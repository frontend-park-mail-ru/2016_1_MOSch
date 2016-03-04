define([
	'underscore',
	'backbone',
	'tmpl/login'
], function(
	_,
	Backbone,
	tmpl
) {

	var loginView = Backbone.View.extend({

		events: {
			'click button': 'submitForm'
		},
		template: tmpl,
		initialize: function () {
			// TODO
		},
		render: function () {
			var templatee = this.template();
			this.$el.html(templatee);
			//this.delegateEvents();
			return this;
		},
		show: function () {
			// TODO
		},
		hide: function () {
			// TODO
		},

		submitForm: function() {
			alert();
			console.log("submit login");
		}
	});

	return loginView;
});
