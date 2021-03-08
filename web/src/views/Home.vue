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
    <!-- 使用全局组件 并传递参数 -->
    <m-card icon="Menu" title="新闻资讯"> 
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公共</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>三月白情恰花开，峡谷好礼携春来</span>
              <span>03/08</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>

    <m-card icon="card-hero" title="英雄列表"></m-card>
    <m-card icon="card-hero" title="精彩视频"></m-card>
    <m-card icon="card-hero" title="图文攻略"></m-card>
    <m-card icon="card-hero" title="英雄列表"></m-card>
    <m-card icon="card-hero" title="英雄列表"></m-card>
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