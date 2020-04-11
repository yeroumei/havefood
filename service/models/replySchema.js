
//引入mongoose模块
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//定义模型
const replySchema = new Schema({
    pro_id : Schema.Types.ObjectId, 
    from_user : String, 
    avatar : String,
    to_user : String, 
    content : String,
    type : String,
}, { collection: 'replys'})
const Replys = module.exports = mongoose.model('replys',replySchema);
