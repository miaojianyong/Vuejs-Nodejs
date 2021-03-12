<template>
  <!-- 当 model 有数据时才执行下述代码
  放在刚开始进入该页面时没有数据而报错 -->
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue"></div>
      <strong class="flex-1 text-blue pl-2">{{model.title}}</strong>
      <div class="text-grey fs-xs">2020-03-08</div>
    </div>
    <!-- 使用v-html渲染，在后台使用富文本编写的文章详情 -->
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <!-- 相关资讯 -->
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-news"></i>
        <strong class="text-blue fs-lg ml-2">相关资讯</strong>
      </div>
      <div class="pt-2">
        <!-- 循环相关文章 -->
        <router-link
        class="py-1" 
        tag="div"
        :to="`/articles/${item._id}`"
        v-for="item in model.related"
        :key="item._id">
          {{item.title}}
      </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: { // 接收参数
      id: { required: true}, // id参数 必填
    },
    data() {
      return {
        model: null, // 存放文章数据
      }
    },
    watch: { // 监听数据的变化
      id() { // 数据变化后，再次获取数据
        this.fetch()
      }
      // 上述简写：id: 'fetch'
    },
    methods: { // 封装方法
      async fetch() { // 访问接口请求文章数据
        const res = await this.$http.get(`articles/${this.id}`);
        this.model = res.data;
      }
    },
    created() { // 页面进来就执行的代码
      this.fetch();
    }
  }
</script>

<style lang="scss">
  .page-article {
    .icon-back { /* 设置字体图标样式 */
      font-size: 1.6923rem;
    }
    .body { /* 设置富文本样式 */
      img { /* 设置图片样式 */
        max-width: 100%; 
        height: auto;
      }
      iframe { /* 设置视频样式 */
        width: 100%;
        height: auto;
      }
    }
  }
</style>