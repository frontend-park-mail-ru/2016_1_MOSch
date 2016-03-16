define(function (require) {
	QUnit.module("models/metricks");

	QUnit.test("metricksModel - экземпляр Backbone.Model", function () {

		var metricksModel = require('./metricks'),
			metricks = new metricksModel();

		QUnit.ok(metricks instanceof Backbone.Model);

	});
});
