<!-- 卡片列表组件 -->
<template>
  <m-card :icon="icon" :title="title"> 
    <div class="nav jc-between">
      <!-- :class="{active: active===i}" 表示动态绑定active类
      如果active等于 当前索引值 就高亮显示
      @click 表示点击谁就滚动到点击是索引值的位置 -->
      <div class="nav-item" :class="{active: active===i}"
      v-for="(category, i) in categories" :key="i"
      @click="$refs.list.swiper.slideTo(i)">
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <!-- ref="list" 给标签添加ref属性方便选择 如html中的id
      @slide-change 表示把当前swiper的索引值给active -->
      <swiper ref="list"
      @slide-change="() => active = $refs.list.swiper.realIndex">
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