define(function (require) {
	var Backbone = require('backbone'),
		JQuery = require('jquery');

	var isInteger = Number.isInteger || function (x) {
			return typeof x === "number" && isFinite(x) && Math.floor(x) === x;
		};

	var UserModel = Backbone.Model.extend({

		urlSession: 'api/session',
		urlUser: 'api/user',

		defaults: {
			auth_token: null,
			userID: -1,
			login: null,
			level: -1,
			rate: -1,
			info: {}
		},

		initialize: function (options) {
			options = options || {};
			if (options.auth_token) {
				if (options.userID) {
					this.set('userID', options.userID);
				}
				this.set('auth_token', options.auth_token);
				this.fetchFromServer();
			} else {
				if (options.login) {
					this.set('login', options.login);
				}
				if (options.level && isInteger(options.level)) {
					this.set('level', parseInt(options.level, 10));
				}
				if (options.rate && isInteger(options.rate)) {
					this.set('rate', parseInt(options.rate, 10));
				}
			}
		},

		fetchFromServer: function (options, call) {
			options = options || {};
			if (this.get('auth_token') && this.get('userID')) {
				JQuery.ajax({
					method: 'GET',
					dataType: 'json',
					headers: {'auth_token': this.get('auth_token')},
					url: this.urlUser + '/' + this.get('userID'),
					success: function (data, textStatus) {
						this.set('login', data.login);
						if (isInteger(data.level)) {
							this.set('level', parseInt(data.level, 10));
						}
						if (isInteger(data.rate)) {
							this.set('rate', parseInt(data.rate, 10));
						}
						this.set('info', data.info);
						console.log('fetch succ');
						Backbone.Events.trigger('loadUserInfo');
						if (call) {
							call();
						}
					}.bind(this),
					error: function (xhr, textStatus, error) {
						console.log('fetch error ' + error);
						Backbone.Events.trigger('showToast', {
							'type': 'info',
							'text': 'Something wrong'
						});
					}.bind(this)
				});
			}
		},

		updateScores: function (options, call) {
			options = options || {};
			if (!(isInteger(options.level))) {
				options.level = -1;
			}
			if (!(isInteger(options.rate))) {
				options.rate = -1;
			}
			if (this.get('auth_token') && this.get('userID')) {
				JQuery.ajax({
					method: 'POST',
					dataType: 'json',
					headers: {'auth_token': this.get('auth_token')},
					url: this.urlUser + '/' + this.get('userID'),
					contentType: 'application/json;charset=utf-8',
					processData: false,
					data: JSON.stringify({
						'level': options.level,
						'rate': options.rate
					}),
					success: function (data, textStatus) {
						console.log('updateScores succ');
						this.fetchFromServer(null, call);
					}.bind(this),
					error: function (xhr, textStatus, error) {
						console.log('updateScores error ' + error);
						Backbone.Events.trigger('showToast', {
							'type': 'alert',
							'text': 'Something wrong'
						});
					}.bind(this)
				});
			}
		}
	});

	return UserModel;
});
