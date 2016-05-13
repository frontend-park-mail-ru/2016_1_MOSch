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
			username: null,
			level: -1,
			rate: -1,
			info: {}
		},

		_logged_in: false,
		initialize: function (options) {
			options = options || {};
			this.checkAuth();
		},

		checkAuth: function () {
			var options = {};
			options.mymethod = 'check';
			options.dataType = 'json';
			options.success = function (model, response, options) {
				debugger;
				model.changeAuthState(true);				
			};
			options.error = function (model, xhr, options) {
				debugger;
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log('Error: ' + xhr.statusText + '. Message: ' + xhr.responseJSON.message);
			};
			this.fetch(options);
		},
		logout: function () {
			var options = {};
			options.wait = true;
			options.mymethod = 'logout';
			options.success = function (model, response, options) {
				debugger;
				model.changeAuthState(false);
			};
			options.error = function (model, xhr, options) {
				debugger;
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log('Error: ' + xhr.statusText + '. Message: ' + xhr.responseJSON.message);
			};
			this.destroy(options);
		},
		login: function (username, password) {
			this.credentials = {
				username: username,
				password: password
			};
			var options = {};
			options.mymethod = 'login';
			options.dataType = 'json';
			options.mydata = JSON.stringify({});
			options.success = function (model, response, options) {
				debugger;
				Backbone.Events.trigger('showToast', {
					'type': 'info',
					'text': 'Hello, ' + username
				});
				Backbone.Events.trigger('showToast', {
					'type': 'info',
					'text': 'ID: ' + model.id
				});
				model.changeAuthState(true);
			};
			options.error = function (model, xhr, options) {
				debugger;
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log('Error: ' + xhr.statusText + '. Message: ' + xhr.responseJSON.message);
				Backbone.Events.trigger('showToast', {
					'type': 'alert',
					'text': 'Unable to login: ' + xhr.responseJSON.message.toLowerCase()
				});
			};
			this.save({}, options);
		},
		fetchData: function () {
			var options = {};
			options.mymethod = 'fetch';
			options.dataType = 'json';
			options.success = function (model, response, options) {
				debugger;
				var data = localStorage.getItem('playerdata');
				if (data) {
					localStorage.removeItem('playerdata');
					var obj = JSON.parse(data);
					if (obj.username === this.get('username')) {
						this.updateData(obj);
					}
				}
			};
			options.error = function (model, xhr, options) {
				debugger;
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log('Error: ' + xhr.statusText + '. Message: ' + xhr.responseJSON.message);
				Backbone.Events.trigger('showToast', {
					'type': 'info',
					'text': 'Something wrong. Reload the page later'
				});
			};
			this.fetch(options);
		},
		signup: function (username, password) { // регистрация
			var options = {};
			options.mymethod = 'signup';
			options.contentType = 'application/json;charset=utf-8';
			options.mydata = JSON.stringify({
				'username': username,
				'password': password
			});
			options.success = function (model, response, options) {
				debugger;
				model.login(username, password);
			};
			options.error = function (model, xhr, options) {
				debugger;
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log('Error: ' + xhr.statusText + '. Message: ' + xhr.responseJSON.message);
				Backbone.Events.trigger('showToast', {
					'type': 'alert',
					'text': 'Unable to signup: ' + xhr.responseJSON.message.toLowerCase()
				});
			};
			this.save({}, options);
		},
		updateData: function (data) {
			var options = {};
			options.mymethod = 'update';
			options.contentType = 'application/json;charset=utf-8';
			options.mydata = JSON.stringify(data || this.toJSON());
			options.success = function (model, response, options) {
				debugger;
				model.fetchData();
			};
			options.error = function (model, xhr, options) {
				debugger;
				options.mydata = JSON.parse(options.mydata);
				options.mydata.username = model.get('username');
				var data = JSON.stringify(options.mydata);
				localStorage.setItem('playerdata', data);
				xhr.responseJSON = xhr.responseJSON || {'message': 'none'};
				console.log('Error: ' + xhr.statusText + '. Message: ' + xhr.responseJSON.message);
			};
			this.save({}, options);
		},

		sync: function (method, model, options) {
			options || (options = {});
			if (options.mydata) {
				options.data = options.mydata;
			}
			if (!options.mymethod) {
				alert('error!!!!');
			}
			options.url = this.getCustomUrl(options.mymethod.toLowerCase());
			arguments[0] = this.replaceMethod(options.mymethod.toLowerCase());
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

		changeAuthState: function (state) {
			this._logged_in = state;
			if (this._logged_in) {
				this.fetchData();
			} else {
				this.id = null;
				this.username = null;
			}
			console.log('logged = ' + this._logged_in);
			var route = this._logged_in ? 'menu' : 'main';
			Backbone.history.navigate(route, {trigger: true});
		},

		getInfo: function () {
			return {
				'username': this.get('username'),
				'level': this.get('level'),
				'rate': this.get('rate'),
				'id': this.id
			}
		},

		loggedIn: function () {
			return this._logged_in;
		}

	});

	return UserModel;
});
