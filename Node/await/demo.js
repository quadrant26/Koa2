async function test(){
    return "Hello, Nodejs";
}

async function main (){
    var data = await test();
    console.log(data);
}

main();

async function test2 (){
    return new Promise((resolve, reject) => {
        setTimeout(function (){
            var name = "king";
            resolve(name);
        })
    })
}

async function main2(){
    var data = await test2();   // await 必须用在 async 方法里
    console.log(data);
}

main2()