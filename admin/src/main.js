import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
// 引用公共的样式文件
import './style.css'

Vue.config.productionTip = false

// 引入网络请求文件
import http from './http';
// 把网络请求提交到Vue实例的原型上 
// 在任何其他页面就可以使用 this.$http 去访问网络数据请求接口
Vue.prototype.$http = http;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
