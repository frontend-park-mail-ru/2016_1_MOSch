var express = require('express'),
	errorHandler = require('errorhandler'),
	proxy = require('express-http-proxy'),
	app = express(),
	HOSTNAME = 'localhost',
	PORT = 31077,
	PROXY = 31079,
	PUBLIC_DIR = __dirname + '/static_dev';

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

app.listen(PORT, function () {
	console.log("BEST game server listening at http://%s:%s", HOSTNAME, PORT);
});

app.use('/api', proxy('http://localhost', {
		port: PROXY,
		forwardPath: function (req, res) {
			return '/api' + require('url').parse(req.url).path;
		}
	})
);
