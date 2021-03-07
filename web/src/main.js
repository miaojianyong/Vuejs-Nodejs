/* 项目入口js文件 */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
