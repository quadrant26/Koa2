const fs = require('fs');

exports.getMime = function (extname){
    switch(extname){
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'text/html';
    }
}

exports.getFileMime = function (extname){

    return new Promise ( (reslove, reject) => {
        fs.readFile("./module/mime.json", (err, data) => {
            if( err ){
                console.log(err)
                return;
            }
    
            let mime = JSON.parse(data.toString());
            // console.log(mime[extname]);
            reslove(mime[extname]);
        })
    })
    
}

exports.getFileMimeSync = function (extname){
    var data = fs.readFileSync("./module/mime.json");
    let mime = JSON.parse(data.toString());
    return mime[extname];
}