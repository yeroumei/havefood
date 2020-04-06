//1.引入express模块
const express = require('express')
//2.创建app对象
const app = express()

var mongoose = require('mongoose');            
mongoose.connect('mongodb://localhost/havefood')     //连接本地数据库blog 
var db = mongoose.connection;
db.on('open', ()=>{ // 连接成功
    console.log('MongoDB Connection Successed');
});
db.on('error', ()=>{ // 连接失败
    console.log('MongoDB Connection Error');
});

//引入body-parser来解释post请求
const bodyParser = require('body-parser')
app.use(bodyParser.json())
// 解决上传图片太大报错问题
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser.urlencoded({ extended: false }))
const user = require('./router/user')
const user_log = require('./router/user_log')
const uploadImg = require('./router/uploadImg')
const recipe = require('./router/recipe')
const classify = require('./router/classify')
const moves = require('./router/moves')
const news = require('./router/news')
app.use('/api',user)
app.use('/api',user_log)
app.use('/api',uploadImg)
app.use('/api',recipe)
app.use('/api',classify)
app.use('/api',moves)
app.use('/api',news)

/* 设置静态资源目录 */
const path = require('path');
app.use('/serverImage', express.static(path.join(__dirname, 'serverImage')));

//定义服务启动端口
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})