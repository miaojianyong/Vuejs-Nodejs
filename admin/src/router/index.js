import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
/* 使用懒加载方式 引入登录页面文件 */
const Login = () => import('../views/Login.vue');
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
// 引入新建广告位页面
import AdEdit from '../views/AdEdit.vue';
// 引入广告位列表页面
import AdList from '../views/AdList.vue';
// 引入新建管理员页面
import AdminUserEdit from '../views/AdminUserEdit.vue';
// 引入管理员列表页面
import AdminUserList from '../views/AdminUserList.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login, // 对应页面组件 
  },
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
      { // 新建文章 子路由
        path: '/ads/create',
        component: AdEdit
      },
      { // 文章列表 子路由
        path: '/ads/list',
        component: AdList
      },
      { // 文章列表 的编译页面 子路由
        path: '/ads/edit/:id',
        props: true,
        component: AdEdit
      },
      { // 新建文章 子路由
        path: '/admin_users/create',
        component: AdminUserEdit
      },
      { // 文章列表 子路由
        path: '/admin_users/list',
        component: AdminUserList
      },
      { // 文章列表 的编译页面 子路由
        path: '/admin_users/edit/:id',
        props: true,
        component: AdminUserEdit
      },
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'history' // 配置模式
  /* 把：http://localhost:8080/#/categories/create
  改为：http://localhost:8080/categories/create */
})

export default router
