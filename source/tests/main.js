require.config({
	baseUrl: "../js",
	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		babylon: 'lib/babylon.max',
		cannon: 'lib/cannon', // cannon.js - an optional physics 'engine'
		hand: 'lib/hand', // hand.js - a small framework that assists the Babylon.js cameras
		oimo: 'lib/oimo', // oimo.js - a different physics 'engine' that performs a similar function to cannon.js, but is generally faster
		color: 'lib/color'
	},
	shim: {
		'underscore': {
			deps: ['jquery'],
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'babylon': {
			deps: [],
			exports: 'BABYLON'
		}
		//TODO add Babylon.js libs to shim
	}
});

var tests = [
	'models/user.test',
	'collections/users.test',
	'views/application.test'
];

require(tests, function () {
	QUnit.load();
	QUnit.start();
});
