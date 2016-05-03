'use strict';

var CACHE_NAME = 'v1',
	MAX_AGE = 300000,
	cacheUrls = [
		'/',
		'/index.html',
		'/css/main.css',
		'/js/main.js',
		'/img/background.jpg',
		'/img/logo.png'
	];

self.addEventListener('install', function (event) {
	console.log('install', event);
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(cacheUrls);
		})
	);
});

self.addEventListener('activate', function (event) {
	console.log('activate', event);
});

self.addEventListener('fetch', function (event) {
	event.respondWith((function () {
		var url = event.request.url;
		if (/^.*\/api\/.*$/.test(url)) {
			var fetchRequest = event.request.clone();
			return fetch(fetchRequest)
				.then(function (response) {
					if (response) {
						console.log(response.status);
					}
					if (!response || response.status === 404) {
						var body = '{"message":"You are offline"}';
						var init = {"status": 408, "statusText": "Request Timeout"};
						return new Response(body, init);
					}
					return response;
				})
				.catch(function () {
					var body = '{"message":"You are offline"}';
					var init = {"status": 408, "statusText": "Request Timeout"};
					return new Response(body, init);
				});
		}
		return caches.match(event.request)
			.then(function (cachedResponse) {
				var doUpdate = false;
				var lastModified, fetchRequest;

				if (cachedResponse) {
					lastModified = new Date(cachedResponse.headers.get('last-modified'));
					if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {
						doUpdate = true;
					}
				} else {
					doUpdate = true;
				}

				if (doUpdate) {
					fetchRequest = event.request.clone();
					return fetch(fetchRequest)
						.then(function (response) {
							if (!response || response.status !== 200) {
								return cachedResponse;
							}
							caches.open(CACHE_NAME).then(function (cache) {
								cache.put(event.request, response.clone());
							});
							return response;
						})
						.catch(function () {
							return cachedResponse;
						});
				} else {
					return cachedResponse;
				}
			})
	})());
});
