var http = require('http');
var config = require('./config');
var dispatch = require('./dispatch');

console.log(config);

var server = http.createServer(function (req, res) {
	dispatch.run(req, res);
}).listen(config.port, function () {
	console.log('web server start at port ' + config.port + '.');
});

