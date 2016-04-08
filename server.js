var express = require('express'),
	errorHandler = require('errorhandler'),
	app = express(),
	proxy = require('express-http-proxy');

var HOSTNAME = 'localhost',
	PORT = 31077,
	PUBLIC_DIR = __dirname + '/static_prod',
	request_count = 0;

app.use(function (req, res, done) {
	var current_date = new Date();
	console.log("[%s] №:[%s], Request: [%s %s]",
		current_date.toLocaleTimeString(),
		request_count++,
		req.method,
		req.url.toLocaleString()
	);
	done();
});

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

app.listen(PORT, function () {
	console.log("BEST game server listening at http://%s:%s", HOSTNAME, PORT);
});

app.use(
	'/api',
	proxy(
		'http://localhost',
		{
			port: 8080,
			forwardPath: function (req, res) {
				console.log("proxy: [%s %s %s]", req.method, req.originalUrl);
				return '/api' + require('url').parse(req.url).path;
			}
		}
	)
);
