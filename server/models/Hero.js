/* 英雄数据模型文件 */
// 引入mongoose
const mongoose = require('mongoose');
// 定义模型
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: { // 英雄头像
    type: String, // 在数据库保存图片地址
  },
  banner: { // 英雄图片
    type: String, // 在数据库保存图片地址
  },
  title: { // 称号 如后裔称呼是 半神之弓
    type: String,
  },
  categories: [{ // 类型 如后裔的类型是 射手 这里是一个数组，即一个英雄关联多个分类
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category' // 关联分类模型
  }],
  // 下述的评分是一个复合类型，在关系型数据库是没办法直接定义的如mysql 在mongoose定义更加轻松
  scores: { // 评分 即英雄的评分 
    difficult: { type: Number }, // 难度
    skills: { type: Number }, // 技能
    attack: { type: Number }, // 攻击
    survive: { type: Number }, // 生存
  },
  skills: [{ // 技能
    icon: { type: String }, // 技能图标
    name: { type: String }, // 技能名称
    delay: { type: String }, // 技能冷却值
    cost: { type: String }, // 技能消耗
    description: { type: String }, // 技能介绍
    tips: { type: String }, // 技能小提示
  }],
  items1: [{ // 顺风装备
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item' // 关联装备 即物品模型
  }],
  items2: [{ // 逆风装备
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item' // 关联装备 即物品模型
  }],
  usageTips: { // 使用技巧，即英雄的使用技巧
    type: String
  },
  battleTips: { // 对抗技巧，即英雄的对抗技巧
    type: String
  },
  teamTips: { // 团战思路
    type: String
  },
  partners: [{ // 搭档 即和其他英雄搭配使用
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },//关联英雄
    description: { type: String } // 描述
  }]
})
// 导出物品模型
// 手动指定数据中的模型名称 heroes 数据库默认是heros即首字母小写后面加s
module.exports = mongoose.model('Hero', schema, 'heroes');