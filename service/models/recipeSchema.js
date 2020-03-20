//引入mongoose模块
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//定义数据模型，可以看到，我们下面创建了一个表，表中的数据有name、age、sex等字段，并且这些字段的数据类型也定义了，最后将model导出即可
const recipeSchema = new Schema({
    title : String, 
    cover_pic : String, 
    author : String, 
    avatar : String, 
    des : String, 
    menu : Array, 
    step : Array, 
    time : Date, 
    comments : Number, 
    loves : Number, 
    visits : Number, 
    likes : Number, 
    status : String, 
    type : Array, 
    style : String //图文或视频
}, { collection: 'recipe'})
//这里mongoose.Schema最好要写上第二个参数，明确指定到数据库中的哪个表取数据，我这里写了myhreo，目的就是为了以后操作数据要去myhreo表中。
//这里不写第二个参数的话，后面你会遇到坑。

//导出model模块
const Recipe = module.exports = mongoose.model('recipe',recipeSchema);