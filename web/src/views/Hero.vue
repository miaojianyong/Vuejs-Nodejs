<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black text-white py-2 px-3 d-flex ai-center"> 
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1 text-left">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <!-- 更多英雄跳转到首页 -->
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <h1>{{model.name}}</h1>
  </div>
</template>

<script>
  export default {
    props: {
      id: { required: true },
    },
    data() {
      return {
        model: null, // 存放英雄数据
      }
    },
    methods: { // 定义方法
      async fetch() { // 获取英雄数据
        const res = await this.$http.get(`heroes/${this.id}`);
        this.model = res.data;
      }
    },
    created() { // 生命周期函数 页面进来后执行的
      this.fetch();
    }
  }
</script>