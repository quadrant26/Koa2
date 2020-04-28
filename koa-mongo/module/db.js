// ! DB
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
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
                        resolve(_that.dbclident);
                    }
                })
            }else{
                resolve(_that.dbclient);
            }
        }).catch((error) => {
            console.error(error);
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
        }).catch((error) => {
            console.error(error);
        })
    }

    update (collectionName, json1, json2){
        return new Promise ( (resolve, rejcet) => {
            this.connect().then( db => {
                db.collection(collectionName).updateOne(json1, {
                    $set: json2
                }, (err, result) => {
                    if( err ){
                        reject(err)
                    }
                    resolve(result);
                })
            })
        }).catch((error) => {
            console.error(error);
        })
    }

    insert(collectionName, json){
        return new Promise ( (resolve, reject) => {
            this.connect().then( db => {
                db.collection(collectionName).insert(json, (err, result) => {
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                })
            })
        }).catch((error) => {
            console.error(error);
        })
    }


    remove(collectionName, json){
        return new Promise( (resolve, reject) => {
            this.connect().then( db => {
                db.collection(collectionName).removeOne( json, ( err, result) => {
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                })
            })
        }).catch((error) => {
            console.error(error);
        })
    }

    getObjectId(id) { /** mongodb 把字符串转换为 对象 */
        return new ObjectId(id);
    }
}

module.exports = Db.getInstance();