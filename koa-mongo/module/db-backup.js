// ! DB

var MongoClient = require('mongodb').MongoClient;

var Config = require('./config');

// 封装类库
class Db {

    // 单例模式
    // 多次实例化实例不共享的问题
    static getInstance (){
        if( !Db.instance){
            Db.instance = new Db();
        }
        return Db.instance;
    }

    constructor (){

        this.dbclient = ""; // 存放 db 对象
        // ! 初始化的时候连接数据库
        // this.connect();
    }

    connect (){

        var _that = this;
        // ? 连接数据库
        return new Promise( (resolve, reject) => {
            // 判断 db 是否连接
            if( !_that.dbclient){ // 解决数据库多次连接的问题
                MongoClient.connect(Config.dbUrl, (err, client) =>{
                    if( err ){
                        reject(err);
                    }else{
                        _that.dbclient = client.db(Config.dbname);
                        resolve(_that.dbclient);
                    }
                })
            }else{
                resolve(_that.dbclient);
            }
        })
    }

    find (collectionName, json){
        return new Promise( (resolve, reject) => {
            this.connect().then( (db) => {
                var result = db.collection(collectionName).find(json);
                result.toArray( function (err, docs){

                    if( err ){
                        reject(err);
                        return;
                    }else{
                        resolve(docs)
                    }
                })
            })
        })
    }

    update (){
        
    }

    insert (){

    }
}


var myDB = Db.getInstance();

console.time("start")
myDB.find('user', {}).then( (data) => {
    // console.log(data)
    console.timeEnd("start")
})

var myDB2 = Db.getInstance();

console.time("start22")
myDB2.find('user', {}).then( (data) => {
    // console.log(data)
    console.timeEnd("start22")
})

var myDB3 = Db.getInstance();

console.time("start333")
myDB3.find('user', {}).then( (data) => {
    // console.log(data)
    console.timeEnd("start333")
})