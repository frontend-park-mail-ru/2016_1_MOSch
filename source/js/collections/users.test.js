define(function (require) {
	QUnit.module("collections/users");

	QUnit.test("usersCollection - экземпляр Backbone.Collection", function () {

		var usersCollection = require('./users'),
			users = new usersCollection(),
			Backbone = require('backbone');

		QUnit.ok(users instanceof Backbone.Collection);

	});

	QUnit.test("usersCollection отсортирована", function () {

		var _ = require('underscore'),
			usersCollection = require('./users'),
			users = new usersCollection([
				{login: 'login1', level: 5, rate: 77},
				{login: 'login2', level: 4, rate: 4},
				{login: 'login3', level: 7, rate: 14},
				{login: 'login4', level: 6, rate: 14},
				{login: 'login5', level: 4, rate: 111111}
			]);

		_.each(users.toJSON(), function (item, index, list) {
			if (index < (list.length - 1)) {
				QUnit.ok(list[index].rate >= list[index + 1].rate);
			}
		});

		users.add([
			{username: 'Friend', rate: 72, level: 100},
			{username: 'User', rate: 100, level: 17},
			{username: 'NDND', rate: 11, level: 1},
			{username: 'Alex', rate: 95, level: 20}
		]);

		_.each(users.toJSON(), function (item, index, list) {
			if (index < (list.length - 1)) {
				QUnit.ok(list[index].rate >= list[index + 1].rate);
			}
		});
	});
});
