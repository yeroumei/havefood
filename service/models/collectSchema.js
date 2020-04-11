//引入mongoose模块
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//定义模型
const collecstSchema = new Schema({
    user : String, 
    type: String,
    favorite : Schema.Types.ObjectId, 
}, { collection: 'collects'})
const Collects = module.exports = mongoose.model('collects',collecstSchema);
