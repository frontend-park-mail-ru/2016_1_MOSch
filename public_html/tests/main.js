require.config({
	baseUrl: "../js",
	paths: {
		jquery: "lib/jquery.min",
		underscore: "lib/underscore",
		backbone: "lib/backbone",
		jscookie: "lib/js.cookie"
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		}
	}
});

var tests = [
	'models/score.test',
	'models/metricks.test',
	'models/session.test',
	'models/user.test',
	'collections/scores.test',
	'views/application.test'
];

require(tests, function () {
	QUnit.load();
	QUnit.start();
});
