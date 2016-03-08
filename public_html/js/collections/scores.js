define(function(
	require
) {

	var Backbone = require('backbone'),
		scoreModel = require('models/score');

	var scoresCollection = Backbone.Collection.extend({
		model: scoreModel,
		comparator: function (score) {
			return -(+score.get('rate'));
		}
	});

	return scoresCollection;
});
