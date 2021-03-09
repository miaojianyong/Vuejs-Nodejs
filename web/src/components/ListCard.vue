<!-- 卡片列表组件 -->
<template>
  <m-card :icon="icon" :title="title"> 
    <div class="nav jc-between">
      <!-- :class="{active: active===i}" 表示动态绑定active类
      如果active等于 当前索引值 就高亮显示
      @click="active = i" 点击谁，就把对应的索引值给i-->
      <div class="nav-item" :class="{active: active===i}"
      v-for="(category, i) in categories" :key="i"
      @click="active = i">
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper>
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
  export default {
    props: {
      icon: {type: String, required: true},
      title: {type: String, required: true},
      categories: {type: Array, required: true}
    },
    data() {
      return {
        active: 0
      }
    }
  }
</script>