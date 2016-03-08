define(function(
	require
) {

	var Backbone = require('backbone');

	var UserModel = Backbone.Model.extend({
		defaults: {
			id: '',
			login: '',
			password: '',
			role: ''
		}
	});

	return UserModel;
});
