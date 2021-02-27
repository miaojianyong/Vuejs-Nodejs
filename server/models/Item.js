/* 物品数据模型文件 */
// 引入mongoose
const mongoose = require('mongoose');
// 定义模型
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  icon: {
    type: String, // 在数据库保存图片地址
  }
})
// 导出物品模型
module.exports = mongoose.model('Item', schema);