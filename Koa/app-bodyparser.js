const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views')
const path = require('path')
const common = require("./module/common")
const bodyparser = require('koa-bodyparser')

const app = new Koa();
const router = new Router();

// 配置需要渲染的文件路径及文件后缀
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// 配置 bodyparser 中间件
app.use(bodyparser());


router.get('/', async (ctx) => {
    ctx.body = "这是首页"
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
})

router.get("/newscontent", async (ctx) => {
    ctx.body = "新闻详情页"
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000)