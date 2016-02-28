define([
	'backbone'
], function(
	Backbone
){
	var playerModel = Backbone.Model.extend({
		defaults: {
			username: '',
			email: '',
			rate: 0
		}
	});
	return playerModel;
});
