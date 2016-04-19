define(function(
	require
) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		$ = require('jquery'),
		tmpl = require('tmpl/login');

	var loginView = Backbone.View.extend({

		events: {
			'submit .form': 'submitForm'
		},
		template: tmpl,
		initialize: function ( options ) {
			this._session = options.session;
			this.$el.hide();
		},
		render: function () {
			var templatee = this.template();
			this.$el.html(templatee);
			return this;
		},
		show: function () {
			if (this._session.get('logged_in')) {
				Backbone.Events.trigger('showToast', {
					'type': 'info',
					'text': 'You are already registered'
				});
				Backbone.history.navigate('menu', { trigger: true });
				return;
			}
			this.render();
			this.$el.show();
			return this;
		},
		hide: function () {
			this.$el.hide();
			return this;
		},

		submitForm: function(e) {
			e.preventDefault();
			var username = String(this.$('#username').val());
			var password = String(this.$('#password').val());
			var check = true;

			if (username === "") {
				Backbone.Events.trigger('showToast', {
					'type': 'alert',
					'text': 'Enter username'
				});
				check = false;
			} else if (! /^[A-Za-z0-9]{1,32}$/.test(username)) {
				Backbone.Events.trigger('showToast', {
					'type': 'alert',
					'text': 'Enter valid username'
				});
				check = false;
			}

			if (password === "") {
				Backbone.Events.trigger('showToast', {
					'type': 'alert',
					'text': 'Enter password'
				});
				check = false;
			} else if (! /^[A-Za-z0-9]{6,32}$/.test(password)) {
				Backbone.Events.trigger('showToast', {
					'type': 'alert',
					'text': 'Enter valid password'
				});
				check = false;
			}
			if (check) {
				console.log("submit login: " + username + " " + password);
				this._session.login({
					'login': username,
					'password_phrase': password
				});
			}
			return check;
		}
	});

	return loginView;
});
