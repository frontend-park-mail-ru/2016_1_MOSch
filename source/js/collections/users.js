define(function (require) {

	var Backbone = require('backbone'),
		userModel = require('models/user');


	var UsersCollection = Backbone.Collection.extend({
		model: userModel,
		comparator: function (score) {
			return -(score.get('rate'));
		}
	});

	return UsersCollection;
});
