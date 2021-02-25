import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
// 引入新建分类页面
import CategoryEdit from '../views/CategoryEdit.vue';
// 引入分类列表页面
import CategoryList from '../views/CategoryList.vue';

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
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
