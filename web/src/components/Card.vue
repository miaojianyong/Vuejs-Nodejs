<!-- 卡片组件 -->
<template>
  <div class="card p-3 bg-white mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <i class="iconfont icon-menu"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot> <!-- 创建插槽 -->
    </div>
  </div>
</template>

<script>
  export default {
    props: { // 接收组件传递来的参数 required 表示必填
      title: {type: String, required: true},
      icon: {type: String, required: true},
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/_variables.scss';
  .card {
    .card-header {
      border-bottom: 1px solid $border-color;
    }
    border-bottom: 1px solid $border-color;
  }
</style>