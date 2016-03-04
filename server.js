var express = require('express'),
	errorHandler = require('errorhandler'),
	app = express(),
	proxy = require('express-http-proxy');

var HOSTNAME = 'localhost',
	PORT = 8080,
	PUBLIC_DIR = __dirname + '/public_html',
	request_count = 0;



app.use(function (req, res, done) {
	var current_date = new Date();
	console.log("Date: [%s] Request No.:[%s], Request: [%s %s %s]",
		current_date.toLocaleString(),
		request_count++,
		//req.headers['user-agent'].toLocaleString(),
		req.method,
		req.url.toLocaleString(),
		req.body
		//req.connection.remoteAddress.toLocaleString()
	);

	done();
});

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

app.listen(PORT, function () {
	console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});

app.use(
	'/api',
	proxy(
		'http://localhost',
		{
			port: 31072,
			forwardPath: function(req, res) {
				console.log(req.originalUrl);
				return '/api'+require('url').parse(req.url).path;
			}
		}
	)
);
