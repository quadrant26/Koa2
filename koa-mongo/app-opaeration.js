const Koa = require('koa');
const Router = require('koa-router');
const DB = require('./module/db');
const render = require('koa-art-template');
const path = require('path');

const app = new Koa();
const router = new Router();

// art-template
render(app, {
    root: path.join(__dirname, 'views'), // 试图的位置
    extname: '.html',    // 后缀名
    debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});

router.get('/', async (ctx) => {

    // ctx.body = "这是首页"
    var data = await DB.find("user", {});
    console.log(data);

})

router.get('/add', async (ctx) => {

    // ctx.body = "这是首页"
    var data = await DB.insert("user", {"name": "sirius", "age": 1200});
    console.log(data.result);

})

router.get('/edit', async (ctx) => {

    // ctx.body = "这是首页"
    var data = await DB.update("user", {"name": "zhangsan"}, {"name": "张三"});
    console.log(data.result);

})

router.get('/delete', async (ctx) => {

    // ctx.body = "这是首页"
    var data = await DB.remove("user", {"name": "zhangsan"});
    console.log(data.result);

})


app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);