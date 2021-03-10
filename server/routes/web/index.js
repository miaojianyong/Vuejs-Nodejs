/* web端路由文件 */
module.exports = app => {
  const router = require('express').Router();
  const mongoose = require('mongoose');
  const Article = mongoose.model('Article'); // 引入文章模型
  const Category = mongoose.model('Category'); // 引入分类模型
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    });
    // 找 新闻分类 下面的子分类
    const cats = await Category.find().where({
      parent: parent
    }).lean();
    const newsTitles = ["老亚瑟的答疑时间：貂蝉-仲夏夜之梦及金色仲夏夜优化后海报展示", "王者荣耀·女神节 峡谷女神才艺showtime还不来围观！", "狄某有话说｜春节回顾，2月对局环境数据盘点！", "嫦娥皮肤设计大赛首轮投票开启公告", "老亚瑟的答疑时间：皮肤优化沟通月历上线，公孙离-祈雪灵祝优化进度展示", "3月9日体验服停机更新公告", "老亚瑟的答疑时间：貂蝉-仲夏夜之梦及金色仲夏夜优化后海报展示", "3月8日网络异常说明", "3月9日全服不停机更新公告", "3月5日体验服停机更新公告", "三月白情恰花开，峡谷好礼携春来", "【峡谷女神的细节考验】活动公告", "女神节来三月春，峡谷好礼迎春来", "元宵佳节至，峡谷迎春来", "新春暖意正融融，多重福利享不停", "K甲春季赛线下售票规则", "2021年K甲春季赛季前赛3月4日12:00开启售票，全新主场，为更强喝彩！", "KPL春季赛季前赛对阵公布，3月11日起每天8场比赛等你来看！", "2021K甲春季赛赛事日历与季前赛赛程公布", "2021K甲春季赛 选手大名单公布"];
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random()-0.5);
      return {
        categories: randomCats.slice(0, 2),
        title: title
      }
    });
    await Article.deleteMany({}); // 清空Article数据库
    await Article.insertMany(newsList); // 插入上述数据
    res.send(newsList);
    // 上述完成访问http://localhost:3000/web/api/news/init即可向数据库添加数据
  });

/* 新闻列表接口 */
  router.get('/news/list', async (req, res) => {
    /* const parent = await Category.findOne({
      name: '新闻分类'
    }).populate({
      path: 'children',
      populate: {
        path: 'newsList'
      }
    }).lean(); */
    const parent = await Category.findOne({
      name: '新闻分类'
    });
    // 使用MongoDB的聚合查询 即执行多次查询
    const cats = await Category.aggregate([
      // 1. $match 条件查询 parent._id表示上述定义parent
      { $match: { parent: parent._id } }, // 一：过滤数据
      // 2. $lookup 查询另外一个集合  
      { // 二：关联查询
        $lookup: {
          from: 'articles', // 要查询的集合名称 集合名称是Article的小写复数形式
          localField: '_id', // 本地键
          foreignField: 'categories', // 外地键
          as: 'newsList' // 定义名称
        }
      },
      { // 设置要newsList中的几条数据 三：修改数据
        $addFields: { // 添加字段 这里是修改字段
          // 只有newsList中的5条数据
          newsList: {$slice: ['$newsList', 5]}
        }
      }
    ])
    // 添加 热门 数据
    const subCats = cats.map(v => v._id); // 返回上述数组中的_id参数
    cats.unshift({ // unshift方法 在cats数组前面加数据 此处是加的对象
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    });
    // 循环上述数据 添加CategoryName属性 并 设置分类名称
    cats.map(cats => {
      cats.newsList.map(news => {
        // 如名称是热门，就显示该分类数组的第1个数组中的name字段 否则显示对应分类名称
        news.CategoryName = cats.name === '热门' ? news.categories[0].name : cats.name; 
        return news
      })
    })
    res.send(cats);
  })

  // 定义接口的前缀地址
  app.use('/web/api', router);
}