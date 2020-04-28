const Koa = require('koa');
const Router = require('koa-router');
const db = require('./module/db');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {

    // ctx.body = "这是首页"
    var result = await db.find("user", {});
    console.log(result);
})




app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);