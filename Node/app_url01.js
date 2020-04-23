const url = require('url');

var api = 'http://www.baidu.com?name=king&age=18';
console.log(url.parse(api, true))

var temp = url.parse(api, true).query;
console.log(temp);

console.log( `姓名： ${temp.name}, 年龄： ${temp.age}`)