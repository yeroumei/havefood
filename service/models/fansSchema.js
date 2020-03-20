
//引入mongoose模块
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//定义粉丝模型
const fansSchema = new Schema({
    parent_id : String, 
    fans_id : String, 
}, { collection: 'fans'})
const Fans = module.exports = mongoose.model('fans',fansSchema);
