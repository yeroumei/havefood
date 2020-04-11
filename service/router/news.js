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
        newsList =  News.aggregate([{ $lookup: { from: 'collects', localField: '_id', foreignField: 'favorite', as: 'collects' } }],
         function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    }
});
//只查已发布的
router.get('/newsSend', function (req, res) {
    let newsList = ''
    let filter = req.query
    newsList = News.find(filter, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});
//模糊查询
router.get('/newsLikes', function (req, res) {
    const keyword = req.query.keyword //从URL中传来的 keyword参数
    const _filter={
        $or: [  // 多字段同时匹配
            {title: {$regex: keyword, $options: '$i'}},
            {author: {$regex: keyword, $options: '$i'}}, //  $options: '$i' 忽略大小写
            {media: {$regex: keyword, $options: '$i'}},
        ],
        $and:[
            {status:0}
        ]
    }
    var count = 0
    News.countDocuments(_filter, function (err, doc) { // 查询总条数（用于分页）
        if (err) {
        console.log(err)
        } else {
        count = doc
        }
    })
    News.find(_filter).limit(10) // 最多显示10条
        .sort({'_id': -1}) // 倒序
        .exec(function (err, doc) { // 回调
        if (err) {
            console.log(err)
        } else {
            res.json({code: 0, data: doc, count: count})
        }
    })
})
router.post('/addNews', function (req, res) {
    News.findOne({ 
        id: req.body.id  //用户名不重复
    }, function (err, data) {
        if (data) {
            res.send({
                flag: 1,  //用户名已存在
                des:'已存在'
            })
        } else {
            News.create(req.body, function (err, data) {
                if (err) throw err;
                res.send({
                    flag: 0,  //添加成功
                    des:'文章发布成功'
                })
            })
        }
    })
});
// 更新信息
router.post('/sureNews', (req, res, next) => {
    let filter = { _id: req.body._id }
    // req.body.birth = new Date(req.body.birth).toLocaleDateString() //格式化前端传来的日期字符串
    News.updateOne(filter,{$set:req.body}).then((data) => {
        console.log(data,'updateOne')
        if (data.nModified === 1)  return res.json({code: 0, msg: '修改成功'}) // 修改成功
        if (data.n === 0) return res.json({code: -1, msg: '用户不存在'}) // 查询条数为0
        res.json({code: -1, msg: '错误，请检查后台代码'})
    })
})
// 删除
router.post('/deleteNews', (req, res, next) => {
    let filter = { _id: req.body._id }
    News.deleteOne(filter).then((data) => {
        if (data.ok === 1) return res.json({code: 0, msg: '删除成功'}) // 修改成功
        if (data.n === 0) return res.json({code: -1, msg: '用户不存在'}) // 查询条数为0
        res.json({code: -1, msg: '错误，请检查后台代码'})
    })
})
// 点赞
router.post('/loveNews', (req, res, next) => {
    let filter = { _id: req.body._id }
    News.updateOne(filter,{$set:req.body}).then((data) => {
        console.log(data,'updateOne')
        if (data.nModified === 1)  {
            let newslist = News.find(filter, function (err, data) {
            if (err) throw  err;
            console.log(data,'dataloves')
            return  res.json(data)
        });
        }
        if (data.n === 0) return res.json({code: -1, msg: '用户不存在'}) // 查询条数为0
    })
})

module.exports = router