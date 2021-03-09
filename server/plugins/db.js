/* 数据库操作文件 */
module.exports = app => {
  // 导入mongoose
  const mongoose = require('mongoose');
  /* 解决终端中输出的 【 DeprecationWarning: Mongoose: 
  `findOneAndUpdate()` and`findOneAndDelete()`
  without the`useFindAndModify`
  option set to false are deprecated. 】警告 */
  mongoose.set('useFindAndModify', false);
  // 连接数据库
  mongoose.connect('mongodb://vuenode:123456@localhost:27017/vuenode', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));
  
/* 引用所有模型文件 */
  require('require-all')(__dirname + '/../models');
}