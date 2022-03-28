const mongo = require('mongodb')
const url = "mongodb+srv://root:root123@mycluster.ybhvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new mongo.MongoClient(url)
client.connect(async function(err){
    if(err){
        console.log('資料庫連線失敗')
        return;
    }
    db = client.db('member-system')
    console.log('資料庫連線成功')
})

module.exports = client