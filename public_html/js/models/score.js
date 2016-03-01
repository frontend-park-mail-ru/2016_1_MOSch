define([
	'backbone'
], function(
	Backbone
){
	var scoreModel = Backbone.Model.extend({
		defaults: {
			username: '',
			rate: 0,
			level: 0
		}
	});
	return scoreModel;
});
