var fs = require('fs');

try {
	var hah = require('./haha');
} catch (ex) {
	console.log('controller not found');
	console.log(ex);
}
