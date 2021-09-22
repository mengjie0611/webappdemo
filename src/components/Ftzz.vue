<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="qt">全体</mt-tab-item>
      <mt-tab-item id="zyjg">专业机构</mt-tab-item>
      <mt-tab-item id="zrr">自然人</mt-tab-item>
    </mt-navbar>
    <div class="echarts" id="echarts"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['title', 'date', 'data'],
  data() {
    return {
      mycharts: false,
      initDate: {},
      selected: 'qt',
    }
  },
  methods: {
    async getFtzzDate() {
      let params = 'indexPage'
      const result = await this.$API.reqGetDate(params)
      if (result.code === 0) {
        this.initDate = result.data
        await this.getFtzzData(this.initDate.investor_net_amount, this.selected)
      }
    },

    async getFtzzData(date, code) {
      let tradeDateStr = date
      let limit = 12
      let condition = code
      const result = await this.$API.reqFtzzData(tradeDateStr, limit, condition)
      if (result.code === 0) {
        this.echartsData = result.data
        this.initGraphThree(this.echartsData)
      }
    },

    initGraphThree(data) {
      // 根据设置好的div 进行实例化操作
      if (this.mycharts) this.mycharts.clear()
      this.mycharts = this.$echarts.init(document.getElementById('echarts'))
      // 设置图表的数据和样式
      let option = {
        tooltip: {
          trigger: 'axis',
          confine: true,
          show: false,
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          text: '买卖净额',
          textStyle: {
            fontSize: 13,
            fontFamily: 'SourceHanSansCN-Regular',
            fontWeight: 400,
            color: '#333333',
            padding: [0, 0, 20, 10],
            lineHeight: 21,
          },
        },
        backgroundColor: '#FAFAFA',
        color: ['#0169BB', '#F3D08D', '#FA6920', '#5284EB'],
        legend: [
          {
            data: ['自然人', '专业机构', '沪深股通', '一般机构及其他'],
            show: true,
            top: 'bottom', //距上边距
            left: 'center', //距离左边距
            bottom: '5%', //距离下边距
            itemWidth: 20, // 设置宽度
            itemHeight: 5, // 设置高度
            itemGap: 10, // 设置间距
            textStyle: {
              fontSize: 10,
              fontFamily: 'SourceHanSansCN-Normal',
              lineHeight: 18,
              color: '#999999',
              opacity: 1,
            },
          },
        ],
        grid: {
          top: '20%', //距上边距
          left: '15%', //距离左边距
          right: '10%', //距离右边距
          bottom: '20%', //距离下边距
        },
        xAxis: [
          {
            type: 'category',
            x: 'center',
            data: data.tradeDateList,
            splitLine: {
              show: false,
            },
            axisTick: {
              //x轴刻度线
              show: false,
            },
            axisLine: {
              //x轴
              show: false,
            },
            axisLabel: {
              minInterval: 6,
              maxInterval: 8,
              rotate: 0,
              formatter: '{value}',
              textStyle: {
                color: '#666666',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '单位：亿元',
            nameTextStyle: {
              //y轴上方单位的颜色
              color: '#666666',
              fontSize: 11,
            },
            splitLine: {
              //显示分割线
              show: true,
              lineStyle: {
                color: '#f0f0f0',
              },
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            axisLine: {
              //y轴
              lineStyle: {
                type: 'solid',
                color: '#DDDDDD',
                width: '1',
              },
              show: true,
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#666666',
              },
            },
          },
        ],
        series: [
          {
            name: '自然人',
            type: 'bar',
            barWidth: 13, //柱图宽度
            stack: '复合',
            data: data.zrrList,
          },
          {
            name: '专业机构',
            type: 'bar',
            barWidth: 13, //柱图宽度
            stack: '复合',
            data: data.zyjgList,
          },
          {
            name: '沪深股通',
            type: 'bar',
            barWidth: 13, //柱图宽度
            stack: '复合',
            data: data.hsgtList,
          },
          {
            name: '一般机构及其他',
            type: 'bar',
            barWidth: 13, //柱图宽度
            stack: '复合',
            data: data.qtjgList,
          },
        ],
      }
      // 将设置好的数据放入设置 的图表中
      this.mycharts.setOption(option)
    },
  },
  mounted() {
    this.getFtzzDate()
  },

  watch: {
    selected: function (val) {
      this.getFtzzData(this.initDate.investor_net_amount, val)
    },
  },
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import '../common/stylus/mixins.styl';

.mint-tab-item {
  width: 25px;
  height: 13px;
  font-size: 13px;
  font-family: SourceHanSansCN-Medium;
  line-height: 17px;
  color: #333333;
  opacity: 1;
}

.mint-navbar .mint-tab-item.is-selected {
  color: #2A82FD;
  border-bottom: 2px solid #2a82fd;
}

.echarts {
  width: 375px;
  height: 280px;
}
</style>
