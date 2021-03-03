/* 网络请求文件 */
// 引入axios
import axios from 'axios';
import Vue from 'vue';
// 创建实例
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api' // 设置后台接口
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
  }
  return Promise.reject(err); // 错误时的响应
});
// 导出
export default http;
