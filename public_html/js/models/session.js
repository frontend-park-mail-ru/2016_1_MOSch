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
			token: null,
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
			this.on('change:logged_in', function() { Backbone.history.navigate('', { trigger: true }); });
			var cookies = Cookie.get();
			if (_.has(cookies, 'token') && _.has(cookies, 'session_guid')) {
				cookies.nowarnings = true;
				this.login(cookies);
			}
		},

		// эта функция сохраняет/обновляет в куках данные о текущей сессии
		// если options.clear === true, то все куки сессии удаляются
		update: function( options ){
			Cookie.remove('session_guid');
			Cookie.remove('token');
			if (options.clear !== true) {
				if (this.has('token') && this.has('session_guid')) {
					Cookie.set('token', this.get('token'), { expires: this.options.default_expires_time });
					Cookie.set('session_guid', this.get('session_guid'), { expires: this.options.default_expires_time });
				}
			}
		},

		// завершает текущую сессию (logout)
		logout: function( options ) {
			if (this.get('logged_in')) {
				JQuery.ajax({
					method: 'DELETE',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					processData: false,
					url: this.urlSession(),
					success: function( data, textStatus ) {
						console.log('logout succ '+textStatus);
						this.resetSession();
					},
					error: function( XMLHttpRequest, textStatus, error ) {
						console.log('logout error '+textStatus);
						Backbone.Events.trigger('showMessage', 'Не удалось разлогиниться на сервере');
					}
				});
			}
		},

		// производится попытка создать сессию, используя token, или залогиниться,
		// используя логин и пароль пользователя
		login: function( options ) {
			if (this.get('logged_in') === false) {
				if (_.has(options, 'token')) {
					JQuery.ajax({
						method: 'PUT',
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						processData: false,
						url: this.urlSession(),
						data: JSON.stringify({
							'token': options.token
						}),
						success: function( data, textStatus ) {
							this.set('token', data.token);
							console.log('login succ '+textStatus);
							this.afterLogin();
						},
						error: function( XMLHttpRequest, textStatus, error ) {
							console.log('login error '+textStatus);
							this.resetSession();
						}
					});
				}
				else if (_.has(options, 'username') && _.has(options, 'password_phrase')) {
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
							this.set('token', data.token);
							console.log('login succ '+textStatus);
							this.afterLogin();
						},
						error: function( XMLHttpRequest, textStatus, error ) {
							console.log('login error '+textStatus);
							Backbone.Events.trigger('showAlert', 'Не удалось войти на сервер');
						}
					});
				}
				else
				{
					this.resetSession();
				}
			}
		},

		afterLogin: function( options ) {
			this.set('session_guid', this.generateUid());
			JQuery.ajax({
				method: 'GET',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				processData: false,
				url: this.urlSession(),
				data: JSON.stringify({
					'token': this.get('token')
				}),
				success: function( data, textStatus ) {
					console.log('afterLogin succ '+textStatus);
					this.set('userID', data.userID);
					this.set('logged_in', true);
				},
				error: function( XMLHttpRequest, textStatus, error ) {
					console.log('afterLogin error '+textStatus);
					Backbone.Events.trigger('showMessage', 'Ошибка связи');
					this.resetSession();
				}
			});
		},

		// регистрирует нового пользователя, используя логин (адрес электронной почты)
		// и выбранный пользователем пароль
		signup: function( options ) {
			if (this.get('logged_in') === false) {
				if (_.has(options, 'username') && _.has(options, 'password_phrase')) {
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
						},
						error: function( XMLHttpRequest, textStatus, error ) {
							console.log('signup error '+textStatus);
							Backbone.Events.trigger('showAlert', 'Не удалось зарегистрироваться на сервере');
						}
					});
				}
			}
		},

		// возвращает объект UserModel, который соответствует текущей сессии
		getUser: function( options ) {
			if (this.get('logged_in')) {
				return new UserModel({
					token: this.get('token'),
					userID: this.get('userID')
				});
			}
		},

		// стирает данные этой сессии с компьютера пользователя и удаляет саму сессию
		// сбрасывает все параметры сессии к начальным параметрам
		resetSession: function( options ) {
			this.set({
				session_guid: null,
				token: null,
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
