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
			idUser: '',
			logged_in: false,
			login: null,
			level: -1,
			rate: -1,
			info: {}
		},
		idAttribute: 'idUser',
		initialize: function (options) {
			options = options || {};
			this.checkAuth();
		},

		checkAuth: function () {
			var options = {};
			options.context = this;
			options.dataType = 'json';
			options.success = function (body, httpStatus, options) {
				if (body.id) {
					this.set('idUser', response.id);
					this.set('logged_in', true);
					this.fetch();
				}
			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				console.log(error + ': ' + httpStatus);
			};
			this.sync('check', this, options);
		},
		logout: function () {
			var options = {};
			options.context = this;
			options.success = function (body, httpStatus, options) {
				this.set('idUser', '');
				this.set('logged_in', false);
			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				console.log(error + ': ' + httpStatus);
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

			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				console.log(error + ': ' + httpStatus);
			};
			this.sync('login', this, options);
		},
		fetch: function () {
			var options = {};
			options.context = this;
			options.dataType = 'json';
			options.success = function (body, httpStatus, options) {
				this.set(body);
			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				console.log(error + ': ' + httpStatus);
			};
			this.sync('fetch', this, options);
		},
		signup: function (username, password) {
			var options = {};
			options.context = this;
			options.contentType = 'application/json;charset=utf-8';
			options.data = JSON.stringify({
				'login': options.login,
				'password': options.password_phrase
			});
			options.success = function (body, httpStatus, options) {

			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				console.log(error + ': ' + httpStatus);
			};
			this.sync('signup', this, options);
		},
		update: function () {
			var options = {};
			options.context = this;
			options.contentType = 'application/json;charset=utf-8';
			options.data = JSON.stringify({});
			options.success = function (body, httpStatus, options) {

			};
			options.error = function (xhr, error, httpStatus) {
				debugger;
				console.log(error + ': ' + httpStatus);
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
				case 'signup':
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
				case 'signup':
					return 'create';
				default:
					return 'read';
			}
		}
	});

	return UserModel;
});
