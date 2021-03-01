import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
// 引入新建分类页面
import CategoryEdit from '../views/CategoryEdit.vue';
// 引入分类列表页面
import CategoryList from '../views/CategoryList.vue';
// 引入新建物品页面
import ItemEdit from '../views/ItemEdit.vue';
// 引入物品列表页面
import ItemList from '../views/ItemList.vue';
// 引入新建英雄页面
import HeroEdit from '../views/HeroEdit.vue';
// 引入英雄列表页面
import HeroList from '../views/HeroList.vue';
// 引入新建文章页面
import ArticleEdit from '../views/ArticleEdit.vue';
// 引入文章列表页面
import ArticleList from '../views/ArticleList.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { // 新建分类 子路由
        path: '/categories/create',
        component: CategoryEdit
      },
      { // 分类列表 子路由
        path: '/categories/list',
        component: CategoryList
      },
      { // 分类列表 的编译页面 子路由
        path: '/categories/edit/:id',
        props: true, // 表示传递参数 即id参数传递给CategoryEdit页面
        component: CategoryEdit
      },
      { // 新建物品 子路由
        path: '/items/create',
        component: ItemEdit
      },
      { // 物品列表 子路由
        path: '/items/list',
        component: ItemList
      },
      { // 物品列表 的编译页面 子路由
        path: '/items/edit/:id',
        props: true,
        component: ItemEdit
      },
      { // 新建英雄 子路由
        path: '/heroes/create',
        component: HeroEdit
      },
      { // 英雄列表 子路由
        path: '/heroes/list',
        component: HeroList
      },
      { // 英雄列表 的编译页面 子路由
        path: '/heroes/edit/:id',
        props: true,
        component: HeroEdit
      },
      { // 新建文章 子路由
        path: '/articles/create',
        component: ArticleEdit
      },
      { // 文章列表 子路由
        path: '/articles/list',
        component: ArticleList
      },
      { // 文章列表 的编译页面 子路由
        path: '/articles/edit/:id',
        props: true,
        component: ArticleEdit
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
