/* 项目入口js文件 */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/* 引用公共样式文件 */
import './style.scss';

import router from './router'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
