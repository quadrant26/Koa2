const http = require('http');
const app = require('./module/routes');

http.createServer(app).listen(3000);

// 注册路由
app.get('/', function (req, res){
    res.writeHead(200, {"Content-type": "text/html; charset='utf-8'"});
    res.write("<head><meta charset='utf-8' /></head>");
    res.end('首页')
})

app.get('/login', function (req, res){
    res.writeHead(200, {"Content-type": "text/html; charset='utf-8'"});
    res.write("<head><meta charset='utf-8' /></head>");
    res.end('执行登录操作')
})

console.log("The server is http://127.0.0.1:3000");