/* 网络请求文件 */
// 引入axios
import axios from 'axios';
import Vue from 'vue';
import router from './router/index'; // 引入路由文件
// 创建实例
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api' // 设置后台接口
});

// 创建拦截器 给所有请求添加请求头
http.interceptors.request.use(function (config) {
  if (localStorage.token) { // 如果有token在添加Authorization属性
    // 给请求头添加Authorization属性 对应的值是token
    /* Authorization 即标准的请求头 在授权时，如有授权信息时可用该属性传递
    =号后面的就是授权信息,下述是token. 'Bearer ' 表示它的类型 也是标准的格式写法 */
    config.headers.Authorization = 'Bearer ' + localStorage.token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 给http请求添加拦截器 下述是响应拦截器
http.interceptors.response.use(res => {
  return res; // 即正常时的响应
}, err => {
  // 如果err.response.data.message有内容才执行下方方法
  if (err.response.data.message) {
    Vue.prototype.$message({ // 使用element UI中的$message方法 显示提示
      type: 'error',
      message: err.response.data.message
    });
    // 如果有状态码是401
    if (err.response.status === 401) {
      router.push('/login'); // 跳转到登录页面
    }
  }
  return Promise.reject(err); // 错误时的响应
});
// 导出
export default http;
