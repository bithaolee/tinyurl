var fs = require('fs');
var path = require('path');
var url = require('url');
var Context = require('./context');
var Dispatch = {};


Dispatch.run = function (req, res) {
	var routeInfo = this.route(req);

	try {
		var controller = require('./controller/' + routeInfo.controller);
		var action = controller[routeInfo.action] || null;
		if (!action) {
			this._404(res);
		} else {
			var context = new Context(req, res, routeInfo.args, this);
			action.apply(context);
		}
	} catch (e) {
		// console.log(e);
		this._500(res);
	}
};

Dispatch._404 = function (res) {
	res.writeHead(404, {
		'Content-Type': 'text/plain'
	});
	res.write('404 File not found at this server.');
	res.end();
};

Dispatch._500 = function (res) {
	res.writeHead(500, {
		'Content-Type': 'text/plain'
	});
	res.write('500 Internal Error.');
	res.end();
};

Dispatch.route = function (req) {
	var urlResolved = url.parse(req.url);
	var path = urlResolved.pathname.split('/');
	path.shift();

	return {
		'controller': path[0] || 'index',
		'action': path[1] || 'index',
		'args': path.slice(2) || []
	};
};

module.exports = Dispatch;