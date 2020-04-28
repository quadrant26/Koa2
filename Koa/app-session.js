const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session')

const app = new Koa();
const router = new Router();

// 配置session的中间件
app.keys = ['some secret hurr'];    // cookie 的签名
const CONFIG = {
    key: 'koa:sess', /** 默认 */
    maxAge: 86400000, /** cookie 的过期时间 需要设置 */
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** true 只有服务端才可以获取 */
    signed: true, /** 默认签名 (default true) */
    rolling: false, /** (boolean) 每次访问都会强制设置cookie (default is false) */
    renew: false, /** (boolean)  快过期重新设置. (default is false) 需要修改*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};
app.use(session(CONFIG, app));

router.get('/', async (ctx) => {
    
    // 获取 session
    let userinfo = ctx.session.userinfo
    ctx.body = "这是首页" + userinfo;
})

router.get("/login", async (ctx) => {
    // 设置 session
    ctx.session.userinfo = "zhangsan";
    ctx.body = "登录成功";
})

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000)