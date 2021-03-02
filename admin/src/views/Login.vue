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
      login() { // 监听登录方法
        // 请求接口
        console.log(this.model); // 输出用户输入的内容
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
