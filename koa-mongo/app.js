const Koa = require('koa');
const Router = require('koa-router');
const DB = require('./module/db');
const render = require('koa-art-template');
const path = require('path');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

// 配置 bodyparser 中间件
app.use(bodyParser())

// art-template
render(app, {
    root: path.join(__dirname, 'views'), // 试图的位置
    extname: '.html',    // 后缀名
    debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});

router.get('/', async (ctx) => {

    // 显示信息
    var data = await DB.find("user", {});
    await ctx.render('index', {
        list: data
    })
})

// 增加成员页面
router.get('/add', async (ctx) => {
    ctx.body = "增加用户";
    await ctx.render('add');

})

// 执行成员页面
router.post('/addUser', async (ctx) => {

    // 获取 post 传过来的数据
    let data = ctx.request.body;

    let result = await DB.insert('user', data)

    try{
        if ( data.result.ok){
            ctx.redirect('/')
        }
    } catch (err) {
        console.log(err)
        ctx.redirect('/add')
        return;
    }
})

// 编辑用户
router.get('/edit', async (ctx) => {

    // 获取用户信息
    let id = ctx.query.id;
    // 根据 id 查找数据
    let data = await DB.find("user", {"_id": DB.getObjectId(id)});

    await ctx.render('edit', {
        list: data[0]
    })
})

router.post('/editUser', async (ctx) => {

    var postData = ctx.request.body;
    var id = postData.id;
    var name = postData.name;
    var age = postData.age;
    var data = DB.update("user", {"_id": DB.getObjectId(id)}, {name, age});

    try{
        if ( data.result.ok){
            ctx.redirect('/')
        }
    } catch (err) {
        console.log(err)
        ctx.redirect('/edit')
        return;
    }

})

// 删除用户
router.get('/delete', async (ctx) => {

    let id = ctx.query.id;
    var data = await DB.remove("user", {"_id": DB.getObjectId(id)});

    try{
        if ( data.result.ok){
            ctx.redirect('/')
        }
    } catch (err) {
        console.log(err)
        ctx.redirect('/')
        return;
    }

})


app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);