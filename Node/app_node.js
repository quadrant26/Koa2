const http = require('http');

http.createServer( (req, res) => {
    console.log(req.url); // ! 获取 url

    // ! 设置响应头
    res.writeHead(200, {"Content-type": "text/html; charset='utf-8'"});

    res.write("<head><meta charset='utf-8' /></head>")

    res.write('this is node.js')

    res.write('您好，nodejs')

    res.end(); // ! 结束响应
}).listen(3000);