define([
	'backbone',
	'models/score'
], function(
	Backbone,
	scoreModel
){
	var scoresCollection = Backbone.Collection.extend({
		model: scoreModel,
		comparator: function (score) {
			return -(+score.get('rate'));
		}
	});

	return scoresCollection;
});
