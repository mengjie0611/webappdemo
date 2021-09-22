<template>
  <section class="msite">
    <div class="search_tab">
      <div class="search_content">
        <div class="logo"><img src="./images/1267.png" alt=""></div>
        <input class="placeholder" placeholder="   请输入关键字" v-model="keyword">
        <img class="search" src="./images/1.png" alt="">
      </div>
    </div>

    <div class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide"><img src="./images/nav/banner.png" alt=""></div>
        <div class="swiper-slide"><img src="./images/nav/banner.png" alt=""></div>
        <div class="swiper-slide"><img src="./images/nav/banner.png" alt=""></div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="list_tab">
      <div class="list_item" v-for="(item ,index) in listData" :key=index @click="$router.push('/login')">
        <img class="img" :src='item.url' alt="">
        <div class="name">{{item.name}}</div>
      </div>
    </div>

    <div class="market">
      <div class="title">
        <div class="one">市场动态</div>
        <div class="more" @click="$router.push('/order')">更多 <img src="./images/jiantou.png" alt=""></div>
      </div>
      <div class="market_list">
        <div class="list_item" v-for="(item,index) in marketData" :key="index">
          <span class="item_name">{{item.name}}</span>
          <span class="right"><img style="width:15px;height:15px;vertical-align: middle;" src="./images/005yanjing.png" alt="">{{item.readCount}}人已阅</span>
        </div>
      </div>
    </div>

    <div class="dataServer">
      <div class="title">
        <div class="one">数据服务</div>
        <div class="more" @click="$router.push('/order')">更多 <img src="./images/jiantou.png" alt=""></div>
      </div>
    </div>
    <Title v-if="this.flag" title="A股成交" :date="initDate.stock_market" :data="this.option"></Title>
    <Title v-if="this.flag" title="分投资者买卖净额" :date="initDate.stock_market" tab="2"></Title>
    <Title v-if="this.flag1" title="资金概况" :date="initDate.stock_market" :data="this.option1"></Title>
    <div class="bottom"></div>
  </section>
</template>
<script src="lodash.js"></script>
<script type="text/ecmascript-6">
import Swiper from 'swiper'
import chunk from 'lodash/chunk'
import { mapState } from 'vuex'
import 'swiper/css/swiper.css'
import Title from '@/components/Title'
export default {
  components: {
    Title,
  },
  data() {
    return {
      keyword: '',
      listData: [
        {
          name: '指数走势',
          url: require('./images/jianxi.png'),
        },
        {
          name: '股市规模',
          url: require('./images/rongzi.png'),
        },
        {
          name: '债券市场',
          url: require('./images/shgt.png'),
        },
        {
          name: '股市交易',
          url: require('./images/jiaoyi.png'),
        },
        {
          name: '沪深港通',
          url: require('./images/jiaoyi.png'),
        },
        {
          name: '融资融券',
          url: require('./images/ziguanchanp.png'),
        },
        {
          name: '资金概况',
          url: require('./images/zjqk.png'),
        },
        {
          name: '指数走势',
          url: require('./images/jianxi.png'),
        },
        {
          name: '指数走势',
          url: require('./images/jianxi.png'),
        },
        {
          name: '更多',
          url: require('./images/gengduo.png'),
        },
      ],
      marketData: [
        { name: '中央监控晨报_20200830', readCount: 21 },
        { name: '中央监控晨报_20200830', readCount: 21 },
        { name: '中央监控晨报_20200830', readCount: 21 },
      ],
      initDate: {},
      chartsData: {},
      option: {},
      option1: {},
      option2: {},
      flag: false,
      fourTotal: {},
      fourList: [],
      flag1: false,
    }
  },
  mounted() {
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal', // 垂直切换选项
      loop: true, // 循环模式选项
      pagination: {
        el: '.swiper-pagination',
      },
    })
    this.getDate()
  },
  methods: {
    async getDate() {
      let parmas = 'indexPage'
      // 发请求
      const result = await this.$API.reqGetDate(parmas)
      if (result.code === 0) {
        this.initDate = result.data
        // this.getChartsData(this.initDate.stock_market)
        this.getChartsData(this.initDate.stock_market)
        this.getChartsTwoData(this.initDate.fund_profile)
      } else {
        // 停止倒计时
        // this.computeTime = 0
        // MessageBox('提示', result.msg || '发送失败')
      }
    },

    async getChartsData(date) {
      let parmas = date
      const result = await this.$API.reqGetChartsData(parmas)
      if (result.code === 0) {
        this.chartsData = result.data
        this.option = {
          dom: 'echarts1',
          title: {
            text: 'A股日成交金额',
            textStyle: {
              fontSize: 13,
              fontFamily: 'SourceHanSansCN-Regular',
              fontWeight: 400,
              color: '#333333',
              padding: [0, 0, 20, 10],
              lineHeight: 21,
            },
          },
          tooltip: {
            trigger: 'axis',
            confine: true,
            show: false,
          },
          backgroundColor: '#FAFAFA',
          color: ['#5284EB'],
          legend: {
            data: [
              { name: '当日成交额' },
              {
                name: '本年日均成交额',
                icon: 'image://../../img/xuxian1.png',
              },
              {
                name: '上年日均成交额',
                icon: 'image://../../img/xuxian2.png',
              },
            ],
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
              data: this.chartsData.tradeDateList,
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
                textStyle: {
                  color: '#666666',
                },
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '单位：亿元',
              nameTextStyle: {
                //y轴上方单位的颜色
                color: '#666666',
                fontSize: 11,
              },
              scale: true, //自适应
              splitNumber: 5,
              max: function (value) {
                var gap = 0
                gap = Math.ceil(value.max) / 5
                return Math.ceil(value.max) + Math.ceil(gap)
              },
              min: 0,
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
                show: true,
                lineStyle: {
                  // 坐标轴线线的颜色
                  color: '#DDDDDD',
                },
              },
              axisLabel: {
                formatter: '{value} ',
                textStyle: {
                  color: '#666666',
                },
              },
            },
          ],
          series: [
            {
              name: '当日成交额',
              type: 'bar',
              barWidth: 2, //柱图宽度
              data: this.chartsData.todayDealAmountList,
            },
            {
              name: '本年日均成交额',
              type: 'line',
              smooth: true,
              data: this.chartsData.thisYearAvgDealAmountList,
              smooth: false,
              showSymbol: false,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 2,
                    color: '#FFC048',
                    type: 'dotted',
                  },
                },
              },
            },
            {
              name: '上年日均成交额',
              type: 'line',
              smooth: true,
              data: this.chartsData.lastYearAvgDealAmountList,
              smooth: false,
              showSymbol: false,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 2,
                    color: '#FA6920',
                    type: 'dotted',
                  },
                },
              },
            },
          ],
        }

        this.flag = true
      } else {
        // 停止倒计时
        // this.computeTime = 0
        // MessageBox('提示', result.msg || '发送失败')
      }
    },

    async getChartsTwoData(date) {
      let tradeDate = date
      const result = await this.$API.reqGetChartsTwoData(tradeDate)
      if (result.code === 0) {
        this.chartsTwoData = result.data
        this.fourTotal = result.data.heji
        this.fourList.push(result.data.heji)
        this.fourList.push(result.data.rzrq)
        this.fourList.push(result.data.gpqq)
        this.fourList.push(result.data.qhsc)
        this.fourList.push(result.data.zqjy)
        let colorList = ['#0F88E3', '#0169BB', '#FFC048', '#FA6920', '#5284EB']
        this.option1 = {
          dom: 'echarts2',
          title: {
            text: '资本市场资金余额',
            textStyle: {
              fontSize: 13,
              fontFamily: 'SourceHanSansCN-Regular',
              fontWeight: 400,
              color: '#333333',
              padding: [0, 0, 20, 10],
              lineHeight: 21,
            },
          },
          // 设置图表的位置
          grid: {
            y: '20%', // 上间距
            x: '10%', // 左间距
            x2: '15%', // 右间距
            y2: '10%', // 下间距
            containLabel: true, // grid 区域是否包含坐标轴的刻度标签, 常用于『防止标签溢出』的场景
          },
          // 提示框组件
          tooltip: {
            trigger: 'axis', // 触发类型, axis: 坐标轴触发
            show: false,
            confine: true,
            axisPointer: {
              // 指示器类型  'line' 直线指示器 'shadow' 阴影指示器 'none' 无指示器
              // 'cross' 十字准星指示器 其实是种简写，表示启用两个正交的轴的 axisPointer
              type: 'none',
            },
            textStyle: {
              color: '#cdd3ee', // 文字颜色
            },
            // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式 折线（区域）图、柱状（条形）图、K线图
            // {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
            formatter: '{a} <br/>{b} : {c}%',
          },
          backgroundColor: '#FAFAFA',
          // X轴
          xAxis: {
            type: 'value', // 坐标轴类型,   'value' 数值轴，适用于连续数据
            axisTick: {
              show: false, // 是否显示坐标轴刻度 默认显示
            },
            axisLine: {
              // 是否显示坐标轴轴线 默认显示
              show: false, // 是否显示坐标轴轴线 默认显示
            },
            splitLine: {
              show: false, // 是否显示分隔线。默认数值轴显示
            },
            // 坐标轴刻度标签
            axisLabel: {
              show: false, // 是否显示刻度标签 默认显示
            },
          },
          yAxis: [
            // 左侧Y轴
            {
              // 坐标轴类型,  'category' 类目轴，适用于离散的类目数据
              // 为该类型时必须通过 data 设置类目数据
              type: 'category',
              position: 'left',
              // 坐标轴刻度
              axisTick: {
                show: false, // 是否显示坐标轴刻度 默认显示
              },
              // 坐标轴轴线
              axisLine: {
                // 是否显示坐标轴轴线 默认显示
                show: false, // 是否显示坐标轴轴线 默认显示
                lineStyle: {
                  // 坐标轴线线的颜色
                  color: '#cdd3ee',
                },
              },
              // 坐标轴在图表区域中的分隔线
              splitLine: {
                show: false, // 是否显示分隔线。默认数值轴显示
              },
              axisLabel: {
                // 坐标轴刻度标签
                //给坐标名添加颜色属性
                textStyle: {
                  fontSize: 12,
                  fontFamily: 'SourceHanSansCN-Normal, SourceHanSansCN',
                  fontWeight: 400,
                  lineHeight: 21,
                  color: function (params, index) {
                    colorList = ['#333333', '#999999', '#999999', '#999999', '#999999']
                    return colorList[index]
                  },
                },
              },
              // 类目数据，在类目轴（type: 'category'）中有效
              data: ['月末余额合计', '融资融券担保金', '股票期权保证金', '期货市场资金总量', '证券交易结算资金'],
            },
            // 右侧Y轴
            {
              type: 'category',
              name: '单位：亿元',
              nameTextStyle: {
                //y轴上方单位的颜色
                color: '#666666',
                fontSize: 11,
              },
              position: 'right',
              axisTick: {
                show: false, // 是否显示坐标轴刻度 默认显示
              },
              axisLine: {
                show: false, // 是否显示坐标轴轴线 默认显示
              },
              splitLine: {
                show: false, // 是否显示分隔线。默认数值轴显示
              },
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                  fontFamily: 'SourceHanSansCN-Normal, SourceHanSansCN',
                  fontWeight: 400,
                  color: '#666666',
                  lineHeight: 21,
                },
              },
            },
          ],
          // 系列列表
          series: [
            {
              type: 'bar', // 系列类型
              name: '', // 系列名称, 用于tooltip的显示, legend 的图例筛选
              barMaxWidth: 18, // 柱条的最大宽度，不设时自适应
              barMinHeight: 0, // 最小高度改为0
              itemStyle: {
                color: function (params) {
                  let colorList = ['#0F88E3', '#0169BB', '#FFC048', '#FA6920', '#5284EB']
                  return colorList[params.dataIndex]
                },
                barBorderRadius: [5, 5, 5, 5], // 圆角半径, 单位px, 支持传入数组分别指定 4 个圆角半径
              },
              // 图形上的文本标签
              label: {
                show: true,
                // 标签的位置 left right bottom top inside  // 绝对的像素值 position: [10, 10]
                // 相对的百分比 position: ['50%', '50%']
                position: 'right',
                formatter: function (params) {
                  let showString = ''
                  if (params.name == '月末余额合计') {
                    showString = params.data
                  } else {
                    showString = ((params.data / result.data.heji) * 100).toFixed(2) + '%'
                  }
                  return showString
                },
              },
              data: this.fourList, // 系列中的数据内容数组
            },
          ],
        }
        this.flag1 = true
      } else {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

&.msite { // 首页
  width: 100%;
  background: #F0F0F0;
  height: 667px;

  .search_tab {
    width: 375px;
    height: 60px;
    background: linear-gradient(135deg, #368AFF 0%, #1577FF 100%);
    opacity: 1;
    position: relative;

    .search_content {
      width: 90%;
      height: 50%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }

    .logo {
      float: left;

      img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
        margin-top: 3px;
      }
    }

    .placeholder {
      float: right;
      width: 300px;
      height: 31px;
      background: #FFFFFF;
      opacity: 1;
      border-radius: 52px;
    }

    .search {
      position: absolute;
      right: 3%;
      width: 18px;
      height: 18px;
      top: 20%;
    }
  }
}

input:focus {
  outline: none !important;
  border: none !important;
}

.swiper {
  width: 375px;
  height: 156px;
  overflow: hidden;

  .swiper-wrapper {
    .swiper-slide {
      width: 375px;
      height: 156px;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.list_tab {
  width: 90%;
  height: 167px;
  margin: 0 auto;
  margin-top: -20px;
  z-index: 9;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: #FFFFFF;

  .list_item {
    width: 20%;
    height: 50%;
    margin-top: 10px;

    .img {
      width: 25px;
      height: 25px;
      display: block;
      margin: 0 auto;
    }

    .name {
      height: 13px;
      font-size: 13px;
      font-family: SourceHanSansCN-Normal;
      line-height: 17px;
      color: #666666;
      opacity: 1;
      text-align: center;
      margin-top: 10px;
    }
  }
}

.market {
  background: #ffffff;
  margin-top: 10px;
  width: 367px;
  padding: 8px;

  .title {
    height: 30px;
    line-height: 30px;

    .one {
      float: left;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #333333;
      opacity: 1;
    }

    .more {
      float: right;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      color: #999999;
      margin-right: 15px;

      img {
        width: 11px;
        height: 11px;
      }
    }
  }

  .market_list {
    .list_item {
      font-family: SourceHanSansCN-Regular;
      height: 20px;
      margin-top: 5px;

      .item_name {
        float: left;
        font-size: 14px;
      }

      .right {
        float: right;
        margin-right: 15px;
        font-size: 11px;
        color: #333333;
      }
    }
  }
}

.dataServer {
  background: #ffffff;
  margin-top: 10px;
  width: 367px;
  padding: 8px;

  .title {
    height: 30px;
    line-height: 30px;

    .one {
      float: left;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #333333;
      opacity: 1;
    }

    .more {
      float: right;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      color: #999999;
      margin-right: 15px;

      img {
        width: 11px;
        height: 11px;
      }
    }
  }
}

.bottom {
  height: 60px;
}
</style>
