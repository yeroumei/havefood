//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Fans = require("../models/fansSchema");

router.get('/fansList', function (req, res) {
    let fanslist = ''
    if (req.query.parent_id) {
        fanslist = Fans.find({parent_id:req.query.parent_id}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    } else {
        fanslist = Fans.find({}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    }
});
// 添加
router.post('/addFans', function (req, res) {
    Fans.create(req.body, function (err, data) {
        if (err) throw err;
        res.send({
            flag: 0,  //添加成功
            des:'粉丝添加成功'
        })
    })
});
// 删除
router.post('/deleteFans', (req, res, next) => {
    Fans.deleteOne(req.body).then((data) => {
        if (data.ok === 1) return res.json({code: 0, msg: '删除成功'}) // 修改成功
        if (data.n === 0) return res.json({code: -1, msg: '用户不存在'}) // 查询条数为0
        res.json({code: -1, msg: '错误，请检查后台代码'})
    })
})
module.exports = router
