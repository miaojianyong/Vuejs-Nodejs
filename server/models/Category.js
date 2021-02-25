/* 分类数据模型文件 */
// 引入mongoose
const mongoose = require('mongoose');
// 定义模型
const schema = new mongoose.Schema({
  name: {
    type: String
  }
})
// 导出分类模型
module.exports = mongoose.model('Category', schema);