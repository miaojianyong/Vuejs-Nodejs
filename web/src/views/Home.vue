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
    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCars">
      <!-- 使用ListCard组件中定义的具体插槽 items
      #items="{category}" 取子组件中动态绑定的'category'
      把下述标签变为可点击跳转的路由标签 即router-link
      设置tag为div,即默认router-link是a标签
      动态设置:to=“” 即点击后跳转的地址 -->
      <template #items="{category}">
        <router-link 
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-2 fs-lg d-flex" 
        v-for="(news, i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <!-- 英雄列表 -->
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCars">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <div class="p-2 text-center hero-list"
          style="width: 20%;"
          v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100">
            <div>{{hero.name}}</div>
          </div>
        </div>
      </template>
    </m-list-card>

    <m-card icon="card-hero" title="精彩视频"></m-card>
    <m-card icon="card-hero" title="图文攻略"></m-card>
    <m-card icon="card-hero" title="英雄列表"></m-card>
    <m-card icon="card-hero" title="英雄列表"></m-card>
  </div>
</template> 

<script> 
  // 引入处理时间格式的模块
  import dayjs from 'dayjs';
  export default {
    filters: { // 处理时间格式 过滤器
      date(val) {
        return dayjs(val).format('MM/DD');//即转换为2位数的月份和日期
      }
    },
    data() {
      return {
        swiperOptions: {
          pagination: { // 上述定义的首页幻灯片类
            el: '.pagination-home'
          },
          autoplay: { delay: 1500 }, /* 然轮播图自动滚动 */
        },
        newsCars: [], // 存放新闻列表数据
        heroCars: [], // 存放英雄列表数据
      }
    },
    methods: { // 定义该组件的方法
      async fetchNewsCats() { // 获取新闻的分类
        const res = await this.$http.get('news/list');
        this.newsCars = res.data; // 把请求的数据给上述变量
      },
      async fetchHeroCats() { // 获取英雄的分类
        const res = await this.$http.get('heroes/list');
        this.heroCars = res.data; // 把请求的数据给上述变量
      }
    },
    created() { // 生命周期函数 表示页面刚进来要做的事情
      this.fetchNewsCats(); // 执行上述定义的方法
      this.fetchHeroCats();
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
.hero-list  { 
  img { /* 设置英雄头像的圆角 */
    border-radius: 0.1538rem;
  }
}
</style>