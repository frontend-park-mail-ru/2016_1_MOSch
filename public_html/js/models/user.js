define([
	'backbone'
], function(
	Backbone
){
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
