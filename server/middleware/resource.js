/* 获取模型 中间件 -- 返回一个函数 */
module.exports = options => {
  return async (req, res, next) => {
    // 导入处理 单词的模块
    // .classify 表示转类名的意思 如把categories转换为了Categorie
    const modelName = require('inflection').classify(req.params.resource);
    // 获取对应数据的模型 如 Categorie 分类数据模型
    // req.Model 表示给请求对象上 挂载一个Model
    req.Model = require(`../models/${modelName}`);
    next();
  };
}