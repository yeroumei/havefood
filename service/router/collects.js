//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Collects = require("../models/collectSchema");

router.get('/collectsList', function (req, res) {
    let collectslist = ''
    let filter = req.query
    collectslist = Collects.find(filter, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});
//添加
router.post('/addCollects', function (req, res) {
    Collects.findOne(req.body, function (err, data) {
        if (data) {
            res.send({
                flag: 1,  //分类名已存在
                des:'已经收藏'
            })
        } else {
            Collects.create(req.body, function (err, data) {
                if (err) throw err;
                res.send({
                    flag: 0,  
                    des:'添加成功'
                })
            })
        }
    })
})
// 删除
router.post('/deleteCollects', (req, res, next) => {
    Collects.deleteOne(req.body).then((data) => {
        if (data.ok === 1) return res.json({code: 0, msg: '删除成功'}) // 修改成功
        if (data.n === 0) return res.json({code: -1, msg: '用户不存在'}) // 查询条数为0
        res.json({code: -1, msg: '错误，请检查后台代码'})
    })
})

module.exports = router
