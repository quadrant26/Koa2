const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views')
const path = require('path')

const app = new Koa();
const router = new Router();

// 配置需要渲染的文件路径及文件后缀
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

//  ejs 无法生效
// app.use(views('./views'), {
//     extension: 'ejs'
// })

// app.use(views('./views'), {map: {html: 'ejs'}}) // 这样配置的模板的后缀名是 html

// 公共的数据放在这个里面，这样的话模版的任何地方都可以使用
// 写一个中间，配置公共的信息
app.use( async (ctx, next) => {
    ctx.state.userinfo = "张三";
    await next();
})


router.get('/', async (ctx) => {
    let title = "你好 ejs";

    let content = "<h2>这是一个h2的标签</h2>";
    let num = 123;

    await ctx.render('index', {
        title: title,
        content: content,
        num: num
    })
})

router.get("/news", async (ctx) => {
    // ctx.body = "新闻页"
    let list = ["新闻1111","新闻2222","新闻3333","新闻4444","新闻5555",];
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