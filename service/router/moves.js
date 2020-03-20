//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Moves = require("../models/moveSchema");

router.get('/moveList', function (req, res) {
    let movelist = ''
    if (req.body._id) {
        movelist = Moves.find({title:req.body._id}, function (err, data) {
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

module.exports = router