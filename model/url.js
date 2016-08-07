var redis = require('redis');
var redisLock = require('redis-lock');

var Url = function () {
	var redisClient = redis.createClient({
		host: '127.0.0.1',
		port: 6379
	});

	var _this = this;
	this.redisClient = redisClient;
	this.generateUniq = function (callback) {
		var redisClient = this.redisClient;
		var _counterKey = 'counter';
		var counter = 0;

		redisClient.on('connect', function (res) {
			console.log('connected');
		});

		redisClient.on('error', function (err) {
			if (err) {
				throw err;
			}
		});

		redisClient.get(_counterKey, function (err, res) {
			if (err) {
				throw err;
			};

			if (!res) {
				redisClient.set(_counterKey, counter, function (err, res) {
					if (err) {
						throw err;
					}
				});
			} else {
				counter = res;
			}
			redisClient.incr(_counterKey, function (err, res) {
				if (err) {
					throw err;
				};

				callback(_this.transfer(res));
			});
		});
	};

	// diffrent hex transfer
	// 10 -> 61
	this.transfer = function (num) {
		var arr = [
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
			'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		];

		var len = arr.length;
		var val = left = 0;
		var tempArr = [];
		var res = '';

		do {
			val = Math.floor(num / len);
			left = num % len;
			num = val;
			tempArr.push(left);
		} while(num > 0);

		for (i = 0; i < 5; i ++) {
			if (i < tempArr.length) {
				tempArr[i] = arr[tempArr[i] - 1];
			} else {
				tempArr.push('0');
			}
		}

		return tempArr.reverse().join('');
	};

	this.setShortUrl = function (key, callback) {
		var _this = this;
		this.redisClient.sadd('key_sets', key, function (err, res) {
			if (err) {
				throw err;
			}

			if (res) {
				_this.generateUniq(function (code) {
					_this.redisClient.set(res, key, function (err, res) {
						if (err) {
							throw err;
						}
						console.log(code);
						callback(code);
					});
				});
			} else {
				callback('');
			}
		});
	};
};

module.exports = new Url;