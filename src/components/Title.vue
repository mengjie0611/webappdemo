<template>
  <div>
    <div class="title">
      <span class="logo"></span>
      <span class="font">{{title}}</span>
      <span class="date">{{date}}</span>
    </div>
    <div v-if="tab === '2'">
      <Ftzz></Ftzz>
    </div>
    <div v-else class="chart" :id="this.option.dom"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Ftzz from '@/components/Ftzz'
export default {
  components: { Ftzz },
  props: ['title', 'date', 'data', 'tab'],
  data() {
    return {
      mycharts: false,
      option: this.data,
    }
  },
  methods: {
    initEcharts() {
      if (!this.option) return
      if (this.mycharts) this.mycharts.clear()
      this.mycharts = this.$echarts.init(document.getElementById(this.option.dom))
      this.mycharts.setOption(this.option)
    },
  },
  mounted() {
    this.initEcharts()
  },
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import '../common/stylus/mixins.styl';

.title {
  height: 45px;
  background-color: #fff;
  border-bottom: 1px solid #DDDDDD;
  border-top: 1px solid #DDDDDD;

  .logo {
    display: block;
    float: left;
    width: 4px;
    height: 16px;
    background: linear-gradient(135deg, #368AFF 0%, #1577FF 100%);
    opacity: 1;
    border-radius: 2px;
    margin: 15px;
  }

  .font {
    float: left;
    font-size: 17px;
    font-family: SourceHanSansCN-Regular;
    line-height: 45px;
    color: #333333;
    opacity: 1;
  }

  .date {
    float: right;
    font-size: 15px;
    font-family: Roboto-Regular;
    line-height: 45px;
    color: #999999;
    opacity: 1;
    margin-right: 15px;
  }
}

.chart {
  width: 375px;
  height: 280px;
}
</style>
