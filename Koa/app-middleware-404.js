const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 中间件
// 匹配任何路由
// 不写 next 路由匹配到这里就不会继续匹配了
app.use(async (ctx, next) => {
    console.log("这是一个中间件");

    next();

    if ( ctx.status == 404){
        ctx.status = 404;
        ctx.body = "这是一个 404 页面"
    }else{
        console.log(ctx.url)
    }

    // await next(); // 当前路由匹配完成后继续向下匹配
})

// 配置路由
router.get("/", async (ctx) => {
    ctx.body = "首页"
})

router.get("/news", async (ctx) => {
    ctx.body = "新闻页"
})

router.get("/newscontent", async (ctx) => {

    ctx.body = "新闻详情页"
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000)