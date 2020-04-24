const http = require('http');
const request = require('./module/request.js');

console.log(request)

http.createServer( (req, res) => {

    res.writeHead(200, {"Content-type" : "text/html; charset='utf-8'"});

    res.write("<head><meta charset='utf-8' /></head>");

    res.write("Hello node");

    var api = tools.formatApi('api/focus');
    res.write(api);

    res.end();
}).listen(3000);