const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 中间件
// 匹配任何路由
// 不写 next 路由匹配到这里就不会继续匹配了
app.use(async (ctx, next) => {
    
    console.log("这是一个中间件01");

    next();

    console.log("执行完毕后又会回来这个中间件05");
})

app.use(async (ctx, next) => {
    
    console.log("这是一个中间件02");

    next();

    console.log("执行完毕后又会回来这个中间件04");
})

// 配置路由
router.get("/", async (ctx) => {
    ctx.body = "首页"
})

router.get("/news", async (ctx) => {
    console.log("这个是新闻页的路由03");
    ctx.body = "新闻页"
})

router.get("/newscontent", async (ctx) => {

    ctx.body = "新闻详情页"
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000)