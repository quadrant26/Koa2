# MongoDB
# 启动服务
Win + R -> cmd ->
mongod
mongod --dbpath dbpath
# 查看数据库和版本号
show dbs
db.version()


## 基本操作

> 添加数据库

    `use dbname;`

> 插入数据

    `db.tablename.insert({"name: "xiaoming"})`
    
> 查看数据库
    
    ``` mongo
        // 我们刚创建的数据库 runoob 并不在数据库的列表中， 要显示它，我们需要向 runoob 数据库插入一些数据
        show dbs;
    ```

> 显示当前的数据集合(mysql 中叫表)

        `show collections`
    
> 删除集合、删除指定的集合 删除表

    ``` mongo
    // 删除集合 db.COLLECTION_NAME.drop()
    db.tablename.drop()
    ```

> 删除数据库，删除当前所在的数据库

    `db.dropDatabase();`

> 查找数据

    >> 查找所有数据

        `db.collection_name.find()`

    >> 查询去掉的当前聚集集合中的某列的重复数据

        ``` mongo
            // 过滤掉name 中的相同数据
            // 类似 select distinct name from collection_name
            db.colleciton_name.distinct("name")
        ```
    >> 查找指定记录 

        `db.collection_name.find({"age":22})`

    >> 查询 大于22 的记录

        `db.collection_name.find({"age": {$gt: 22}})`

    >> 查询 小于22 的记录

        `db.collection_name.find({"age": {$lt: 22}})`

    >> 查询 大于等于22 的记录

        `db.collection_name.find({"age": {$gte: 22}})`

    >> 查询 小于等于22 的记录

        `db.collection_name.find({"age": {$lte: 22}})`

    >> 查询 age >= 23 并且 age <= 26

        `db.collection_name.find({"age": {$gte:23, $lte:26}})`

    >> 查询 name 中包含 mongo 的数据 模糊查询

        ``` mongo
            // select * from collection_name where name link '%mongo%'
            db.collection_name.find({"name": /mongo/})
        ```

    >> 查询 name 中以 mongo 开头的

        ``` mongo
            // select * from collection_name where name link 'mongo%'
            db.collection_name.find({"name": /^mongo/})
        ```

    >> 查询指定列 name age

        ```
            // 数据显示 有age的字段
            db.collection_name.find({}, {age:1})
            // age 小于 20的字段
            db.collection_name.find({age: {$lt: 20}}, {age:1})
            // 数据显示 有 name 和 age 的字段
            db.collection_name.find({}, {name:1, age:1})
        ```

    >> 排序

        ```mongo
            // 升序
            db.collection_name.find().sort({age:1})
            // 降序
            db.collection_name.find().sort({age:-1})
        ```

    >> 查询 name = zhangsan, age = 22

        `db.collection_db.find({"name": "zhangsan", "age": 22})`

    >> 查询前5条

        `db.collection_db.find().limit(5)`
    
    >> 查询 10 条以后的数据

        `db.collection_db.find().skip(10)`

    >> 查询 5-10 之间的数据

        ```
            // 用于分页 
            // limit 是 pageSize
            // skip 是第几页*pageSize
            db.collectin_db.find().limit(10).skip(5)
        ```

    >> or 与 查询

        `db.collection_db.find({$or: [{age: 22}, {age: 25}]})`


    >> 查询数据的条数数

        ` db.collecion_db.find().count() `

    >> 查询第一条数据

        `db.collection_db.findOne()`

> 修改数据

>>  $set
    
    ```
        db.collection_name.update({"name":"zhangsan"}, {$set: {"name":"zhangsan666"}})
    ```
>> 批量修改

    ```
        // 一次修改多条数据
        db.collection_name.update({"age":23}, {$set: {"sex": "female"}}, {$multi: true})
    ```


>> 不出现 $set

    ```
        // 完整替换
        db.collection_name.update({"name":"zhangsan"}, {"name":"zhangsan66", "age": 17})
    ```

>> $inc

    ```
        // update users set age=age+50 where name='zhangsan'
        db.collection_name.update({"name":"zhangsan"}, {$inc: {age: 50}}, false, true)
    ```

> 删除数据

>> 删除数据

    `db.collection_name.remove({age: 123})`

>> justOne  

    `db.collection_name.remove({"boriugh": "Queens"}, {justOne: true})`


> 索引

>> 创建索引

    ``` mongo
        // 设置索引
        db.collection_name.ensureIndex({"username": 1})
    ```

>> 获取当前集合的索引

    `db.collection_name.getIndexes()`

>> 创建索引时指定索引名

    `db.collection_name.ensureIndex({"username":1}, {"name": "userIndex"})`

>> 删除索引

    db.collection_name.dropIndex({"username": 1});

>> 复合索引

    db.collection_name.ensureIndex({"username":"deepin", "age": 18})

>> 唯一索引

    ```
        // unique 
        // 插入重复的文档时， 会报错，提示插入重复键
        db.collection_name.ensureIndex({"userid":1}, {"unique":true})
    ```

>> 查询具体的执行时间

    db.tablename.find().explain("executionStats")

> 权限设置

>> 创建超级管理员

    ```mongo
        use admin
        db.createUser({
            user: 'admin',
            pwd: '123456',
            roles: [{role: 'root', db: 'admin'}]
        })
    ```

>> 修改配置文件

    ```
        // 安装目录 MongoDB\Server\4.x\bin\mongod.cfg
        // 配置
        
        security:
            authorization: enabled
    ```

>> 连接数据库

    ```
    mongo admin -u username -p 密码
    ```

>> 给数据库创建单独的用户，只能访问某个数据库，不能访问其他的

    ```
        user eggcmd;
        db.createUser({
            user: "eggadmin",
            pwd: "123456",
            roles: [{role: "dbOwner", db: "eggcms"}]
        })
    ```

>> 查看当前库下角色

    `show users`

>> 删除用户

    db.dropUser("username")

>> 修改用户密码

    db.updateUser("admin", {pwd: "password"})

>> 密码认证

    db.auth("admin", "password")

>> 数据库角色

    1. 数据库用户角色： read, readWrite
    2. 数据库管理角色： dbAdmin, dbOwner, userAdmin
    3. 集群管理角色： clusterAdmin, clusterManager, clusterMonitor, hostManager
    4. 备份恢复角色： backup, restore
    5. 所有数据库角色： readAnyDatabase, readWriteAnyDatabase, userAdminAnyDatabase, dbAdminAnyDatabase
    6. 超级用户角色： root

> 聚合管道

>> 创建和使用 -> 关联查询 

    db.collection_name.aggregate([<stage>, ...])

>> 实例

    ```
        db.collection_name.aggregate([
            { $match: { status: 'A' } }, 
            { $group: { _id: "$cust_id, total: { $sum: "$amout } } }
        ])
    ```
>> 操作符

    $project    增加，删除，重命名字段

        ```
            db.order.find({}, {"order_id": 1, "all_price": 1})

            db.order.aggregate([
                {$project: {order_id: 1, trade_no: 1, all_price:1}}
            ])
        ```

    $match      条件匹配，只满足条件的文档才能进入下一阶段

        ```
            db.order.aggregate([
                {$project: {order_id: 1, trade_no: 1, all_price:1}},
                {$match: {"all_price": {$gte: 90}}}
            ])
        ```

    $limit      限制结果的数量

        ```
            db.order.aggregate([
                {$project: {trade_no: 1, all_price: 1}},
                {$match: {"all_price": {$gte: 90}}},
                {$sort: {"all_price": -1}},
                {$limit: 1}
            ])
        ```

    $skip       跳过文档的数量

    $sort       条件排序

        ```
            db.order.aggregate([
                {$project: {trade_no: 1, all_price: 1}},
                {$match: {"all_price": {$gte: 90}}},
                {$sort: {"all_price": -1}}
            ])
        ```

    $group      条件组合

        ```
            db.order_item.aggregate([
                {$group: {_id: "$order_id", total: {$sum: "$num"}}}
            ])
            db.order_item.aggregate([
                {$group: {_id: "$order_id", total: {$sum: "$price"}}}
            ])
        ```

    $lookup     $lookup 操作符可以引入其他集合的数据

        ```
            db.order.aggregate([
                { 
                    $lookup: {
                        from: "order_item",
                        localField: "order_id",
                        foreignField: "order_id",
                        as: "items"
                    }
                }
            ])
        ```


>> 表达式

    $addToSet           指定的字段去重
    $max                求最大值
    $min                求最小值
    $sum                求和
    $avg                求平均值
    $gt                 大于给定值
    $lt                 小于给定值
























# one

1. Mongo基本命令

    a. 常用的赋值和输出命令

        var x='Hello World'
        print(x)

    b. 定义函数

        function kang(){
            return 'king';
        }
        print(kang())

    show dbs :显示已有数据库，如果你刚安装好，会默认有local、admin(config)，这是MongoDB的默认数据库，我们在新建库时是不允许起这些名称的。

    use admin： 进入数据，也可以理解成为使用数据库。成功会显示：switched to db admin。

    show collections: 显示数据库中的集合（关系型中叫表，我们要逐渐熟悉）。

    db:显示当前位置，也就是你当前使用的数据库名称，这个命令算是最常用的，因为你在作任何操作的时候都要先查看一下自己所在的库，以免造成操作错误。

2. 数据操作基础命令：

    use db（建立数据库）：use不仅可以进入一个数据库，如果你敲入的库不存在，它还可以帮你建立一个库。但是在没有集合前，它还是默认为空。

    db.集合.insert( ):新建数据集合和插入文件（数据），当集合没有时，这时候就可以新建一个集合，并向里边插入数据。

        Demo：db.user.insert({“name”:kang})

    db.集合.find( ):查询所有数据，这条命令会列出集合下的所有数据，可以看到MongoDB是自动给我们加入了索引值的。
        
        Demo：db.user.find()

    db.集合.findOne( ):查询第一个文件数据，这里需要注意的，所有MongoDB的组合单词都使用首字母小写的驼峰式写法。

    db.集合.update({查询},{修改}):修改文件数据，第一个是查询条件，第二个是要修改成的值。这里注意的是可以多加文件数据项的，比如下面的例子。

        db.kang.update({"name":"kang"},{"name":"kang","age":"32"})

    db.集合.remove(条件)：删除文件数据，注意的是要跟一个条件。Demo:db.user.remove({“name”:kang})

    db.集合.drop( ):删除整个集合，这个在实际工作中一定要谨慎使用，如果是程序，一定要二次确认。

    db.dropDatabase( ):删除整个数据库，在删除库时，一定要先进入数据库，然后再删除。实际工作中这个基本不用，实际工作可定需要保留数据和痕迹的。

3. 用js文件写mongo命令

    js

        var userName="kang";    //声明一个登录名             
        var timeStamp=Date.parse(new Date());     //声明登录时的时间戳  
        var jsonDdatabase={"loginUnser":userName,"loginTime":timeStamp}; //组成JSON字符串
        var db = connect('log');   //链接数据库
        db.login.insert(jsonDdatabase);  //插入数据
        
        print('[demo]log  print success');  //没有错误显示成功

    执行

        mongo filename.js

4. 批量插入的正确方法

    db.test.insert([
        {"_id":1},
        {"_id":2},
        {"_id":3}
    ])

    version 3.2 版本
    db.test.batchInsert([
        {"_id":1},
        {"_id":2},
        {"_id":3}
    ])

5. 修改：Update常见错误

    a. 错误1：只update修改项

        var db=connect('company')
 
        var workmate3={
            name:'MinJie',
            age:20,
            sex:0,
            job:'UI设计',
            skill:{
                skillOne:'PhotoShop',
                SkillTwo:'UI',
                SkillThree:'Word+Excel+PPT'
            },
            regeditTime:new Date()
        }
        db.workmate.update({name:'MinJie'},workmate3)
        
        
        print('[update]: The data was updated successfully');

        //执行命令如下:
        db.workmate.drop()
        load('./demo02.js')
        load('./demo03.js')

6. 修改：初识update修改器

    a. $set修改器

        dbd .workmate.update({"name":"MinJie"},{"$set":{sex:2,age:21}})

    b. 修改嵌套内容

        db.workmate.update({"name":"MinJie"},{"$set":{"skill.skillThree":'word'}})
    
    c. $unset用于将key删除

        db.workmate.update({"name":"MinJie"},{$unset:{"age":''}})
    
    d. $inc对数字进行计算

        db.workmate.update({"name":"MinJie"},{$inc:{"age":-2}})

    f. multi选项

        db.workmate.update({},{$set:{interset:[]}})
        db.workmate.update({},{$set:{interset:[]}},{multi:true})

    g. upsert选项

        db.workmate.update({name:'xiaoWang'},{$set:{age:20}},{upsert:true})
        upsert也有两个值：true代表没有就添加，false代表没有不添加(默认值)。

7. 修改：update数组修改器

    a. $push追加数组/内嵌文档值

        $push的功能是追加数组中的值，但我们也经常用它操作内嵌稳文档，就是{}对象型的值。先看一个追加数组值的方式，比如我们要给小王加上一个爱好(interset)为画画（draw）：

        db.workmate.update({name:'xiaoWang'},{$push:{interest:'draw'}})
        
        当然$push修饰符还可以为内嵌文档增加值，比如我们现在要给我们的UI，增加一项新的技能skillFour为draw，这时候我们可以操作为：

        db.workmate.update({name:'MinJie'},{$push:{"skill.skillFour":'draw'}})

    b. $ne查找是否存在

        它主要的作用是，检查一个值是否存在，如果不存在再执行操作，存在就不执行

        db.workmate.update({name:'xiaoWang',"interest":{$ne:'playGame'}},{$push:{interest:'Game'}})
        总结：没有则修改，有则不修改。

    c. $addToSet 升级版的$ne

        它是$ne的升级版本（查找是否存在，不存在就push上去），操作起来更直观和方便，所以再工作中这个要比$ne用的多。

        例子：我们现在要查看小王(xiaoWang)兴趣(interest)中有没有阅读（readBook）这项，没有则加入读书(readBook)的兴趣.
        db.workmate.update({name:"xiaoWang"},{$addToSet:{interest:"readBook"}})

    d. $each 批量追加

        它可以传入一个数组，一次增加多个值进去，相当于批量操作，性能同样比循环操作要好很多，这个是需要我们注意的，工作中也要先组合成数组，然后用批量的形式进行操作。

        例子：我们现在要给xiaoWang,一次加入三个爱好，唱歌（Sing），跳舞（Dance），编码（Code）。

        var newInterset=["Sing","Dance","Code"];
        db.workmate.update({name:"xiaoWang"},{$addToSet:{interest:{$each:newInterset}}})
    
    f. $pop 删除数组值

        $pop只删除一次，并不是删除所有数组中的值。而且它有两个选项，一个是1和-1。

        1：从数组末端进行删除
        -1：从数组开端进行删除

        例子：现在要删除xiaoWang的编码爱好（code）。
        db.workmate.update({name:'xiaoWang'},{$pop:{interest:1}})

    g. 数组定位修改

        有时候只知道修改数组的第几位，但并不知道是什么，这时候我们可以使用interest.int 的形式。

        例子，比如我们现在要修改xiaoWang的第三个兴趣为编码（Code），注意这里的计数是从0开始的。
        db.workmate.update({name:'xiaoWang'},{$set:{"interest.2":"Code"}})

8. 修改：状态返回与安全

    a. db.runCommand( ):

        它是数据库运行命令的执行器，执行命令首选就要使用它，因为它在Shell和驱动程序间提供了一致的接口
        db.workmate.update({sex:1},{$set:{money:1000}},false,true)
        var resultMessage=db.runCommand({getLastError:1})
        printjson(resultMessage);

        false：第一句末尾的false是upsert的简写，代表没有此条数据时不增加;
        true：true是multi的简写，代表修改所有，这两个我们在前边课程已经学过。
        getLastError:1 :表示返回功能错误，这里的参数很多，如果有兴趣请自行查找学习，这里不作过多介绍。
        printjson：表示以json对象的格式输出到控制台。

        查看是否和数据库链接成功了
        db.runCommand({ping:1})
        返回ok：1就代表链接正常。

    b. findAndModify

        var myModify={
            findAndModify:"workmate",
            query:{name:'king'},
            update:{$set:{age:18}},
            new:true    //更新完成，需要查看结果，如果为false不进行查看结果
        }
        var ResultMessage=db.runCommand(myModify);
        
        printjson(ResultMessage)
        findAndModify的性能是没有直接使用db.collections.update的性能好，但是在实际工作中都是使用它，毕竟要商用的程序安全性还是比较重要的。

        findAndModify属性值：

            query：需要查询的条件/文档
            sort: 进行排序
            remove：[boolean]是否删除查找到的文档，值填写true，可以删除。
            new:[boolean]返回更新前的文档还是更新后的文档。
            fields：需要返回的字段
            upsert：没有这个值是否增加。

9. 查询：find的不等修饰符

    a. 简单查找

        db.workmate.find({"skill.skillOne":"HTML+CSS"})

    b. 筛选字段

        db.workmate.find(
            {"skill.skillOne":"HTML+CSS"},
            {name:true,"skill.skillOne":true}
        )
        不要id
        db.workmate.find(
            {"skill.skillOne":"HTML+CSS"},
            {name:true,"skill.skillOne":true,_id:false}
        )

        不等修饰符

            小于($lt):英文全称less-than
            小于等于($lte)：英文全称less-than-equal
            大于($gt):英文全称greater-than
            大于等于($gte):英文全称greater-than-equal
            不等于($ne):英文全称not-equal 我们现在要查找一下，公司内年龄小于30大于25岁的人员。看下面的代码。

    c. 日期查找

        var startDate= new Date('01/01/2018');
        db.workmate.find(
            {regeditTime:{$gt:startDate}},
            {name:true,age:true,"skill.skillOne":true,_id:false}
        )

10. find的多条件查询

    a. $in修饰符

        in修饰符可以轻松解决一键多值的查询情况。就如上面我们讲的例子，现在要查询同事中年龄是25岁和33岁的信息。

        db.workmate.find({age:{$in:[25,33]}},
            {name:1,"skill.skillOne":1,age:1,_id:0}
        )
        于$in相对的修饰符是$nin，就是查询除了$in条件以为的指，小伙伴们可以自己进行练习一下，这里我就不作过多的演示了。

    b. $or修饰符

        它用来查询多个键值的情况，就比如查询同事中大于30岁或者会做PHP的信息。主要区别是两个Key值。$in修饰符是一个Key值，这个需要去比较记忆。

        db.workmate.find({$or:[
            {age:{$gte:30}},
            {"skill.skillThree":'PHP'}
        ]},
            {name:1,"skill.skillThree":1,age:1,_id:0}
        )
        or很好理解，就是或者的意思，我们查出来的结果也是一样的，查出了年龄大于30岁的，或者会做PHP的信息。相对应的还有$nor修饰符，这里不作演示了，自己试验一下。

    c. $and修饰符

        $and用来查找几个key值都满足的情况，比如要查询同事中大于30岁并且会做PHP的信息，这时需要注意的是这两项必须全部满足。当然写法还是比较简单的。只要把上面代码中的or换成and就可以了。

        db.workmate.find({$and:[
            {age:{$gte:30}},
            {"skill.skillThree":'PHP'}
        ]},
            {name:1,"skill.skillThree":1,age:1,_id:0}
        )

    d. $not修饰符

        它用来查询除条件之外的值，比如我们现在要查找除年龄大于20岁，小于30岁的人员信息。需要注意的是$not修饰符不能应用在条件语句中，只能在外边进行查询使用。

        db.workmate.find({
            age:{
                $not:{
                    $lte:30,
                    $gte:20
                }
            }
        },
        {name:1,"skill.skillOne":1,age:1,_id:0}
        )

11. find的数组查询

    a. 基本数组查询

        db.workmate.find({interest:['画画','聚会','看电影']},
            {name:1,interest:1,age:1,_id:0} 
        )

    b. $all-数组多项查询

        db.workmate.find(
            {interest:{$all:["看电影","看书"]}},
            {name:1,interest:1,age:1,_id:0} 
        )

    c. $in-数组的或者查询

        db.workmate.find(
            {interest:{$in:["看电影","看书"]}},
            {name:1,interest:1,age:1,_id:0} 
        )

    d. $size-数组个数查询

        db.workmate.find(
            {interest:{$size:5}},
            {name:1,interest:1,age:1,_id:0} 
        )

    f. $slice-显示选项

        db.workmate.find(
            {},
            {name:1,interest:{$slice:2},age:1,_id:0} 
        )

12. find的参数使用方法

    query：这个就是查询条件，MongoDB默认的第一个参数。
    fields：（返回内容）查询出来后显示的结果样式，可以用true和false控制是否显示。
    limit：返回的数量，后边跟数字，控制每次查询返回的结果数量。
    skip:跳过多少个显示，和limit结合可以实现分页。
    sort：排序方式，从小到大排序使用1，从大到小排序使用-1。

    分页Demo

        dbd .workmate.find({},{name:true,age:true,_id:false}).limit(0).skip(2).sort({age:1});
    
    $where修饰符

        db.workmate.find(
            {$where:"this.age>30"},
            {name:true,age:true,_id:false}
        )

13. find如何在js文本中使用

    a. hasNext循环结果

        var db = connect("company")  //进行链接对应的集合collections
        var result = db.workmate.find() //声明变量result，并把查询结果赋值给result
        //利用游标的hasNext()进行循环输出结果。
        while(result.hasNext()){
            printjson(result.next())  //用json格式打印结果
        }

    b. forEach循环

        var db = connect("company")  //进行链接对应的集合collections
        var result = db.workmate.find() //声明变量result，并把查询结果赋值给result
        //利用游标的hasNext()进行循环输出结果。
        result.forEach(function(result){
            printjson(result)
        })

14. 索引

    查看数据中的数据条数
    db.randomInfo.stats()

    a. 建立索引

        db.randomInfo.ensureIndex({username:1})
    
    b. 查看现有索引

        db.randomInfo.getIndexes()

    数据不超万条时，不需要使用索引。性能的提升并不明显，而大大增加了内存和硬盘的消耗。
    查询数据超过表数据量30%时，不要使用索引字段查询。实际证明会比不使用索引更慢，因为它大量检索了索引表和我们原表。
    数字索引，要比字符串索引快的多，在百万级甚至千万级数据量面前，使用数字索引是个明确的选择。
    把你经常查询的数据做成一个内嵌数据（对象型的数据），然后集体进行索引。

    c. 指定索引查询（hint）

        var  rs= db.randomInfo.find({username:'7xwb8y3',randNum0:565509}).hint({randNum0:1});

    d. 删除索引

        db.randomInfo.dropIndex('randNum0_1');//索引的唯一ID
    
    f. 全文索引

        db.info.ensureIndex({contextInfo:'text'})

    g. 全文索引查找 

        $text:表示要在全文索引中查东西。
        $search:后边跟查找的内容。
        db.info.find({$text:{$search:"programmer"}})

        查找多个词 
        db.info.find({$text:{$search:"programmer family diary drink"}})
        希望不查找出来有drink这个单词的记录 可以使用“-”减号来取消
        dbd .info.find({$text:{$search:"programmer family diary -drink"}})

    h. 转义符

        db.info.find({$text:{$search:"\"love PlayGame\" drink"}})

15. 用户的创建、删除与修改

    a. 创建用户

        db.createUser({
            user:"king",
            pwd:"123456",
            customData:{
                name:'kang',
                email:'web0432@126.com',
                age:18,
            },
            roles:[
                {
                    role:"readWrite",
                    db:"company"
                },
                'read'
            ]
        })

        内置角色：

        数据库用户角色：read、readWrite；
        数据库管理角色：dbAdmin、dbOwner、userAdmin;
        集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManage；
        备份恢复角色：backup、restore；
        所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
        超级用户角色：root
        内部角色：__system

    b. 查找用户信息

        dbd .system.users.find()

    c. 删除用户

        db.system.users.remove({user:"king"})

    d. 建权

        db.auth("king","123456")
        如果正确返回1，如果错误返回0。（Error：Authentication failed。）

    f. 启动建权

        重启MongoDB服务器，然后设置必须使用建权登录
        mongod --auth
        mongod --auth --dbpath dbpath

    g. 登录

        mongo  -u king -p 123456 127.0.0.1:27017/admin

16. 管理：备份和还原

    a. 数据备份

        mongodump
            --host 127.0.0.1
            --port 27017
            --out D:/databack/backup
            --collection myCollections
            --db test
            --username username
            --password password

        mongodump --host 127.0.0.1 --port 27017 --out D:/databack/

    b. 数据恢复

        mongorestore
            --host 127.0.0.1
            --port 27017
            --username username
            --password password
            <path to the backup>

        删除
        db.randomInfo.drop()
        mongorestore --host 127.0.0.1 --port 27017 D:/databack/