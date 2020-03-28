//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Recipe = require("../models/recipeSchema");

// 查看食谱信息
router.get('/recipeList', function (req, res) {
    let recipeList = ''
    if (req.query.title) {
        recipeList = Recipe.find({title:req.query.title}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    } else {
        recipeList = Recipe.find({}, function (err, data) {
            if (err) throw  err;
            res.send(data)
        });
    }
});

// 添加食谱
//添加用户
router.post('/addRecipe', function (req, res) {
    Recipe.create(req.body, function (err, data) {
        if (err) throw err;
        res.send({
            flag: 0,  //注册成功
            des:'食谱添加成功'
        })
    })
})

//删除食谱信息
router.post('/deleteRecipe', (req, res, next) => {
    let filter = { _id: req.body._id }
    Recipe.deleteOne(filter).then((data) => {
        if (data.ok === 1) return res.json({code: 0, msg: '修改成功'}) // 修改成功
        if (data.n === 0) return res.json({code: -1, msg: '用户不存在'}) // 查询条数为0
        res.json({code: -1, msg: '错误，请检查后台代码'})
    })
})

// 更新食谱信息
router.post('/updateRecipe', (req, res, next) => {
    // console.log(data,'ielsedata')
    let filter = { _id: req.body._id }
    // req.body.birth = new Date(req.body.birth).toLocaleDateString() //格式化前端传来的日期字符串
    Recipe.updateOne(filter,{$set:req.body}).then((data) => {
        console.log(data,'updateOne')
        if (data.nModified === 1)  return res.json({code: 0, msg: '修改成功'}) // 修改成功
        if (data.n === 0) return res.json({code: -1, msg: '用户不存在'}) // 查询条数为0
        res.json({code: -1, msg: '错误，请检查后台代码'})
    })
})

module.exports = router