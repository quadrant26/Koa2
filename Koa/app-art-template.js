const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views')
const path = require('path')
const common = require("./module/common")
const bodyparser = require('koa-bodyparser')
const static = require('koa-static')
const render = require('koa-art-template');

const app = new Koa();
const router = new Router();

// art-template 设置
render(app, {
    root: path.join(__dirname, 'views'), // 试图的位置
    extname: '.html',    // 后缀名
    debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});

// 配置 bodyparser 中间件
app.use(bodyparser());
// 配置静态web服务的中间件
var staticPath = "./static";
app.use(static(path.join( __dirname,  staticPath)))

router.get('/', async (ctx) => {
    ctx.body = "这是首页"
    
    await ctx.render('art')
})

router.get('/login', async (ctx) => {
    await ctx.render("login")
})


router.post("/doAdd", async (ctx) => {
    // 获取表单提交的数据

    // 原生js 获取到 post 数据
    // var data = await common.getPostData(ctx);
    // console.log(data);

    // bodyparser 获取表单提交的数据
    let data = ctx.request.body;
    ctx.body = data;
})

router.get("/news", async (ctx) => {
    ctx.body = "这是新闻页"

    let list = {
        name: "zhangsan",
        h: "<h2>这是一个h2</h2>",
        num: 20,
        arr: [1111,2222,3333,4444]
    }
    await ctx.render('news', {
        list: list
    })
})

router.get("/newscontent", async (ctx) => {
    ctx.body = "新闻详情页"
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000)