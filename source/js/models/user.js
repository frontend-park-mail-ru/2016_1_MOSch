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
			idUser: null,
			logged_in: false,
			username: null,
			level: -1,
			rate: -1,
			info: {}
		},
		idAttribute: 'idUser',
		initialize: function (options) {
			options = options || {};
			this.on('change:logged_in', this.changeAuthState);
			this.checkAuth();
		},

		checkAuth: function () {
			var options = {};
			options.context = this;
			options.dataType = 'json';
			options.success = function (body, httpStatus, options) {
				debugger;
				if (body.id) {
					this.set('idUser', body.id);
					this.set('logged_in', true);
					this.fetch();
				}
			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log(error + ': ' + httpStatus + '. Message: ' + xhr.responseJSON.message);
			};
			this.sync('check', this, options);
		},
		logout: function () {
			var options = {};
			options.context = this;
			options.success = function (body, httpStatus, options) {
				debugger;
				this.set('idUser', null);
				this.set('logged_in', false);
			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log(error + ': ' + httpStatus + '. Message: ' + xhr.responseJSON.message);
				this.set('idUser', null);
				this.set('logged_in', false);
			};
			this.sync('logout', this, options);
		},
		login: function (username, password) {
			this.credentials = {
				username: username,
				password: password
			};
			var options = {};
			options.dataType = 'json';
			options.context = this;
			options.success = function (body, httpStatus, options) {
				debugger;
				this.set('idUser', +body.id);
				this.set('logged_in', true);
				Backbone.Events.trigger('showToast', {
					'type': 'info',
					'text': 'Hello, ' + username
				});
				Backbone.Events.trigger('showToast', {
					'type': 'info',
					'text': body.id
				});
			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log(error + ': ' + httpStatus + '. Message: ' + xhr.responseJSON.message);
			};
			this.sync('login', this, options);
		},
		fetch: function () {
			var options = {};
			options.context = this;
			options.dataType = 'json';
			options.success = function (body, httpStatus, options) {
				debugger;
				this.set(body);
			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log(error + ': ' + httpStatus + '. Message: ' + xhr.responseJSON.message);
			};
			this.sync('fetch', this, options);
		},
		signup: function (username, password) { // регистрация
			var options = {};
			options.context = this;
			options.contentType = 'application/json;charset=utf-8';
			options.data = JSON.stringify({
				'username': username,
				'password': password
			});
			options.success = function (body, httpStatus, options) {
				debugger;
				this.login(username, password);
			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log(error + ': ' + httpStatus + '. Message: ' + xhr.responseJSON.message);
			};
			this.sync('signup', this, options);
		},
		update: function () {
			var options = {};
			options.context = this;
			options.contentType = 'application/json;charset=utf-8';
			options.data = JSON.stringify({});
			options.success = function (body, httpStatus, options) {
				debugger;
				this.fetch();
			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log(error + ': ' + httpStatus + '. Message: ' + xhr.responseJSON.message);
			};
			this.sync('update', this, options);
		},

		sync: function (method, model, options) {
			options || (options = {});
			options.url = this.getCustomUrl(method.toLowerCase());
			arguments[0] = this.replaceMethod(method);
			return Backbone.sync.apply(this, arguments);
		},

		getCustomUrl: function (method) {
			switch (method) {
				case 'check':
					return this.urlSession;
				case 'logout':
					return this.urlSession;
				case 'login':
					return this.urlSession;
				case 'fetch':
					return this.urlUser + '/' + this.id;
				case 'signup': // регистрация
					return this.urlUser;
				case 'update':
					return this.urlUser + '/' + this.id;
				default:
					return 'api';
			}
		},

		replaceMethod: function (method) {
			switch (method) {
				case 'check':
				case 'fetch':
					return 'read';
				case 'logout':
					return 'delete';
				case 'login':
				case 'update':
					return 'update';
				case 'signup': // регистрация
					return 'create';
				default:
					return 'read';
			}
		},

		changeAuthState: function () {
			if (this.get('logged_in')) {
				this.fetch();
			}
			console.log('logged = ' + this.get('logged_in'));
			var route = this.get('logged_in') ? 'menu' : 'main';
			Backbone.history.navigate(route, {trigger: true});
		},

		getInfo: function () {
			return {
				'username': this.get('username'),
				'level': this.get('level'),
				'rate': this.get('rate'),
				'idUser': this.get('idUser')
			}
		},

		loggedIn: function () {
			return this.get('logged_in');
		}
	});

	return UserModel;
});
