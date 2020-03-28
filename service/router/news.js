//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const News = require("../models/newsSchema");

router.get('/newsList', function (req, res) {
    let newsList = ''
    if (req.body.title) {
        newsList = News.find({title:req.body.title}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    } else {
        newsList = News.find({}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    }
});
router.post('/addNews', function (req, res) {
    News.create(req.body, function (err, data) {
        if (err) throw err;
        res.send({
            flag: 0,  //添加成功
            des:'文章发布成功'
        })
    })
});

module.exports = router