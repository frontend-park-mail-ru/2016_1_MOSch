define(function (require) {
	QUnit.module("models/score");

	QUnit.test("scoreModel - экземпляр Backbone.Model", function () {

		var scoreModel = require('./score'),
			score = new scoreModel();

		QUnit.ok(score instanceof Backbone.Model);

	});
});
