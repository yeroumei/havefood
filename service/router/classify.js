//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Classify = require("../models/classifySchema");

//添加
router.post('/addClassify', function (req, res) {
    Classify.findOne({ 
        name: req.body.name  //分类名不重复
    }, function (err, data) {
        if (data) {
            res.send({
                flag: 1,  //分类名已存在
                des:'分类名已存在'
            })
        } else {
            Classify.create(req.body, function (err, data) {
                if (err) throw err;
                res.send({
                    flag: 0,  
                    des:'类别添加成功'
                })
            })
        }
    })
})
//查看分类
router.get('/classifyList', function (req, res) {
    let classifyList = ''
    if (req.body.title) {
        classifyList = Classify.find({title:req.body.name}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    } else {
        classifyList = Classify.find({}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    }
});
//修改用户信息
router.post('/updateClassify', (req, res, next) => {
    let filter = { _id: req.body._id }
    Classify.update(filter,{$set:req.body}).then((data) => {
        console.log(data)
        if (data.nModified === 1) return res.json({code: 0, msg: '修改成功'}) // 修改成功
        if (data.n === 0) return res.json({code: -1, msg: '分类不存在'}) // 查询条数为0
        res.json({code: -1, msg: '错误，请检查后台代码'})
    })
})
//删除单个
router.post('/deleteClassify', (req, res, next) => {
    let filter = { _id: req.body._id }
    Classify.deleteOne(filter).then((data) => {
        // console.log(data)
        if (data.ok === 1) return res.json({flag: 0, msg: 'delete successfully'}) // 修改成功
        if (data.n === 0) return res.json({flag: -1, msg: 'Cannott find it'}) // 查询条数为0
        res.json({flag: -1, msg: 'error'})
    })
})
//批量删除
router.post('/deleteManyclassify', (req, res, next) => {
    let itemCheckLists = req.body
    Classify.deleteMany({_id: {$in: itemCheckLists}}).then((data) => {
        // console.log(data)
        if (data.ok === 1) return res.json({flag: 0, msg: 'delete successfully'}) // 修改成功
        if (data.n === 0) return res.json({flag: -1, msg: 'Cannott find it'}) // 查询条数为0
        res.json({flag: -1, msg: 'error'})
    })
})

module.exports = router