//user.js文件

//引入mongoose模块
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//定义数据模型，可以看到，我们下面创建了一个表，表中的数据有name、age、sex等字段，并且这些字段的数据类型也定义了，最后将model导出即可
const user_logSchema = new Schema({
    username : { type: String, required: true}, 
    password: String, 
    power: String,
    intime: String,
    outtime:String,
    status: { type: Number, required: true}
}, { collection: 'user_log'})
//这里mongoose.Schema最好要写上第二个参数，明确指定到数据库中的哪个表取数据，我这里写了myhreo，目的就是为了以后操作数据要去myhreo表中。
//这里不写第二个参数的话，后面你会遇到坑。

//导出model模块
const User_log = module.exports = mongoose.model('user_log',user_logSchema);