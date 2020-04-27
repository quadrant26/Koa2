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