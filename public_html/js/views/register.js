define(function(
	require
) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		tmpl = require('tmpl/register');

	var registerView = Backbone.View.extend({

		events: {
			'submit .form': 'submitForm'
		},
		template: tmpl,
		initialize: function () {

		},
		render: function () {
			var templatee = this.template();
			this.$el.html(templatee);
			return this;
		},
		show: function () {

		},
		hide: function () {

		},

		submitForm: function(e) {
			e.preventDefault();
			console.log("submit register");
		}
	});

	return registerView;
});
