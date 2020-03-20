//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const User_log = require("../models/user_logSchema");

//添加用户登录日志
router.post('/addLog', function (req, res) {
    User_log.create(req.body, function (err, data) {
        if (err) throw err;
        res.send({
            flag: 0  //登录日志记录成功
        })
    })
})
//查看日志信息
router.get('/logList', function (req, res) {
    let userList = ''
    if (req.body.username) {
        userList = User_log.find({username:req.body.username}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    } else {
        userList = User_log.find({}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    }
})

//删除单个日志
router.post('/deleteLog', (req, res, next) => {
    let filter = { _id: req.body._id }
    User_log.deleteOne(filter).then((data) => {
        // console.log(data)
        if (data.nModified === 1) return res.json({flag: 0, msg: 'delete successfully'}) // 修改成功
        if (data.n === 0) return res.json({flag: -1, msg: 'Cannott find it'}) // 查询条数为0
        res.json({flag: -1, msg: 'error'})
    })
})
router.post('/deleteManylog', (req, res, next) => {
    let itemCheckLists = req.body
    User_log.deleteMany({_id: {$in: itemCheckLists}}).then((data) => {
        // console.log(data)
        if (data.nModified === 1) return res.json({flag: 0, msg: 'delete successfully'}) // 修改成功
        if (data.n === 0) return res.json({flag: -1, msg: 'Cannott find it'}) // 查询条数为0
        res.json({flag: -1, msg: 'error'})
    })
})

module.exports = router
