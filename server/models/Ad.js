/* 广告数据模型文件 */
// 引入mongoose
const mongoose = require('mongoose');
// 定义模型
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  items: [{ // 多个广告
    image: { type: String }, // 广告图片地址
    url: { type: String }, // 点击广告图片后的跳转地址
  }]
})
// 导出物品模型
module.exports = mongoose.model('Ad', schema);