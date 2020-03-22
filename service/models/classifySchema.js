//引入mongoose模块
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//定义粉丝模型
const classifySchema = new Schema({
    name : String, 
    icon: String,
    kinds : Array, 
}, { collection: 'classify'})
const Classify = module.exports = mongoose.model('classify',classifySchema);
