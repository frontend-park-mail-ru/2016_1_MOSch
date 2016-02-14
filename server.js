var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express();

var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html',
	request_count = 0;


app.use(function (req, res) {
	// Здесь нужно написать журналирование в формате
	// (журналирование - вывод в консоль)
	// [время] [номер запроса по счету]
	var current_date = new Date();
	console.log("Date: [%s] Request No.:[%s], User Agent: [%s] IP: [%s] \n", current_date.toLocaleString(),
		request_count++, req.headers['user-agent'].toLocaleString(),
		req.connection.remoteAddress.toLocaleString()
				);
	res.send('Hello, World!!! Ты зашел на localhost $)');
});

app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

app.listen(PORT, function () {
	console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});
