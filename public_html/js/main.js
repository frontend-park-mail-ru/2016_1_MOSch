require.config({
	baseUrl: "js",
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

require(['app']);
