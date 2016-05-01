require.config({
	baseUrl: "../js",
	paths: {
		jquery: "lib/jquery",
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
	'models/user.test',
	'collections/users.test',
	'views/application.test'
];

require(tests, function () {
	QUnit.load();
	QUnit.start();
});
