<template>
  <div> 
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/1.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/2.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/3.jpeg" alt="">
      </swiper-slide>
      <!-- 添加pagination-home类 即为首页幻灯片的 避免类名冲突 -->
      <div class="swiper-pagination pagination-home text-right px-3 pd-1" 
      slot="pagination"></div>
    </swiper>
  </div>
</template> 

<script> 
  export default {
    data() {
      return {
        swiperOptions: {
          pagination: { // 上述定义的首页幻灯片类
            el: '.pagination-home'
          }
        }
      }
    }
  }
</script>

<style lang="scss"> /* 即声明样式是使用的scss编写 */
@import '../assets/scss/variables.scss'; /* 引入样式文件 */
  .pagination-home {
    .swiper-pagination-bullet {
      opacity: 1; /* 去掉半透明效果 */
      border-radius: 0.1538rem; /* 设置圆角 */
      background: map-get($colors, 'white');
      &.swiper-pagination-bullet-active {
        background: map-get($colors, 'info');
      }
    }
  }
</style>