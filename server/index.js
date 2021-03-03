/* 服务器端 */
const express = require('express');

const app = express();
// 给express上设置变量 作为token密钥 该密钥正常情况应该设置的环境变量里的
// 1> 变量名  2> 对应变量的值 随意写的
app.set('secret', 'i3nIa7anKwp74n0n1')
// 引入跨域模块
app.use(require('cors')());
// 添加中间件
app.use(express.json());
// 托管静态资源文件 static表示静态的
app.use('/uploads', express.static(__dirname + '/uploads'));
// 导入路由后台路由  
// (app)表示把app实例传递给该文件.在该文件内部就可使用
require('./routes/admin')(app);
// 导入数据库操作文件
require('./plugins/db')(app);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});