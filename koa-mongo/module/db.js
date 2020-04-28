// ! DB

var MongoClient = require('mongodb').MongoClient;

var Config = require('./config');

// 封装类库
class Db {

    constructor (){
        // ! 初始化的时候连接数据库
        this.connect();
    }

    connect (){
        // ? 连接数据库
        return new Promise( (resolve, reject) => {
            MongoClient.connect(Config.dbUrl, (err, client) =>{
                if( err ){
                    reject(err);
                }else{
                    var db = client.db(Config.dbname);
                    resolve(db);
                }
            })
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

var myDB = new Db();

console.time("start")
myDB.find('user', {}).then( (data) => {
    console.log(data)
    console.timeEnd("start")
})