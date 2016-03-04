define([
	'backbone'
], function(
	Backbone
){
	var ScoreModel = Backbone.Model.extend({
		defaults: {
			username: '',
			rate: 0,
			level: 0
		}
	});
	return ScoreModel;
});
