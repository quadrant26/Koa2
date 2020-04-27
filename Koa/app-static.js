const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views')
const path = require('path')
const common = require("./module/common")
const bodyparser = require('koa-bodyparser')
const static = require('koa-static')

const app = new Koa();
const router = new Router();

// 配置需要渲染的文件路径及文件后缀
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// 配置 bodyparser 中间件
app.use(bodyparser());
// 配置静态web服务的中间件
var staticPath = "./static";
app.use(static(path.join( __dirname,  staticPath)))

// 公共的数据放在这个里面，这样的话模版的任何地方都可以使用
// 写一个中间，配置公共的信息
app.use( async (ctx, next) => {
    ctx.state.userinfo = "张三";
    await next();
})


router.get('/', async (ctx) => {
    // ctx.body = "这是首页"
    let title = "你好 ejs";

    let content = "<h2>这是一个h2的标签</h2>";
    let num = 123;

    await ctx.render('index', {
        title: title,
        content: content,
        num: num
    })
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