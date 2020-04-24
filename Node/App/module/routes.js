const url = require('url');
const fs = require('fs');
const path = require('path');

function changeRes (res){
    res.send = (data) => {
        res.writeHead(200, {"Content-type": "text/html; charset='utf-8'"});
        res.write("<head><meta charset='utf-8' /></head>")
        res.end(data);
    }
}

let getFileMime = function (extname){
    var data = fs.readFileSync("./module/mime.json");
    let mimeObj = JSON.parse(data.toString());
    return mimeObj[extname];
}

let initStatic = function (req, res, staticPath){
    let pathname = url.parse(req.url).pathname;
    pathname = pathname == "/" ? "/index" : pathname;
    let extname = path.extname(pathname);

    if ( pathname != "/favicon.ico"){
        try{
            let data = fs.readFileSync('./'+staticPath + pathname);
            if(data){
                let mime = getFileMime(extname);
                res.writeHead(200, {"Content-type" : `${mime}; charset="utf-8"`});
                res.end(data);
            }
        }catch(e){

        }
    }
}


let server = () => {
    let G = {
        _get: {},
        _post: {},
        staticPath: 'static'
    };
    // 分割 get 和 post 请求

    let app = function (req, res){
        // 扩展res方法
        changeRes(res);
        // 配置静态web服务
        initStatic(req, res, G.staticPath);

        let pathname = url.parse(req.url).pathname;
        // 获取请求类型
        let method = req.method.toLowerCase();
        if(G['_'+method][pathname]){
            if ( method == "get"){
                G._get[pathname](req, res);
            }else{
                // 获取post数据
                let postData = '';
                req.on("data", function (chunkdata){
                    postData += chunkdata;
                })
                req.on("end", () => {
                    req.body = postData;
                    G._post[pathname](req, res);
                })
            }
            
        }else{
            res.writeHead(404, {"Content-type": "text/html; charset='utf-8'"});
            res.write('<head><meta charset="utf-8" /></head>');
            res.end('页面不存在')
        }
    }

    app.get = function (str, cb){
        // 注册方法
        G._get[str] = cb;
    }

    app.post = function (str, cb){
        G._post[str] = cb
    }

    // 配置静态web目录
    app.static = function (staticPath){
        G.staticPath = staticPath;
    }

    return app;
}


module.exports=server();