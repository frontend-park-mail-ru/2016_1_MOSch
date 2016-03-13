var express = require('express'),
	errorHandler = require('errorhandler'),
	app = express(),
	proxy = require('express-http-proxy'),
	bodyParser = require('body-parser');

var HOSTNAME = 'localhost',
	PORT = 8080,
	PUBLIC_DIR = __dirname + '/public_html',
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
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

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
				console.log("proxy: [%s %s %s]", req.method, req.originalUrl, JSON.stringify(req.body));
				return '/api'+require('url').parse(req.url).path;
			}
		}
	)
);
