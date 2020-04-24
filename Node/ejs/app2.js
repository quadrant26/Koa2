const http = require('http');
const routes = require('./module/routes');
const url = require('url');

http.createServer(function (request, response) {

    routes.static(request, response, 'static')

    let pathname = url.parse(request.url).pathname.replace("/", "");
    console.log(pathname);
    try{
        routes[pathname](request, response);
    } catch (e){

    }

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');