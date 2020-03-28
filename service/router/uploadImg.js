//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();

const fs = require('fs');
const path = require('path');
/* formidable用于解析表单数据，特别是文件上传 */
const formidable = require('formidable');
/* 用于时间格式化 */
const formatTime = require('silly-datetime');

/* 图片上传 */

router.post('/upload', (req, res, next) => {
    /* 创建上传表单 */
    let form = new formidable.IncomingForm();
    /* 设置编码格式 */
    form.encoding = 'utf-8';
    /* 设置上传目录(这个目录必须先创建好) */
    form.uploadDir = path.join(__dirname, '../serverImage');
    /* 保留文件后缀名 */
    form.keepExtensions = true;
    /* 格式化form数据 */
    form.parse(req, (err, fields, files) => {
        let file = files.file;
        /* 如果出错，则拦截 */
        if(err) {
            return res.send({'status': 500, msg: '服务器内部错误', result: ''});
        }
        /* 存储后缀名 */
        let extName = '';
        let types = '';
        switch (file.type) {
        case 'image/png':
            types = 'image'
            extName = 'png';
            break;
        case 'image/x-png':
            types = 'image'
            extName = 'png';
            break;
        case 'image/jpg':
            types = 'image'
            extName = 'jpg';
            break;
        case 'image/jpeg':
            types = 'image'
            extName = 'jpg';
            break;
        case 'video/mp4':
            types = 'video'
            extName = 'mp4';
            break;
        }
        /* 拼接新的文件名 */
        let time = formatTime.format(new Date(), 'YYYYMMDDHHmmss');
        let num = Math.floor(Math.random() * 8999 + 10000);
        let imageName = `${time}_${num}.${extName}`;
        let newPath = form.uploadDir + '/' + imageName;
        /* 更改名字和路径 */
        fs.rename(file.path, newPath, (err) => {
            if(err) {
                return res.send({'status': -1, 'msg': '图片上传失败', result: ''});
            } else {
                return res.send({'status': 200, 'msg': '图片上传成功', result: {url: `http://localhost:3000/serverImage/${imageName}`}, type:types});
            }
        })
    })
});

// 删除服务器上没用的图片
router.post('/deleteImg', function (req, res) {
    var url;
    var path;
    url = req.body.url; //前端传过来的图片地址，示例：http://xxxxx.com/public/imgages/xxx.png
    sendUrl = url.indexOf("serverImage");//用到js截取，以public截取点
    path = url.substring(sendUrl, url.length);//取后部分包括public
    fs.unlink(path, (err) => {
        if (err) throw err
        res.json({ msg: "文件已删除" })
    })
});


module.exports = router
  