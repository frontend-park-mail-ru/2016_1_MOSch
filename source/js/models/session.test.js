define(function (require) {
	QUnit.module("models/session");

	QUnit.test("sessionModel - экземпляр Backbone.Model", function () {

		var sessionModel = require('./session'),
			session = new sessionModel();

		QUnit.ok(session instanceof Backbone.Model);

	});
});
