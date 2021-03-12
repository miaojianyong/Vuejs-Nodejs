import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue' // 主页面组件
import Article from '../views/Article.vue' // 文章详情组件
import Hero from '../views/Hero.vue' // 英雄详情组件

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      // 文章详情路由，对应文章的id props: true 表示该路由接收参数
      { path: '/articles/:id', name: 'article', component: Article, props: true},
    ]
  },
  // 不继承首页的顶部的内容，故在外侧编写路由
  { path: '/heroes/:id', name: 'hero', component: Hero, props: true },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
