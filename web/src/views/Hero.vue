<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black text-white py-2 px-3 d-flex ai-center"> 
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1 text-left">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <!-- 更多英雄跳转到首页 -->
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <!-- 查询出数组中，多个对象 对应的属性 
        .join('/') 查询的结果使用 / 分隔 -->
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores"> <!-- v-if表示有数据才显示 -->
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">皮肤: 2 &gt;</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: { required: true },
    },
    data() {
      return {
        model: null, // 存放英雄数据
      }
    },
    methods: { // 定义方法
      async fetch() { // 获取英雄数据
        const res = await this.$http.get(`heroes/${this.id}`);
        this.model = res.data;
      }
    },
    created() { // 生命周期函数 页面进来后执行的
      this.fetch();
    }
  }
</script>

<style lang="scss">
  .page-hero {
    .top { /* 设置背景图样式 */
      height: 50vw;
      background: #fff no-repeat top center;
      background-size: auto 100%;
    }
    .info { /* 设置背景渐变样式 */
      /* 即从上到下，从全透明到全黑 */
      background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
      .scores {
        .badge { /* 设置难度、技能等数字的样式 */
          margin: 0 0.25rem;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 0.9rem;
          text-align: center;
          border-radius: 50%;
          font-size: 0.6rem;
          border: 1px solid rgba(255,255,255,.2);
        }
      }
    }
  }
</style>