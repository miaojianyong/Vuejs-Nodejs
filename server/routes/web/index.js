/* web端路由文件 */
module.exports = app => {
  const router = require('express').Router();
  const mongoose = require('mongoose');
  const Article = mongoose.model('Article'); // 引入文章模型
  const Category = mongoose.model('Category'); // 引入分类模型
  const Hero = mongoose.model('Hero'); // 引入英雄模型

  // 导入新闻数据 即把官网获取的数据(newsTitles)存放到数据库
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
        news.categoryName = cats.name === '热门' ? news.categories[0].name : cats.name; 
        return news
      })
    })
    res.send(cats);
  })

  // 导入英雄数据 即把官网获取的数据导入数据库
  router.get('/heroes/init', async (req, res) => {
    await Hero.deleteMany({}); // 清空数据库中的数据
    /* 下是即表示要录入数据库的数据
    数组里面是一个对象  
    对象的属性 name 是 热门
    对象的属性 heroes 是 对应的英雄数据 
      英雄数据 里面 又是数组 
      数组的每个元素又是对象 也有name 英雄名称 avatar 英雄头像 */
    const rawData = [{ "name": "热门", "heroes": [{ "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "安琪拉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "妲己", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "虞姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg" }, { "name": "马可波罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }] }, { "name": "战士", "heroes": [{ "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "曹操", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg" }, { "name": "典韦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" }, { "name": "宫本武藏", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg" }, { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "老夫子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg" }, { "name": "关羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg" }, { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "刘备", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg" }, { "name": "杨戬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg" }, { "name": "雅典娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg" }, { "name": "哪吒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "梦奇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" }, { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "狂铁", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg" }, { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "李信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg" }, { "name": "盘古", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg" }, { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }, { "name": "曜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg" }, { "name": "马超", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" }, { "name": "蒙恬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg" }, { "name": "夏洛特", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/536/536.jpg" }, { "name": "司空震", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg" }] }, { "name": "法师", "heroes": [{ "name": "小乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" }, { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "妲己", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "嬴政", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg" }, { "name": "高渐离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg" }, { "name": "孙膑", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "扁鹊", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg" }, { "name": "芈月", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "周瑜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg" }, { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "武则天", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg" }, { "name": "貂蝉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "安琪拉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "姜子牙", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "王昭君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg" }, { "name": "张良", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg" }, { "name": "不知火舞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "诸葛亮", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg" }, { "name": "干将莫邪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg" }, { "name": "女娲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg" }, { "name": "杨玉环", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "弈星", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg" }, { "name": "米莱狄", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg" }, { "name": "司马懿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "沈梦溪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg" }, { "name": "上官婉儿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "嫦娥", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }, { "name": "西施", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg" }, { "name": "司空震", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg" }] }, { "name": "坦克", "heroes": [{ "name": "廉颇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg" }, { "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "刘禅", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "白起", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg" }, { "name": "芈月", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "项羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg" }, { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "刘邦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "牛魔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "太乙真人", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "东皇太一", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "梦奇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" }, { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "盾山", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg" }, { "name": "嫦娥", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }, { "name": "猪八戒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg" }, { "name": "蒙恬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg" }, { "name": "阿古朵", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg" }] }, { "name": "刺客", "heroes": [{ "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "阿轲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg" }, { "name": "李白", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg" }, { "name": "貂蝉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "兰陵王", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg" }, { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "不知火舞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "娜可露露", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg" }, { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "百里守约", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "百里玄策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg" }, { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "元歌", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg" }, { "name": "司马懿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "上官婉儿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }, { "name": "马超", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" }, { "name": "镜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg" }, { "name": "澜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg" }] }, { "name": "射手", "heroes": [{ "name": "孙尚香", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" }, { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "马可波罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg" }, { "name": "狄仁杰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg" }, { "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "李元芳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg" }, { "name": "虞姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg" }, { "name": "成吉思汗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg" }, { "name": "黄忠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg" }, { "name": "百里守约", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "公孙离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg" }, { "name": "伽罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" }, { "name": "蒙犽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg" }] }, { "name": "辅助", "heroes": [{ "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "刘禅", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "孙膑", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "牛魔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "蔡文姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg" }, { "name": "太乙真人", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "大乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg" }, { "name": "东皇太一", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" }, { "name": "鬼谷子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg" }, { "name": "明世隐", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg" }, { "name": "盾山", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg" }, { "name": "瑶", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg" }, { "name": "鲁班大师", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg" }, { "name": "阿古朵", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg" }] }];
    // 循环上述数据录入到数据库 -- 热门数据是不需要的
    for (let cat of rawData) {
      if (cat.name === '热门') {
        continue // 即跳过不循环
      }
      // 找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name: cat.name
      });
      cat.heroes = cat.heroes.map(hero => {
        hero.categories = [category]
        return hero
      })
      // 录入英雄数据
      await Hero.insertMany(cat.heroes);
    }
    res.send(await Hero.find());
  });

  // 英雄列表 接口
  router.get('/heroes/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '英雄分类'
    });
    // 使用MongoDB的聚合查询 即执行多次查询
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } }, // 一：过滤数据
      { // 二：关联查询
        $lookup: {
          from: 'heroes', // 要查询的表 即集合
          localField: '_id', // 本地键 即在Category在的字段
          foreignField: 'categories', // 外地键 即在heroes中的字段
          as: 'heroList' // 定义名称
        }
      },
      // 去掉修改字段，即显示查询到的所有英雄
    ])
    // 添加 热门 数据
    const subCats = cats.map(v => v._id); // 返回上述数组中的_id参数
    cats.unshift({ // unshift方法 在cats数组前面加数据 此处是加的对象
      name: '热门',
      heroList: await Hero.find().where({
        categories: { $in: subCats }
      }).limit(10).lean() // 查询10条
    });
    res.send(cats);
  })

  // 文章详情 接口
  router.get('/articles/:id', async (req, res) => {
    // 通过id查找文章 .lean()表示查询的数据变为json对象
    const data = await Article.findById(req.params.id).lean();
    // 添加字段
    data.related = await Article.find().where({
      categories: { $in: data.categories } // 查询根当前数据相同分类的数据
    }).limit(2); // 两条数据
    res.send(data);
  });

  // 英雄详情 接口
  router.get('/heroes/:id', async (req, res) => {
    // 通过id操作英雄数据 .lean()表示查询的数据变为json对象 方便加参数
    const data = await Hero
      .findById(req.params.id)
      .populate('categories') // 关联查询 即分类详情不仅仅是id
      .lean();
    res.send(data);
  });

  // 定义接口的前缀地址
  app.use('/web/api', router);
}