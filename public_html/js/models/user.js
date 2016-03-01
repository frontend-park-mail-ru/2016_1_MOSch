define([
	'backbone',
	'models/score'
], function(
	Backbone,
	scoreModel
){
	var userModel = Backbone.Model.extend({
		defaults: {
			username: '',
			email: '',
			password: '',
			score: {
				rate: 0,
				level: 0
			}
		}
	});
	return userModel;
});
