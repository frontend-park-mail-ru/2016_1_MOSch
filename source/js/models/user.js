define(function(
	require
) {

	var Backbone = require('backbone');

	var UserModel = Backbone.Model.extend({
		defaults: {
			auth_token: null,
			userID: -1,
			login: null,
			role: null,
			level: -1,
			rate: -1
		}
	});

	return UserModel;
});
