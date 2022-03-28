const client = require('../models/db')
const db = client.db('member-system')
const members = db.collection('member')
const messageboard = db.collection('messageboard')

exports.homepage = (req,res) => {
    res.render('index.ejs')
}

exports.errorpage = (req,res) => {
    const msg = req.query.msg
    res.render('error.ejs', {msg:msg})
}

exports.create = async (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //檢查資料庫中的資料
    const collection = db.collection("member");
    let result = await collection.findOne({
        email: email
    });
    if (result !== null) {
        res.redirect('/error?msg=註冊失敗，信箱重複')
        return;
    }
    result = await collection.insertOne({
        name: name, email: email, password: password
    })
    res.redirect('/')
}

exports.login = async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const collection = db.collection('member')
    let result = await collection.findOne({
        $and: [
            {email: email},
            {password: password}
        ]
    });
    if (result === null){
        res.redirect('/error?msg=登入失敗，郵件或密碼輸入錯誤');
        return;
    }
    //登入成功，紀錄會員資訊在session中
    req.session.member = result;
    res.redirect('/member')
}


exports.member = async (req,res) => {
    if(!req.session.member){
        res.redirect("/");
        return;
    }
    //從session 取得登入會員的名稱
    const name=req.session.member.name;
    //取得所有留言
    const collection=db.collection("messageboard");
    let result=await collection.find({}).sort({
        _id:-1
    });
    let data=[];
    await result.forEach(function(message){
        data.push(message);
    });
    
    res.render("member.ejs", {name:name, data:data}); 
}


exports.logout = (req,res) => {
    req.session.member.null;
    res.redirect('/')
}

exports.add = async (req,res) => {
    const message = req.body.message;
    const collection = db.collection('messageboard')
    const name = req.session.member.name;
    let result = await collection.insertOne({
        name: name, message: message
    })
    res.redirect('/member')
}