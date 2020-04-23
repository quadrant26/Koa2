const http = require('http');
const url = require('url');

http.createServer(function (request, response) {

  response.writeHead(200, {'Content-Type': 'text/html, charset="utf-8"'});

  response.write("<head><meta charset='utf-8' /></head>");
  response.write("Hello world");

  console.log(request.url);
  if( request.url == '/favicon.ico'){
    
  }else{
    var userinfo = url.parse(request.url, true).query;
    console.log(`姓名： ${userinfo.name}, 年龄： ${userinfo.age}`);
  }

  response.end();

}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');