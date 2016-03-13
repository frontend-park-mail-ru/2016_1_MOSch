define(function(
	require
) {

	var Backbone = require('backbone');

	var UserModel = Backbone.Model.extend({
		defaults: {
			token: null,
			userID: -1,
			email: null,
			username: null,
			role: null
		}
	});

	return UserModel;
});
