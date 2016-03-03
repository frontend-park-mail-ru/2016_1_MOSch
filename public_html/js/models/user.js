define([
	'backbone'
], function(
	Backbone
){
	var userModel = Backbone.Model.extend({
		defaults: {
			id: '',
			login: '',
			password: '',
			role: ''
		}
	});

	return userModel;
});
