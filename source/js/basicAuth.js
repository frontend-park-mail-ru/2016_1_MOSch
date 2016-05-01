define(function (require) {

	var Backbone = require('backbone'),
		_ = require('underscore');

	var btoa = window.btoa;

	var encode = function (credentials) {
		return btoa([credentials.username, credentials.password].join(':'));
	};

	Backbone.BasicAuth = {
		getHeader: function (credentials) {
			return {'Authorization': 'Basic ' + encode(credentials)};
		}
	};

	var originalSync = Backbone.sync;

	Backbone.sync = function (method, model, options) {
		options = options || {};

		var credentials, remoteUrl, remoteUrlParts;

		if (model.credentials) {
			credentials = _.result(model, 'credentials');
		}

		if (!credentials) {
			remoteURL = options.url || _.result(model, 'url');

			remoteUrlParts = remoteURL.match(/\/\/(.*):(.*)@/);
			if (remoteUrlParts && remoteUrlParts.length === 3) {
				credentials = {
					username: remoteUrlParts[1],
					password: remoteUrlParts[2]
				};
			}
		}

		if (credentials) {
			options.headers = options.headers || {};
			_.extend(options.headers, Backbone.BasicAuth.getHeader(credentials));
		}
		return originalSync.call(model, method, model, options);
	};

	return Backbone;
});
