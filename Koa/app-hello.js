const Koa = require('koa');

const app = new Koa();


// 配置路由

// 中间件

// express 写法
// app.use(function (res, res){
//     res.send("返回数据")
// })


app.use( async (ctx) => {
    ctx.body = ("您好， Koa");
})

app.listen(3000)