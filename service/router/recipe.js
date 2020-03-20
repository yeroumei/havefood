//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Recipe = require("../models/recipeSchema");

router.get('/recipeList', function (req, res) {
    let recipeList = ''
    if (req.body.title) {
        recipeList = Recipe.find({title:req.body.title}, function (err, data) {
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

module.exports = router