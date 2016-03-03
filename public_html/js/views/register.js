define([
	'underscore',
	'backbone',
	'tmpl/register'
], function(
	_,
	Backbone,
	tmpl
) {

	var registerView = Backbone.View.extend({
		
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
			console.log("submit register");
		}
	});

	return registerView;
});
