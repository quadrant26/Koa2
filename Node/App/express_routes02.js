let G = {};

let app = function (req, res){
    console.log("调用app方法")
    if( G['/login']){
        // 执行方法
        G['/login'](req, res);
    }
}

app.get = function (str, cb){
    // 注册方法
    G[str] = cb;
}

app.post = function (){
    console.log('post方法')
}

// 调用方法
app.get("/login", function (req, res){
    console.log("执行 login 方法");
});
// app.post();

setTimeout(function (){
    app('req', 'res');
}, 1000)
