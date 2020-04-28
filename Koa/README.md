[TOC]

# Koa2

1. koa

    ```
        cnpm install koa -S

        const Koa = require('koa')
        const app = new Koa()

        app.use(async(ctx)=>{
            let url =ctx.url;

            //从request中获取GET请求
            let request =ctx.request;
            let req_query = request.query;
            let req_querystring = request.querystring;

            //从上下文中直接获取
            let ctx_query = ctx.query;
            let ctx_querystring = ctx.querystring;

            ctx.body={
                url,
                req_query,
                req_querystring,
                ctx_query,
                ctx_querystring
            }

        });
    ```

2. 路由 router

    ```
        cnpm i -S koa-router
        const Router = require('koa-router');

        // 前缀
        const router = new Router({
            prefix: '/jspang'
        })

        // 多子路由
        let home = new Router()
        home.get('/jspang', function (ctx, next){
            ctx.body = 'Home JSPang'
        }).get('/todo', function (ctx, next){
            ctx.body = 'Home Todo'
        })

        let page = new Router()
        page.get('/jspang', function (ctx, next){
            ctx.body = 'page JSPang'
        }).get('/todo', function (ctx, next){
            ctx.body = 'page Todo'
        })

        // 装载所有的子路由
        let router = new Router();
        router.use('/home', home.routes(), home.allowedMethods())
        router.use('/page', page.routes(), page.allowedMethods())

        //加载路由中间件
        app.use(router.routes()).use(router.allowedMethods());
    ```

3. POST and GET

    ```
        app.use( async (ctx)=>{
            if(ctx.url==='/' && ctx.method === 'GET'){

            }else if(ctx.url==='/' && ctx.method === 'POST'){

            }
        })

        // 获取 get 传值
        // 从 ctx 中获取
        console.log(ctx.query);   // ! { id: '22', name: '1234' } 获取的是对象
        console.log(ctx.querystring) // ! id=22&name=1234 获取的是字符串


        // ctx 里面的 request 里面获取get传值
        console.log(ctx.request.url);       // ! /newscontent?id=22&name=1234
        console.log(ctx.request.query);     // ! { id: '22', name: '1234' } 获取的是对象
        console.log(ctx.request.querystring); // ! id=22&name=1234

        // 获取动态路由
        router.get("/newscontent/:aid/:uid", async (ctx) => {
            console.log(ctx.params);    // { aid: '123', uid: '456' }
            ctx.body = "新闻详情"
        })

    ```
    
    获取 post 传过来的数据
        

    第一种： 利用原生获取

        ```
        return new Promise ( (resolve, reject) => {
            try{
                let str = '';
                ctx.req.on("data", function (data){
                    str += data;
                })

                ctx.req.on("end", function (){
                    resolve(str);
                })
            } catch (err) {
                reject(err)
            }
            
        })
        ```

    第二种： 利用 [koa-bodyparser](#bodyparser)

4. 中间件

    ```
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

        router.get("/news", async (ctx) => {
            console.log("这个是新闻页的路由03");
            ctx.body = "新闻页"
        })

        // 公共的数据放在这个里面，这样的话模版的任何地方都可以使用
        // 写一个中间，配置公共的信息
        app.use( async (ctx, next) => {
            ctx.state.userinfo = "张三";
            await next();
        })
    
    ```

5. ejs

    ```
        cnpm i -S koa-views
        cnpm i -S ejs

        const Koa = require('koa')
        const views = require('koa-views')
        const path = require('path')
        const app = new Koa()

        // 加载引擎模板
        app.use(views(path.join(__dirname, './view'), {
            extension: 'ejs'
        }))

        // app.use(views('./views'), {map: {html: 'ejs'}}) // 这样配置的模板的后缀名是 html

        // 在 ejs 文件中 include
        <% include("./public/header.ejs") %>

        app.use( async (ctx) => {
            let title = 'hello koa2'
            await ctx.render('index', {
                title
            })
        })
    ```

> <div id="bodyparser"></div>
6. koa-bodyparser 

    ```
        // 1. 安装
        cnpm i -S koa-bodyparser
        // 2. 导入
        const bodyParser = require('koa-bodyparser')
        // 3. 设置中间件
        app.use(bodyParser());
        // 4. bodyparser 获取表单提交的数据
        let data = ctx.request.body;
        ctx.body = data;
    ```

7. koa-static

    ```
        cnpm i -S koa-static
        // 引入
        const static = require('koa-static')
        // 设置目录
        const staticPath = './static'
        // 配置中间件
        app.use(static(
            path.join( __dirname,  staticPath)
        ))
    ```

8. art-template

    install

        ```
            npm install --save art-template
            npm install --save koa-art-template
        ```
    
    Example

        ```
            const Koa = require('koa');
            const render = require('koa-art-template');

            const app = new Koa();
            render(app, {
                root: path.join(__dirname, 'view'),
                extname: '.art',
                debug: process.env.NODE_ENV !== 'production'
            });

            app.use(async function (ctx) {
                await ctx.render('user');
            });

            app.listen(8080);
        ```

9. cookie

    ```
        ctx.cookies.get(name,[optins]):读取上下文请求中的cookie。
        ctx.cookies.set(name,value,[options])：在上下文中写入cookie。

        ctx.cookies.set(
            'myName', 'pang', {
                domain: '   127.0.0.1',
                path: '/index',
                maxAge: 1000*60*60*24,
                expires: new Date('2019-4-26'),
                httpOnly: false,    // 是否只是服务器访问 默认 true
                overwrite: false
            }
        );

        ctx.cookies.get('myName');
    ```

10. session 

    install

        `npm install koa-session --save`

    导入

        `const session = require('koa-session')`

    设置中间件
        
        ```
        app.keys = ['some secret hurr'];
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

        // 设置值
        ctx.session.username = "value"
        // 获取值
        ctx.session.username
    ```