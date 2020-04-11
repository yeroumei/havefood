
//引入mongoose模块
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//定义粉丝模型
const commentsSchema = new Schema({
    from_user : String, 
    avatar : String,
    to_user : String, 
    pro_id : Schema.Types.ObjectId, 
    content : String,
    time : String
}, { collection: 'comments'})
const Fans = module.exports = mongoose.model('comments',commentsSchema);
