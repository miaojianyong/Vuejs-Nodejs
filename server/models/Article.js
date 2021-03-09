/* 文章数据模型文件 */
// 引入mongoose
const mongoose = require('mongoose');
// 定义模型
const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  categories: [{ // 分类 即一个标题可能所属多个分类
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category' // 关联分类模型
  }],
  body: { tpye: String }, // 文章详情
}, { // 让文章分类自动带创建时间 和 更新时间
  timestamps: true
})
// 导出物品模型
module.exports = mongoose.model('Article', schema);