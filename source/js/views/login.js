define(function (require) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		$ = require('jquery'),
		tmpl = require('tmpl/login');

	var loginView = Backbone.View.extend({

		events: {
			'submit .form': 'submitForm'
		},
		template: tmpl,
		initialize: function (options) {
			this._user = options.user;
			this.$el.hide();
		},
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		show: function () {
			if (this._user.loggedIn()) {
				Backbone.Events.trigger('showToast', {
					'type': 'info',
					'text': 'You are already registered'
				});
				Backbone.history.navigate('menu', {trigger: true});
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

		submitForm: function (e) {
			e.preventDefault();
			var username = $.trim(String(this.$('#username').val()));
			var password = $.trim(String(this.$('#password').val()));
			var check = true;

			if (username === '') {
				Backbone.Events.trigger('showToast', {
					'type': 'alert',
					'text': 'Enter username'
				});
				check = false;
			} else if (!/^[A-Za-z0-9]{1,20}$/.test(username)) {
				Backbone.Events.trigger('showToast', {
					'type': 'alert',
					'text': 'Enter valid username'
				});
				check = false;
			}

			if (password === '') {
				Backbone.Events.trigger('showToast', {
					'type': 'alert',
					'text': 'Enter password'
				});
				check = false;
			} else if (!/^[A-Za-z0-9]{6,20}$/.test(password)) {
				Backbone.Events.trigger('showToast', {
					'type': 'alert',
					'text': 'Enter valid password'
				});
				check = false;
			}
			if (check) {
				console.log('submit login: ' + username + ':' + password);
				this._user.login(username, password);
			}
			return check;
		}
	});

	return loginView;
});
