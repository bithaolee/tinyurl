var url = require('url');
// console.log(url);
var path = 'http://www.baidu.com:8080/p/a/t/h?query=a&b=c#myhash';

var urlResolved = url.parse(path);
console.log(urlResolved);
