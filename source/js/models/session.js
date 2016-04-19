define(function (require) {

	var Backbone = require('backbone'),
		_ = require('underscore'),
		JQuery = require('jquery'),
		Cookie = require('jscookie'),
		UserModel = require('models/user');

	var Session = Backbone.Model.extend({
		urlSession: function () {
			return this.options.host + this.options.session_route;
		},
		urlUser: function () {
			return this.options.host + this.options.users_route;
		},

		defaults: {
			session_guid: null,
			auth_token: null,
			logged_in: false,
			userID: null,
			login: null
		},

		options: {
			default_expires_time: 2,
			host: '/api',
			session_route: '/session',
			users_route: '/user'
		},

		initialize: function (options) {
			_.extend(this.options, options);
			this.on('change:logged_in', this.onChange);
			var cookies = Cookie.get();
			if (cookies.auth_token && cookies.session_guid) {
				this.login(cookies);
			}
		},

		// эта функция сохраняет/обновляет в куках данные о текущей сессии
		// если options.clear === true, то все куки сессии удаляются
		update: function (options) {
			options = options || {};
			Cookie.remove('session_guid');
			Cookie.remove('auth_token');
			if (options.clear !== true) {
				if (this.has('auth_token') && this.has('session_guid')) {
					console.log('Save cookies');
					Cookie.set('auth_token', this.get('auth_token'), {expires: this.options.default_expires_time});
					Cookie.set('session_guid', this.get('session_guid'), {expires: this.options.default_expires_time});
				}
			}
		},

		// завершает текущую сессию (logout)
		logout: function (options) {
			options = options || {};
			if (!this.get('logged_in')) {
				return;
			}
			JQuery
				.ajax({
					method: 'DELETE',
					headers: {'auth_token': this.get('auth_token')},
					url: this.urlSession(),
					context: this
				})
				.done(function (data, textStatus) {
					console.log('logout succ ' + textStatus);
					this.resetSession();
				})
				.fail(function (xhr, textStatus, error) {
					console.log('logout error ' + error);
					Backbone.Events.trigger('showToast', {
						'type': 'info',
						'text': 'Unable to logout'
					});
				});
		},

		// производится попытка создать сессию, используя auth_token, или залогиниться,
		// используя логин и пароль пользователя
		login: function (options) {
			options = options || {};
			if (this.get('logged_in')) {
				return;
			}
			if (options.auth_token) {
				JQuery
					.ajax({
						method: 'PUT',
						dataType: 'json',
						headers: {'auth_token': options.auth_token},
						url: this.urlSession(),
						context: this
					})
					.done(function (data, textStatus) {
						this.set('auth_token', data.auth_token);
						this.set('userID', data.id);
						console.log('login succ ' + textStatus);
						this.setAuthStatus(true);
					})
					.fail(function (xhr, textStatus, error) {
						console.log('login error ' + error);
						this.resetSession();
					});
			} else if (options.login && options.password_phrase) {
				this.set('login', options.login);
				JQuery
					.ajax({
						method: 'PUT',
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						processData: false,
						url: this.urlSession(),
						data: JSON.stringify({
							'login': options.login,
							'password': options.password_phrase
						}),
						context: this
					})
					.done(function (data, textStatus) {
						this.set('auth_token', data.auth_token);
						this.set('userID', data.id);
						console.log('login succ ' + textStatus);
						this.setAuthStatus(true);
					})
					.fail(function (xhr, textStatus, error) {
						console.log('login error ' + error);
						Backbone.Events.trigger('showToast', {
							'type': 'alert',
							'text': 'Unable to login'
						});
					});
			} else {
				this.resetSession();
			}
		},

		// регистрирует нового пользователя, используя логин
		// и выбранный пользователем пароль
		signup: function (options) {
			options = options || {};
			if (this.get('logged_in')) {
				return;
			}
			if (options.login && options.password_phrase) {
				JQuery
					.ajax({
						method: 'PUT',
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						processData: false,
						url: this.urlUser(),
						data: JSON.stringify({
							'login': options.login,
							'password': options.password_phrase
						}),
						context: this
					})
					.done(function (data, textStatus) {
						console.log('signup succ ' + textStatus);
						this.login({
							'login': options.login,
							'password_phrase': options.password_phrase
						});
					})
					.fail(function (xhr, textStatus, error) {
						console.log('signup error ' + error);
						Backbone.Events.trigger('showToast', {
							'type': 'alert',
							'text': 'Unable to signup'
						});
					});
			}
		},

		// возвращает объект UserModel, который соответствует текущей сессии
		getUser: function (options) {
			if (this.get('logged_in')) {
				return new UserModel({
					auth_token: this.get('auth_token'),
					userID: this.get('userID')
				});
			}
		},

		// устанавливает статус авторизации
		setAuthStatus: function (status) {
			this.set('logged_in', status === true);
		},

		// стирает данные этой сессии с компьютера пользователя и удаляет саму сессию
		// сбрасывает все параметры сессии к начальным параметрам
		resetSession: function (options) {
			this.set({
				session_guid: null,
				auth_token: null,
				logged_in: false,
				userID: null,
				login: null
			});
			this.update({clear: true});
		},

		// обновляет экран при изменении статуса сессии
		onChange: function () {
			this.set({session_guid: this.generateUid()});
			if (this.get('logged_in')) {
				this.update();
			}
			console.log('logged = ' + this.get('logged_in'));
			var route = this.get('logged_in') ? 'menu' : 'main';
			Backbone.history.navigate(route, {trigger: true});
		},

		// Helpers
		// - Creates a unique id for identification purposes
		generateUid: function (separator) {
			var delim = separator || "-";

			function S4() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}

			return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
		}
	});

	return Session;
});
