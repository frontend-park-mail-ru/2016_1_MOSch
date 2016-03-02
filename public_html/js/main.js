require.config({
	//urlArgs: "_=" + (new Date()).getTime(),
	baseUrl: "js",
	paths: {
		jquery: "lib/jquery.min",
		underscore: "lib/underscore",
		backbone: "lib/backbone"
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'app': {
			deps: ['backbone', 'underscore']
		}
	}
});

require(['app'],
function(App) {
	window.bTask = new App();
});
