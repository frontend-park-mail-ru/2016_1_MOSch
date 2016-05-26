define(function (require) {

	// if (navigator.serviceWorker) {
	// 	navigator.serviceWorker.register('/service-worker.js')
	// 		.then(function (registration) {
	// 			console.log('ServiceWorker registration', registration);
	// 		})
	// 		.catch(function (err) {
	// 			throw new Error('ServiceWorker error: ' + err);
	// 		});
	// }

	require('devicePixelRatio');
	require('basicAuth');

	var Backbone = require('backbone'),
		Router = require('router');

	var App = function (options) {
		options = options || {};
		new Router();
		Backbone.history.start();
	};

	return new App();
});
