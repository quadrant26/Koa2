[TOC]

# Nodejs

## http

    ``` node
    http.createServer( (request, response) => {

        // ! 获取url
        console.log(request.url)

        // ! 设置响应头
        response.writeHead(200, {"Content-type": "text/html, charset='utf-8'"});

        // ! 结束响应
        response.end();
    })
    ```

## url

    url.parse(url)         解析url
    url.parse(url, true)         解析url (返回query Object 对象)
    url.formate(urlObject)  url.parse() 操作的逆向操作
    url.resolve(from,, to)   替换

## supervisor

    ```
        // 安装
        cnpm install -g supervisor
        // 使用
        supervisor server.js
    ```

## fs

    fs.stat             检测是文件还是目录
    fs.mkdir            创建目录
    fs.writeFile        创建写入文件
    fs.appendFile       追加文件
    fs.readFile         读取文件
    fs.readdir          读取目录
    fs.rename           重命名
    fs.rmdir            删除目录
    fs,unlink           删除文件

    ``` node
        fs.stat('./module', function (err, data){
            if( err ){
                console.log(err)
                return;
            }

            console.log(`是文件： ${data.isFile()}`)
            console.log(`是目录： ${data.isDirectory()}`)
        })
    ```

## 模块化封装

    ``` node
        // ! 模块导出
        // 第一种导出
        exports.obj = obj;
        // 第二种方式导出
        module.exports = obj;

        // 模块导入
        const moduleNmae = require(path)
    ```

## fs 文件写入读取流

    ``` node
        // 文件读取流
        var readStream = fs.createReadStream('./data/input.txt');
        var count = 0;
        var str = '';
        readStream.on('data', (data) => {
            str += data;
            count ++;
        })
        readStream.on('end', () => {
            console.log(str);
            console.log(count)
        })
        readStream.on('error', (err) => {
            console.log(err)
        })

        // 文件写入流
        var str = "";
        for(var i = 0; i < 500; i++ ){
            str += '这个改成www.baidu.com\n'
        }
        var writeStream = fs.createWriteStream('./data/data.txt');
        writeStream.write(str);
        // 标记写入完成
        writeStream.end();
        // 监听写入完成 必须要 标记写入完成， 否则无法触发此方法
        writeStream.on('finish', function (){
            console.log("写入完成");
        })

        // 管道流 复制文件
        var readStream = fs.createReadStream("./aaa.jpg");
        var writeSteam = fs.createWriteStream("./bbb.jpg");
        readStream.pipe(writeSteam);
    ```