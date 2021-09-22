<template>
  <div class="footer-guide">
    <div class="guide-item " :class="{on: $route.path==='/msite'}" @click="goto('/msite')">
      <span>
        <i class="iconfont icon-house"></i>
      </span>
      <span>首页</span>
    </div>
    <div class="guide-item" :class="{on: $route.path==='/search'}" @click="goto('/search')">
      <span>
        <i class="iconfont icon-shujutubiao"></i>
      </span>
      <span>数据服务</span>
    </div>
    <div class="guide-item" :class="{on: $route.path==='/order'}" @click="goto('/msite')">
      <span>
        <i class="iconfont icon-laba"></i>
      </span>
      <span>数据服务</span>
    </div>
    <div class="guide-item" :class="{on: $route.path==='/profile'}" @click="goto('/profile')">
      <span>
        <i class="iconfont icon-personal"></i>
      </span>
      <span>我的</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    goto(path) {
      if (path !== this.$route.path) {
        this.$router.replace(path)
      }
    },
  },
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.footer-guide {
  background: white;
  top-border-1px(#cccccc);
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;

  .guide-item {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 25%;

    &.on {
      color: $blue;
    }

    span {
      margin-top: 5px;
      font-size: 12px;

      i {
        font-size: 22px;
      }
    }
  }
}
</style>
