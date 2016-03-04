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
			console.log("submit login");
		}
	});

	return loginView;
});
