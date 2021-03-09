/* 项目入口js文件 */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入字体图标文件
import './assets/iconfont/iconfont.css';
/* 引用公共样式文件 */
import './assets/scss/style.scss';
// 引入路由文件
import router from './router'
// 引入制作轮播图插件 在此处引用表示全局引用
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 引入轮播图插件的对应样式
import 'swiper/dist/css/swiper.css'
// 使用轮播图插件
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

// 引入卡片组件 -- 这里是全局引用 可以到具体组件中引用
import Card from './components/Card.vue';
// 定义全局组件
Vue.component('m-card', Card); // 即使用m-card标签就是使用全局组件
// 引入卡片列表组件 -- 这里是全局引用 可以到具体组件中引用
import ListCard from './components/ListCard.vue';
// 定义全局组件
Vue.component('m-list-card', ListCard);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
