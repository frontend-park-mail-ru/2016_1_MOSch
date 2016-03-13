define(function(
	require
) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		$ = require('jquery'),
		tmpl = require('tmpl/login');

	var loginView = Backbone.View.extend({
		el: '.content',
		events: {
			'click .submit-button': 'submitForm'
		},
		template: tmpl,
		initialize: function (session) {
			this._session = session;
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
			var username = String($('#username').val());
			var password = String($('#password').val());
			if (! /[A-Za-z0-9]{1,32}/.test(username)) {
				Backbone.Events.trigger('showAlert', 'Введите правильный username');
				return;
			}
			if (! /[A-Za-z0-9]{6,32}/.test(password)) {
				Backbone.Events.trigger('showAlert', 'Введите правильный пароль');
				return;
			}
			console.log("submit login " + username + " " + password);
			this._session.login({
				'username': username,
				'password_phrase': password
			});
		}
	});

	return loginView;
});
