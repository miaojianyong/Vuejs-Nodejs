/* 分类数据模型文件 */
// 引入mongoose
const mongoose = require('mongoose');
// 定义模型
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  parent: { // 分类的parent字段
    type: mongoose.SchemaTypes.ObjectId, // MongoDB数据库的id
    ref: 'Category' // 关联的模型
  }
})
// 导出分类模型
module.exports = mongoose.model('Category', schema);