//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Moves = require("../models/moveSchema");

router.get('/moveList', function (req, res) {
    let movelist = ''
    if (req.body.id) {
        movelist = Moves.find({title:req.body.id}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    } else {
        movelist = Moves.find({}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    }
});
router.post('/addMoves', function (req, res) {
    Moves.create(req.body, function (err, data) {
        if (err) throw err;
        res.send({
            flag: 0,  //添加成功
            des:'动态分享成功'
        })
    })
});
// 删除
router.post('/deleteMoves', (req, res, next) => {
    let filter = { id: req.body.id }
    Moves.deleteOne(filter).then((data) => {
        if (data.ok === 1) return res.json({code: 0, msg: '修改成功'}) // 修改成功
        if (data.n === 0) return res.json({code: -1, msg: '用户不存在'}) // 查询条数为0
        res.json({code: -1, msg: '错误，请检查后台代码'})
    })
})
module.exports = router