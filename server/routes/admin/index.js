/* 后台路由文件 */
// app接收到传递过来的app实例对象
module.exports = app => {
  // 导入express框架
  const express = require('express');
  // 实例化express的子路由
  const router = express.Router({
    mergeParams: true // 表示合并url参数
    // 在下述就可使用 req.params获取数据
  });
  // 导入分类模型
  // const Category = require('../../models/Category');
  // 1. 向子路由身上添加方法 即监听post请求 新建分类数据 接口
  router.post('/', async (req, res) => {
    // 创建分类数据 即向数据库插入数据
    // 数据来源：req.body 表示客户端传递过来的数据
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  // 1.1 分类修改数据 接口
  router.put('/:id', async (req, res) => {
    // req.params.id 是对应的id参数 客户端传递来的id参数
    // req.body 根据id更新的 内容
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model);
  });
  // 1.2 分类修改数据 删除数据 接口
  router.delete('/:id', async (req, res) => {
    // req.params.id 是对应的id参数 客户端传递来的id参数
    // req.body 根据id更新的 内容
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true // 返回操作成功
    });
  });
  // 2. 分类列表数据 接口
  router.get('/', async (req, res) => {
    // 获取数据库中的数据
    // limit(10) 表示限制为10条数据
    // 因为条件查询在有点地方需要有的地方不需要 故需添加属性判断
    const queryOptions = {};
    // 如果获取到的数据模型 是分类模型
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'; // 给上述的对象添加属性
    };
    // setOptions(queryOptions) 查找是否有对应属性
    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(items); // 发送给前端
  });
  // 3. 分类列表编辑页面 接口
  router.get('/:id', async (req, res) => {
    // 获取数据库中 对应id的数据
    // req.params.id 对应的id
    const model = await req.Model.findById(req.params.id);
    res.send(model); // 发送给前端
  });
  // 拦截路由地址，挂载到express的子路由上 以使用子路由内部方法
  // /rest 表示rest通用的增删改查接口
  // /:resource 动态参数(资源) 
  // 即得到新的接口 /admin/api/rest/ +任意字符
  // async(req, res, next)=>{...} 即表示添加中间件 就是请求前面的地址是先用该中间件处理
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    // 导入处理 单词的模块
    // .classify 表示转类名的意思 如把categories转换为了Categorie
    const modelName = require('inflection').classify(req.params.resource);
    // 获取对应数据的模型 如 Categorie 分类数据模型
    // req.Model 表示给请求对象上 挂载一个Model
    req.Model = require(`../../models/${modelName}`);
    next();
  }, router)
}