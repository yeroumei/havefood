//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const User = require("../models/userSchema");
// const Fans = require("../models/fans");


//上传图片，引用封装的方法
const uploadImg = require('./uploadImg'); 

//上传图片必备中间件及文件夹
// const multer = require('multer')
// let path = require("path");
// const upload = multer({ dest: 'uploads/' })
// const upload = multer({dest: __dirname + '../'})

const Jwt = require("jsonwebtoken");

//登录验证
router.post('/login', function (req, res) {
    var postdata = {
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({
        username: postdata.username,
        password: postdata.password
    }, function (err, data) {
            if (err) throw err
            if (data) {
                let token = Jwt.sign(JSON.stringify(data),'This is secrect_key') //返回token
                res.send({data:data,token:token})
                console.log(data,'datdatatdtadt')
            } else {
                res.send({
                    flag: 1,
                    des:'login failed' 
                })
            }
    })
})

//注册验证 （添加用户）
router.post('/register', function (req, res) {
    var postdata = { //限定的话就只插入限定的键值对，若不限制的话可以将提交的键值对都插入到数据库中
        username: req.body.username,
        password: req.body.password,
        number: req.body.number,
        type: req.body.type,
    }
    User.findOne({
        username: postdata.username
    }, function (err, data) {
            if (data) {
                res.send({
                    flag: 1,  //用户名已经被注册
                    des:'该用户名已经被注册'
                })
            } else {
                User.create(postdata, function (err, data) {
                    if (err) throw err;
                    res.send({
                        flag: 0,  //注册成功
                        des:'注册成功'
                    })
                    // console.log(data)
                    // res.redirect('/userList'); //重定向
                })
            }
    })
})
//添加用户
router.post('/addUser', function (req, res) {
    User.findOne({ 
        username: req.body.username  //用户名不重复
    }, function (err, data) {
        if (data) {
            res.send({
                flag: 1,  //用户名已存在
                des:'用户名已存在'
            })
        } else {
            req.body.birth = new Date(req.body.birth).toLocaleDateString() //格式化前端传来的日期字符串
            User.create(req.body, function (err, data) {
                if (err) throw err;
                res.send({
                    flag: 0,  //注册成功
                    des:'用户添加成功'
                })
            })
        }
    })
})

// 查询用户信息路由
router.get('/userOne', function (req, res) {
    if (req.query.username) {
        User.find({username:req.query.username}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    }
})
// 查询用户信息路由
router.get('/userList', function (req, res) {
    let userList = ''
    // console.log(req.query,'req.query.username')
    // if (req.query.username) {
    //     userList = User.find({username:req.query.username}, function (err, data) {
    //         if (err) throw  err;
    //         res.send(data)
    //     });
    // } else {
        userList = User.aggregate([{ $lookup: { from: 'fans', localField: 'username', foreignField: 'parent_id', as: 'myfans' } },
        {$lookup:{from:'fans',localField:'username',foreignField:'fans_id',as:'myloves'}}], function (err, data) {
                if (err) throw err;
                if (req.query.username) {
                    for (let i = 0; i < data.length; i++){
                        if (data[i].username == req.query.username) {
                            res.send(data[i])
                        }
                    }
                } else {
                    res.send(data)
                }
        });
    // }
});
//模糊查询
router.get('/userLikes', function (req, res) {
const keyword = req.query.keyword //从URL中传来的 keyword参数
const _filter={
    $or: [  // 多字段同时匹配
        {username: {$regex: keyword, $options: '$i'}},
        {sex: {$regex: keyword, $options: '$i'}}, //  $options: '$i' 忽略大小写
        {number: {$regex: keyword, $options: '$i'}}
    ]
}
var count = 0
User.countDocuments(_filter, function (err, doc) { // 查询总条数（用于分页）
    if (err) {
    console.log(err)
    } else {
    count = doc
    }
})
User.find(_filter,{
    password : 0 // 返回结果不包含密码字段
}).limit(10) // 最多显示10条
    .sort({'_id': -1}) // 倒序
    .exec(function (err, doc) { // 回调
    if (err) {
        console.log(err)
    } else {
        res.json({code: 0, data: doc, count: count})
    }
})
})

//修改用户信息
router.post('/updateUser', (req, res, next) => {
    User.findOne({ 
        username: req.body.username  //用户名不重复
    }, function (err, data) {
        // console.log(data)
        if (data && data.username !== req.body.oldname) {
            res.send({
                flag: 1,  //用户名已存在
                des:'用户名已存在'
            })
        } else {
            // console.log(data,'ielsedata')
            let filter = { username: req.body.oldname }
            req.body.birth = new Date(req.body.birth).toLocaleDateString() //格式化前端传来的日期字符串
            User.updateOne(filter,{$set:req.body}).then((data) => {
                console.log(data,'datatatatat')
                if (data.nModified === 1)  return res.json({code: 0, msg: '修改成功'}) // 修改成功
                if (data.n === 0) return res.json({code: -1, msg: '用户不存在'}) // 查询条数为0
                res.json({code: -1, msg: '错误，请检查后台代码'})
            })
        }
    })
})

//删除用户信息
router.post('/deleteUser', (req, res, next) => {
    let filter = { _id: req.body._id }
    User.deleteOne(filter).then((data) => {
        console.log(data,'datatatatat')
        if (data.ok === 1) return res.json({code: 0, msg: '修改成功'}) // 修改成功
        if (data.n === 0) return res.json({code: -1, msg: '用户不存在'}) // 查询条数为0
        res.json({code: -1, msg: '错误，请检查后台代码'})
    })
})

module.exports = router