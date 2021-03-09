/* 后台路由文件 */
// app接收到传递过来的app实例对象
module.exports = app => {
  // 导入express框架
  const express = require('express');
  const jwt = require('jsonwebtoken'); // 导入返回token的模块
  const AdminUser = require('../../models/AdminUser'); // 导入用户模型
  // 引入 http-assert 模块
  const assert = require('http-assert');
  // 实例化express的子路由
  const router = express.Router({
    mergeParams: true // 表示合并url参数
    // 在下述就可使用 req.params获取数据
  });

  // 1. 向子路由身上添加方法 即监听post请求 新建分类数据 接口
  router.post('/', async (req, res) => { // 创建资源
    // 创建分类数据 即向数据库插入数据
    // 数据来源：req.body 表示客户端传递过来的数据
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  // 1.1 分类修改数据 接口
  router.put('/:id', async (req, res) => { // 更新资源
    // req.params.id 是对应的id参数 客户端传递来的id参数
    // req.body 根据id更新的 内容
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model);
  });

  // 1.2 分类修改数据 删除数据 接口
  router.delete('/:id', async (req, res) => { // 删除资源
    // req.params.id 是对应的id参数 客户端传递来的id参数
    // req.body 根据id更新的 内容
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true // 返回操作成功
    });
  });

  // 2. 分类列表数据 接口
  router.get('/', async (req, res) => { // 资源列表
      // console.log(req.user); 和上述输出一样
      // 获取数据库中的数据
      // limit(10) 表示限制为10条数据
      // 因为条件查询在有点地方需要有的地方不需要 故需添加属性判断
      const queryOptions = {};
      // 如果获取到的数据模型 是分类模型
      if (req.Model.modelName === 'Category') {
        queryOptions.populate = 'parent'; // 给上述的对象添加属性
      };
      // setOptions(queryOptions) 查找是否有对应属性
      const items = await req.Model.find().setOptions(queryOptions).limit(100);
      res.send(items); // 发送给前端
  });

  // 3. 分类列表编辑页面 接口
  router.get('/:id', async (req, res) => { // 资源详情
    // 获取数据库中 对应id的数据
    // req.params.id 对应的id
    const model = await req.Model.findById(req.params.id);
    res.send(model); // 发送给前端
  });

  // 导入处理 校验用户是否登录 中间件 因为它返回的是一个函数使用是需加()调用
  const authMiddleware = require('../../middleware/auth');
  // 导入 获取模型 中间件 因为它返回的是一个函数使用是需加()调用
  const resourceMiddleware = require('../../middleware/resource');

  // 拦截路由地址，挂载到express的子路由上 以使用子路由内部方法
  // /rest 表示rest通用的增删改查接口
  // /:resource 动态参数(资源) 
  // 即得到新的接口 /admin/api/rest/ +任意字符
  // authMiddleware 校验用户是否登录中间件 resourceMiddleware 获取模型中间件
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router);

/* 上传图片文件的接口 */
  // 引入处理上传文件从模块
  const multer = require('multer');
  // 定义上传中间件 __dirname 表示决定地址 意思是当前文件所在文件夹
  const upload = multer({
    dest: __dirname + '/../../uploads', // 表示目标地址 即存放到什么位置
  });
  // upload.single('file') 表示接受单个文件的上传 file是字段名
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file; // res.file 是加上upload.single('file')中间件才有的
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });

/* 登陆接口 */
  app.post('/admin/api/login', async (req, res) => {
    // res.send('ok'); 给客户端响应的内容
    // req.body 表示客户端传递过来的数据
    const { username, password } = req.body; // 结构客户端传递的数据
    // 根据上述传递过来的用户名在数据库中查找用户
    // select('+password') 因为我们在用户模型中设置了select为false故此处需强制选取
    const user = await AdminUser.findOne({ username }).select('+password');
    /* if (!user) { // 如果找不到用户
      // 这里统一 422表示 客户端提交的数据有问题
      return res.status(422).send({ // 返回状态码 和 提示数据
        message: '用户不存在'
      })
    } */
    // 使用 assert 替换上述的写法
    // 表示如果用户不存在(user),就设置422状态码,参数3是message信息
    assert(user, 422, '用户不存在');
    // 2. 校验密码
    // 1>导入密码加密模块 2>使用compareSync方法比较明文和密文是否匹配 返回布尔值
    // compareSync方法 参数1是明文密码即用户传递过的，参数2是数据库中的密文密码
    const isValid = require('bcrypt').compareSync(password, user.password);
    /* if (!isValid) { // 如果密码不对
      return res.status(422).send({
        message: '密码错误'
      })
    } */
    assert(isValid, 422, '密码错误');
    // 3. 返回token
    // 使用sign生成token
    // 1> id: user._id 表示id是用户的id
    // 2> app.get('secret')获取app上的变量 密钥
    const token = jwt.sign({ id: user._id }, app.get('secret'));
    res.send({ token }); // 把生成的token发送给客户端
  });
  
  // 错误处理函数 即错误处理中间件
  // 使用上述assert后会抛出异常直接报错，
  app.use(async (err, req, res, next) => {
    // 设置状态码(err.statusCode表示获取设置的)，并错误信息响应出去
    // 获取不到状态码就报500错误
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  });
}