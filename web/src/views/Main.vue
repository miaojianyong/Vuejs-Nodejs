<template>
  <div>
    <!-- 顶部 app下载提示
    然后class中的样式 就可用定义好style.scss中样式-->
    <div class="topbar bg-black text-white py-2 px-3 d-flex ai-center"> 
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1 text-left">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <!-- 导航 首页、攻略中心、赛事中心 -->
    <div class="bg-primary pt-3 pb-2"> 
      <!-- flex布局 文字颜色 水平分别并且左右两侧有空白-->
      <div class="nav d-flex text-white jc-around pb-1">
        <!-- active高亮 即选中 文字底部有边框 -->
        <div class="nav-item active">
          <!-- router-link 表示连接 默认是a标签 tag设置标签类型 -->
          <router-link class="nav-link" tag="div" to="/">首页</router-link> 
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link> 
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link> 
        </div>
      </div>
    </div>
    <router-view/> <!-- 具体导航对应的子路由 页面 -->
  </div>
</template> 

<script>
  export default {

  }
</script>

<style></style>