require.config({
	baseUrl: "js",
	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		jscookie: 'lib/js.cookie',
		babylon: 'lib/babylon.max'
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
	}
});

require(['app']);
