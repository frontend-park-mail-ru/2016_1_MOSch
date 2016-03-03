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
			'click .submit-button': 'submitForm'
		},
		template: tmpl,
		initialize: function () {
			// TODO
		},
		render: function () {
			_.bindAll(this, 'submitForm');
			// TODO
			var templatee = this.template();
			this.$el.html(templatee);
			this.delegateEvents();
			return this;
		},
		show: function () {
			// TODO
		},
		hide: function () {
			// TODO
		},

		submitForm: function() {
			console.log("submit login");
		}
	});

	return loginView;
});
