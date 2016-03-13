define(function (require) {
	QUnit.module("collections/scores");

	QUnit.test("scoresCollection - экземпляр Backbone.Collection", function () {

		var scoresCollection = require('./scores'),
			scores = new scoresCollection();

		QUnit.ok(scores instanceof Backbone.Collection);

	});

	QUnit.test("scoresCollection отсортирована", function () {

		var getExample = require('getExampleScoresCollection'),
			_ = require('underscore'),
			scores = getExample();


		_.each(scores.toJSON(), function(item, index, list) {
			if (index < (list.length - 1)) {
				QUnit.ok(list[index].rate >= list[index + 1].rate);
			}
		});
	});

	QUnit.test("scoresCollection автоматически упорядочивается", function () {

		var getExample = require('getExampleScoresCollection'),
			_ = require('underscore'),
			scores = getExample();

		scores.add([
			{ username: 'Friend', 		rate: 70072, 	level: 100	},
			{ username: 'User', 		rate: 1000, 	level: 17	},
			{ username: 'NDND', 		rate: 10011, 	level: 1	},
			{ username: 'Alex', 		rate: 9475, 	level: 20	}
		]);

		_.each(scores.toJSON(), function(item, index, list) {
			if (index < (list.length - 1)) {
				QUnit.ok(list[index].rate >= list[index + 1].rate);
			}
		});
	});
});
