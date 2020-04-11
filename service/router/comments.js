//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Comments = require("../models/commentsSchema");

//添加
router.post('/addComments', function (req, res) {
    let comlist = ''
    Comments.create(req.body, function (err, data) {
        if (err) throw err;
        comlist = Comments.findOne(req.body, function (err, data) {
            if (data) {
                res.send({
                    flag: 0,  
                    des:'添加成功',
                    list: data
                })
            }
        })
    })
})

// 查询
router.get('/commentsList', function (req, res) {
    let commentslist = ''
    let filter = req.query
    commentslist = Comments.find(filter, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});

// 删除
router.post('/deleteComments', (req, res, next) => {
    console.log(req.body,'条件')
    Comments.deleteOne(req.body).then((data) => {
        if (data.ok === 1) return res.json({code: 0, msg: '删除成功'}) // 修改成功
        if (data.n === 0) return res.json({code: -1, msg: '用户不存在'}) // 查询条数为0
        res.json({code: -1, msg: '错误，请检查后台代码'})
    })
})
module.exports = router
