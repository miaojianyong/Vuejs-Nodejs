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
    <!-- end of top  -->
    <div>
      <div class="bg-white px-2">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <!-- 第1页 -->
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-Menu"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-Menu"></i>
                  一图识英雄
                </router-link>
              </div>
              <!-- skills 技能 -->
              <div class="skills mt-4">
                <!-- 技能图标 -->
                <div class="d-flex jc-around">
                  <img :src="item.icon" 
                  v-for="(item, i) in model.skills"
                  :key="item.name"
                  class="icon"
                  :class="{active: currentSkillIndex === i}"
                  @click="currentSkillIndex = i">
                </div>
                <!-- 技能图标 对应的描述信息 -->
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3"> <!-- 技能名称 -->
                    <h3 class="m-0">{{currentSkill.name}}</h3>
                    <span class="text-grey-1 ml-4 fs-xs">
                      (冷却值：{{currentSkill.delay}} 
                      消耗：{{currentSkill.cost}})
                    </span>
                  </div>
                  <p>{{currentSkill.description}}</p><!-- 技能描述 -->
                  <div class="border-bottom"></div>
                  <p class="text-grey-1">小提示：{{currentSkill.tips}}</p>
                </div>
              </div>
            </div>
            <!-- 出装推荐 -->
            <m-card plain icon="card-hero" title="出装推荐" class="hero-items">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
            </m-card>
            <m-card plain icon="card-hero" title="使用技巧">
              <p class="m-0">{{model.usageTips}}</p>
            </m-card>
            <m-card plain icon="card-hero" title="对抗技巧">
              <p class="m-0">{{model.battleTips}}</p>
            </m-card>
            <m-card plain icon="card-hero" title="团战思路">
              <p class="m-0">{{model.teamTips}}</p>
            </m-card>
            <m-card plain icon="card-hero" title="英雄关系">
              <div class="fs-xl">最佳搭档</div>
              <div v-for="item in model.partners" 
              :key="item.name" class="d-flex pt-3">
                <img :src="item.hero.avatar" height="50">
                <p class="flex-1  m-0 ml-3">{{item.description}}</p>
              </div>
              <div class="border-bottom mt-3"></div>
            </m-card>
          </div>
        </swiper-slide>
        <!-- 第2页 -->
        <swiper-slide></swiper-slide>
      </swiper>
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
        currentSkillIndex: 0, // 存储当前技能的索引值
      }
    },
    computed: { // 计算属性
      // 基于当前技能索引值 获取当前技能
      currentSkill() {
        return this.model.skills[this.currentSkillIndex];
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
  @import '../assets/scss/_variables.scss';
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
    .skills {
      img.icon { /* 选中技能时的边框 */
        width: 70px;
        height: 70px;
        border: 3px solid map-get($colors, 'white');
        &.active {
          border-color: map-get($colors, 'primary');
        }
        border-radius: 45%;
      }
    }
    .hero-items {
      img.icon {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
  }
</style>