var obj = {
    get: function (){
        console.log("from server get data");
    },
    post: function (){
        console.log("submit data")
    }
}

// exports.obj = obj;
module.exports = obj;