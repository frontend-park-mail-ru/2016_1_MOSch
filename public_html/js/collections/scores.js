define([
	'backbone',
	'models/score'
], function(
	Backbone,
	playerModel
){
	var playersCollection = Backbone.Collection.extend({
		model: playerModel,
		comparator: function (player) {
			return -(+player.get('rate'));
		}
	});

	return new playersCollection([
		{ name: 'Andrew', email: 'mail@mail.ru', rate: 72000 },
		{ name: 'Sawoder', email: 'mail@mail.ru', rate: 7851 },
		{ name: 'Nick', email: 'mail@mail.ru', rate: 5895 },
		{ name: 'Alexey', email: 'mail@mail.ru', rate: 9485 },
		{ name: 'KOPTE3', email: 'mail@mail.ru', rate: 5765 },
		{ name: 'Pupkin', email: 'mail@mail.ru', rate: 42 },
		{ name: 'Hero', email: 'mail@mail.ru', rate: 9999 },
		{ name: 'Devil Player', email: 'mail@mail.ru', rate: 666 },
		{ name: 'Pi', email: 'mail@mail.ru', rate: 3 },
		{ name: 'Voloshin LOL', email: 'mail@mail.ru', rate: 9876 }
	]);
});
