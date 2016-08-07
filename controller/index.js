var crypto = require('crypto');
var url = require('../model/url');

var controller = {
	index: function () {
		console.log(this.args);
		// this.redirect('/index/add');
	},
	transfer: function () {
		if (!this.args[0]) {
			this.error('require url to be transfer');
		}

		var urlPreTransfer = this.args[0];
		var key = crypto.createHash('md5')
				.update(urlPreTransfer)
				.digest('hex');

		var context = this;
		url.setShortUrl(key, function (res) {
			
			context.success('ok', {key: res});
		});

	},
};

module.exports = controller;