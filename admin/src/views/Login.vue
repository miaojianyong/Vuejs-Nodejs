<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <!-- @submit 监听提交
      native 监听form的原生表单事件
      prevent 阻止默认提交 不用跳转页面 -->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        model: {}
      }
    },
    methods: {
      async login() { // 监听登录方法
        // 请求接口 1>'login'请求地址 2>this.model 传递的参数用户输入的内容
        const res = await this.$http.post('login', this.model);
        // 在浏览器中存储服务器返回的token
        localStorage.token = res.data.token;
        // sessionStorage 表示浏览器关闭后就没有token了
        // localStorage 变量浏览器关闭后在打开会有存储
        // console.log(res.data); 服务器端返回的数据 如‘ok’
        this.$router.push('/'); // 页面跳转到根路径
        this.$message({ // 提示信息
          type: 'success',
          message: '登录成功'
        })
      }
    }
  }
</script>
<style>
  .login-card {
    width: 30rem; /* 宽度30个字 */
    margin: 10rem auto; /* 距离上10个字 左右居中 */
  }
</style>
