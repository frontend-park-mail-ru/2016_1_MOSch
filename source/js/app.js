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

	window.getDevicePixelRatio = function () {
		var ratio = 1;
		// To account for zoom, change to use deviceXDPI instead of systemXDPI
		if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
			// Only allow for values > 1
			ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
		}
		if (window.devicePixelRatio !== undefined) {
			ratio = window.devicePixelRatio;
		}
		return ratio;
	};

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
