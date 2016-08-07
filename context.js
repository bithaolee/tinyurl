var Context = function (req, res, args, dispatch) {
	this.req = req;
	this.res = res;
	this.args = args;
	this.dispatch = dispatch;
};

Context.prototype.renderJSON = function (code, message, data) {
	this.res.writeHead(200, {
		'Content-Type': 'text/json',
	});

	this.res.write(JSON.stringify({
		code: code,
		message: message,
		data: data || []
	}));

	this.res.end();
};

Context.prototype.success = function (message, data) {
	this.renderJSON(200, message, data);
};

Context.prototype.error = function (message, code, data) {
	var code = code || 500;
	this.renderJSON(code, message, data);
};

Context.prototype.redirect = function (url) {
	this.res.writeHead(302, 'Move Template', {
		Location: url,
	});
	this.res.end();
}


module.exports = Context;