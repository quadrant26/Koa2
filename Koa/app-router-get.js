const Koa = require('koa');
const Router = require('koa-router')

// 实例化
const app = new Koa();
// 实例化路由
const router = new Router();


// 配置路由
router.get("/", async (ctx) => {
    ctx.body = "首页"
})

router.get("/news", async (ctx) => {
    ctx.body = "新闻页"
})

router.get("/newscontent", async (ctx) => {
    // 获取get 传值
    // 从 ctx 中获取
    console.log(ctx.query);   // ! { id: '22', name: '1234' } 获取的是对象
    console.log(ctx.querystring) // ! id=22&name=1234 获取的是字符串


    // ctx 里面的 request 里面获取get传值
    console.log(ctx.request.url);       // ! /newscontent?id=22&name=1234
    console.log(ctx.request.query);     // ! { id: '22', name: '1234' } 获取的是对象
    console.log(ctx.request.querystring); // ! id=22&name=1234

    ctx.body = "新闻详情"
})

























app
    .use(router.routes())    // 启动路由
    .use(router.allowedMethods());  // 建议配置

/*
 * router.allowedMethods()
 * 当所有路由中间件最后调用， 此时根据 ctx.statuus 设置 response 响应头 
 */



app.listen(3000)