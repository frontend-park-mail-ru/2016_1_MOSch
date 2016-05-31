define(function (require) {

	if (navigator.serviceWorker) {
		navigator.serviceWorker.register('/service-worker.js')
			.then(function (registration) {
				console.log('ServiceWorker registration', registration);
			})
			.catch(function (err) {
				throw new Error('ServiceWorker error: ' + err);
			});
	}

	require('devicePixelRatio');
	require('basicAuth');

	var Backbone = require('backbone'),
		Router = require('router'),
		jQuery = require('jquery');

	var App = function (options) {
		options = options || {};
		if (window.innerHeight < 355 || window.innerWidth < 355) {
			jQuery('meta[name="viewport"]').attr('content', 'width=device-width, height=device-height, initial-scale=0.8, user-scalable=no, maximum-scale=0.8');
		}
		new Router();
		Backbone.history.start();
	};

	return new App();
});
