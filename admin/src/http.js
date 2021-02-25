/* 网络请求文件 */
// 引入axios
import axios from 'axios';
// 创建实例
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api' // 设置后台接口
})

// 导出
export default http;
