const url = require('url');

function changeRes (res){
    res.send = (data) => {
        res.writeHead(200, {"Content-type": "text/html; charset='utf-8'"});
        res.write("<head><meta charset='utf-8' /></head>")
        res.end(data);
    }
}


let server = () => {
    let G = {};
    // 分割 get 和 post 请求
    G._get = {};
    G._post = {};

    let app = function (req, res){
        // 扩展res方法
        changeRes(res);

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

    return app;
}


module.exports=server();