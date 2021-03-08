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
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <!-- 这里为了方便 使用循环生成 显示可以单个写 -->
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end fo nav icons -->
    <i class="iconfont icon-Menu text-primary"></i>
  </div>
</template> 

<script> 
  export default {
    data() {
      return {
        swiperOptions: {
          pagination: { // 上述定义的首页幻灯片类
            el: '.pagination-home'
          },
          autoplay: { delay: 1500 }, /* 然轮播图自动滚动 */
        }
      }
    }
  }
</script>

<style lang="scss"> /* 即声明样式是使用的scss编写 */
@import '../assets/scss/variables.scss'; /* 引入样式文件 */
.pagination-home { /* 轮播图小圆点样式 */
  .swiper-pagination-bullet {
    opacity: 1; /* 去掉半透明效果 */
    border-radius: 0.1538rem; /* 设置圆角 */
    background: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}
.nav-icons { /* 精灵图 每个icon图标的样式 */
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%; /* 即一行显示4个 */
    border-right: 1px solid $border-color;
    &:nth-child(4n) { /* 4个和其倍数去掉边框 */
      border-right: none;
    }
  }
}
</style>