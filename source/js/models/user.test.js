define(function (require) {
	QUnit.module("models/user");

	QUnit.test("userModel - экземпляр Backbone.Model", function () {

		var userModel = require('./user'),
			user = new userModel();

		QUnit.ok(user instanceof Backbone.Model);

	});
});
