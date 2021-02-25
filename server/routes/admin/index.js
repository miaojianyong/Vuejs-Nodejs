/* 后台路由文件 */
// app接收到传递过来的app实例对象
module.exports = app => {
  // 导入express框架
  const express = require('express');
  // 实例化express的子路由
  const router = express.Router();
  // 导入分类模型
  const Category = require('../../models/Category');
  // 1. 向子路由身上添加方法 即监听post请求 新建分类数据 接口
  router.post('/categories', async (req, res) => {
    // 创建分类数据 即向数据库插入数据
    // 数据来源：req.body 表示客户端传递过来的数据
    const model = await Category.create(req.body);
    res.send(model);
  });
  // 1.1 分类修改数据 接口
  router.put('/categories/:id', async (req, res) => {
    // req.params.id 是对应的id参数 客户端传递来的id参数
    // req.body 根据id更新的 内容
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model);
  });
  // 1.2 分类修改数据 删除数据 接口
  router.delete('/categories/:id', async (req, res) => {
    // req.params.id 是对应的id参数 客户端传递来的id参数
    // req.body 根据id更新的 内容
    await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true // 返回操作成功
    });
  });
  // 2. 分类列表数据 接口
  router.get('/categories', async (req, res) => {
    // 获取数据库中的数据
    // limit(10) 表示限制为10条数据
    const items = await Category.find().limit(10);
    res.send(items); // 发送给前端
  });
  // 3. 分类列表编辑页面 接口
  router.get('/categories/:id', async (req, res) => {
    // 获取数据库中 对应id的数据
    // req.params.id 对应的id
    const model = await Category.findById(req.params.id);
    res.send(model); // 发送给前端
  });
  // 拦截路由地址，挂载到express的子路由上 以使用子路由内部方法
  app.use('/admin/api', router)
}