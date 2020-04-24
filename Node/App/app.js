const http = require('http');
const app = require('./module/routes');
const ejs = require('ejs');

http.createServer(app).listen(3000);

// 注册路由
app.get('/', function (req, res){
    res.writeHead(200, {"Content-type": "text/html; charset='utf-8'"});
    res.write("<head><meta charset='utf-8' /></head>");
    res.end('首页')
})

app.get('/login', function (req, res){
    // res.write("<head><meta charset='utf-8' /></head>");
    // res.end('执行登录操作')
    ejs.renderFile('./views/form.ejs', {}, (err, data) => {
        res.writeHead(200, {"Content-type": "text/html; charset='utf-8'"});
        res.end(data);
    })
})

app.post("/doLogin", (req, res) => {
    console.log("doLogin")
    res.writeHead(200, {"Content-type": "text/html; charset='utf-8'"});
    res.end(req.body);
})

console.log("The server is http://127.0.0.1:3000");