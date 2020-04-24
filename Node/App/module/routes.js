const url = require('url');
const path = require('path');

let G = {};

let app = function (req, res){
    
    let pathname = url.parse(req.url).pathname;

    if(G[pathname]){
        G[pathname](req, res);
    }else{
        res.writeHead(404, {"Content-type": "text/html; charset='utf-8'"});
        res.end('页面不存在')
    }
}

app.get = function (str, cb){
    // 注册方法
    G[str] = cb;
}

module.exports=app;