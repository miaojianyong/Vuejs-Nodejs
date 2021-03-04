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

Vue.mixin({ // 在全局创建混入 即创建的方法全局可用
  computed: { // 计算属性
    uploadUrl() { // 设置上传图片的地址
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: { // 定义方法
    getAuthHeaders() { // 在任意文件就可使用此方法 即给请求头设置Authorization属性
      return { // Authorization属性 对应的值是token
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
