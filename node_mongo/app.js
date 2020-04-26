// 引入mongodb
const {MongoClient} = require("mongodb");

// 定义数据库连接地址
const url = "mongodb://localhost:27017";

// 定义要操作的数据库
const dbname = "itying";

// 实例化 MongoClient 传入数据库连接地址
const client = new MongoClient(url);

client.connect( (err) => {
    if( err ){
        console.log(err)
        return;
    }

    console.log("数据库连接成功");

    let db = client.db(dbname);
    
    // 关闭数据库连接
    client.close();
    
})
