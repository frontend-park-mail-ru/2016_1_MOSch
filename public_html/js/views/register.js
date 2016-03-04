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
			'submit form': 'submitForm'
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

		submitForm: function(e) {
			e.preventDefault();
			console.log("submit register");
		}
	});

	return registerView;
});
