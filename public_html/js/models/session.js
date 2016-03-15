define(function(
	require
) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		JQuery = require('jquery'),
		Cookie = require('jscookie'),
		UserModel = require('models/user');

	var Session = Backbone.Model.extend({
		urlSession: function() { return this.options.host + this.options.session_route; },
		urlUser: function() { return this.options.host + this.options.users_route; },

		defaults: {
			session_guid: null,
			auth_token: null,
			logged_in: false,
			userID: null
		},

		options: {
			default_expires_time: 2,
			host: '/api',
			session_route: '/session',
			users_route: '/user'
		},

		initialize: function( options ){
			_.extend(this.options, options);
			this.on('change:logged_in', function() {
				console.log('logged = '+this.get('logged_in'));
				if (this.get('logged_in')) {
					Backbone.history.navigate('menu', { trigger: true }); // когда пользователь залогинился
				} else {
					Backbone.history.navigate('main', { trigger: true });
				}
			});
			// var cookies = Cookie.get();
			// if (_.has(cookies, 'auth_token') && _.has(cookies, 'session_guid')) {
			// 	cookies.nowarnings = true;
			// 	this.login(cookies);
			// }
		},

		// эта функция сохраняет/обновляет в куках данные о текущей сессии
		// если options.clear === true, то все куки сессии удаляются
		update: function( options ) {
			Cookie.remove('session_guid');
			Cookie.remove('auth_token');
			if (options.clear !== true) {
				if (this.has('auth_token') && this.has('session_guid')) {
					console.log('Save cookies');
					Cookie.set('auth_token', this.get('auth_token'), { expires: this.options.default_expires_time });
					Cookie.set('session_guid', this.get('session_guid'), { expires: this.options.default_expires_time });
				}
			}
		},

		// завершает текущую сессию (logout)
		logout: function( options ) {
			options = options || {};
			if (!this.get('logged_in')) {
				return;
			}
			JQuery.ajax({
				method: 'DELETE',
				contentType: 'application/json;charset=utf-8',
				url: this.urlSession(),
				success: function( data, textStatus ) {
					console.log('logout succ '+textStatus);
					this.resetSession();
				}.bind(this),
				error: function( XMLHttpRequest, textStatus, error ) {
					console.log('logout error '+textStatus);
					Backbone.Events.trigger('showToast', {
						'type': 'info',
						'text': 'Unable to logout'
					});
				}.bind(this)
			});
		},

		// производится попытка создать сессию, используя auth_token, или залогиниться,
		// используя логин и пароль пользователя
		login: function( options ) {
			options = options || {};
			if (this.get('logged_in')) {
				return;
			}
			if (options.auth_token) {
				JQuery.ajax({
					method: 'PUT',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					processData: false,
					url: this.urlSession(),
					data: JSON.stringify({
						'auth_token': options.auth_token
					}),
					success: function( data, textStatus ) {
						this.set('auth_token', data.auth_token);
						console.log('login succ '+textStatus);
						this.afterLogin();
					}.bind(this),
					error: function( XMLHttpRequest, textStatus, error ) {
						console.log('login error '+textStatus);
						this.resetSession();
					}.bind(this)
				});
			} else if (options.username && options.password_phrase) {
				JQuery.ajax({
					method: 'PUT',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					processData: false,
					url: this.urlSession(),
					data: JSON.stringify({
						'login': options.username,
						'password': options.password_phrase
					}),
					success: function( data, textStatus ) {
						this.set('auth_token', data.auth_token);
						console.log('login succ '+textStatus);
						this.afterLogin();
					}.bind(this),
					error: function( XMLHttpRequest, textStatus, error ) {
						console.log('login error '+textStatus);
						Backbone.Events.trigger('showToast', {
							'type': 'alert',
							'text': 'Unable to login'
						});
					}.bind(this)
				});
			} else {
				this.resetSession();
			}
		},

		afterLogin: function( options ) {
			options = options || {};
			this.set('session_guid', this.generateUid());
			JQuery.ajax({
				method: 'GET',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				processData: false,
				url: this.urlSession(),
				data: JSON.stringify({
					'auth_token': this.get('auth_token')
				}),
				success: function( data, textStatus ) {
					console.log('afterLogin succ '+textStatus);
					this.set('userID', data.id);
					this.set('logged_in', true);
				}.bind(this),
				error: function( XMLHttpRequest, textStatus, error ) {
					console.log('afterLogin error '+textStatus);
					Backbone.Events.trigger('showToast', {
						'type': 'alert',
						'text': 'Failure with connection'
					});
					this.resetSession();
				}.bind(this)
			});
		},

		// регистрирует нового пользователя, используя логин
		// и выбранный пользователем пароль
		signup: function( options ) {
			options = options || {};
			if (this.get('logged_in')) {
				return;
			}
			if (options.username && options.password_phrase) {
				JQuery.ajax({
					method: 'PUT',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					processData: false,
					url: this.urlUser(),
					data: JSON.stringify({
						'login': options.username,
						'password': options.password_phrase
					}),
					success: function( data, textStatus ) {
						console.log('signup succ '+textStatus);
						this.login({
							'username': options.username,
							'password_phrase': options.password_phrase
						});
					}.bind(this),
					error: function( XMLHttpRequest, textStatus, error ) {
						console.log('signup error '+textStatus);
						Backbone.Events.trigger('showToast', {
							'type': 'alert',
							'text': 'Unable to signup'
						});
					}.bind(this)
				});
			}
		},

		// возвращает объект UserModel, который соответствует текущей сессии
		getUser: function( options ) {
			if (this.get('logged_in')) {
				return new UserModel({
					auth_token: this.get('auth_token'),
					userID: this.get('userID')
				});
			}
		},

		// стирает данные этой сессии с компьютера пользователя и удаляет саму сессию
		// сбрасывает все параметры сессии к начальным параметрам
		resetSession: function( options ) {
			this.set({
				session_guid: null,
				auth_token: null,
				logged_in: false,
				userID: null
			});
			this.update({ clear: true });
		},

		// Helpers
		// - Creates a unique id for identification purposes
		generateUid: function ( separator ) {
			var delim = separator || "-";
			function S4() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}
			return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
		}
	});

	return Session;
});
