<!-- 卡片组件 -->
<template>
  <div class="card p-3 bg-white mt-3">
    <!-- 设置动态添加 线 即组件有 plain 属性就不加 -->
    <div class="card-header d-flex ai-center"
    :class="{'border-bottom': !plain, 'pb-3': !plain}">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <!-- 如使用的创建传递 plain 参数 就不显示显示i标签 -->
      <i class="iconfont icon-menu" v-if="!plain"></i>
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
      plain: { type: Boolean }, // 接收该参数
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/_variables.scss';
  .card {
    /* .card-header { 设置设置成动态的的
      border-bottom: 1px solid $border-color;
    } */
    border-bottom: 1px solid $border-color;
  }
</style>