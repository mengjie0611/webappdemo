<template>
  <section class="search">
    <Header class="title" title="数据服务" />
    <div style="height:1.2rem"></div>
    <div class="top">
      <div class="font">我的首页</div>
      <div class="right">
        <ul class="list">
          <li class="item" v-for="(item,index) in listData1" :key="index">
            <div v-if="index === 5" class="edit">编辑</div>
            <div v-else-if="index === 4" class="point">
              <div class="one"></div>
              <div class="one"></div>
              <div class="one"></div>
            </div>
            <img v-else :src="item.url" alt="" srcset="">
          </li>
        </ul>
      </div>
    </div>

    <div class="gap"></div>
    <div class="list_tab">
      <div class="list_item" v-for="(item ,index) in listData" :key=index @click="$router.push(item.router)">
        <img class="img" :src='item.url' alt="">
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      listData: [
        {
          name: '指数走势',
          url: require('../MSite/images/jianxi.png'),
          router: '/zszs',
        },
        {
          name: '股市规模',
          url: require('../MSite/images/rongzi.png'),
        },
        {
          name: '债券市场',
          url: require('../MSite/images/shgt.png'),
        },
        {
          name: '股市交易',
          url: require('../MSite/images/jiaoyi.png'),
        },
        {
          name: '沪深港通',
          url: require('../MSite/images/jiaoyi.png'),
        },
        {
          name: '融资融券',
          url: require('../MSite/images/ziguanchanp.png'),
        },
        {
          name: '资金概况',
          url: require('../MSite/images/zjqk.png'),
        },
        {
          name: '指数走势',
          url: require('../MSite/images/jianxi.png'),
        },
        {
          name: '指数走势',
          url: require('../MSite/images/jianxi.png'),
        },
        {
          name: '更多',
          url: require('../MSite/images/gengduo.png'),
        },
      ],
      listData1: [
        {
          name: '指数走势',
          url: require('../MSite/images/jianxi.png'),
        },
        {
          name: '股市规模',
          url: require('../MSite/images/rongzi.png'),
        },
        {
          name: '债券市场',
          url: require('../MSite/images/shgt.png'),
        },
        {
          name: '更多',
          url: require('../MSite/images/gengduo.png'),
        },
        {
          name: '更多',
          url: require('../MSite/images/gengduo.png'),
        },
        {
          name: '更多',
          url: require('../MSite/images/gengduo.png'),
        },
      ],
    }
  },
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
.search {
  background-color: #F0F0F0;
}

.title {
  width: 86px;
  height: 28px;
  font-size: 19px;
  font-family: SourceHanSansCN-Regular;
  line-height: 28px;
  color: #FFFFFF;
  opacity: 1;
}

.top {
  width: 365px;
  height: 47px;
  background: #FFFFFF;
  opacity: 1;
  clear: both;
  padding: 5px;
  border-bottom: 1px solid #eee;

  .font {
    float: left;
    height: 47px;
    font-size: 17px;
    font-family: SourceHanSansCN-Regular;
    line-height: 47px;
    color: #333333;
    opacity: 1;
  }

  .right {
    float: right;
    height: 47px;
    line-height: 58px;
    margin-right: 5px;

    .list {
      .item {
        float: left;
        margin-left: 11px;

        img {
          width: 18px;
          height: 18px;
        }

        .point {
          margin-top: 22px;

          .one {
            float: left;
            width: 4px;
            height: 4px;
            background: #D8D8D8;
            border-radius: 50%;
            margin-right: 2px;
            opacity: 1;
          }
        }

        .edit {
          width: 51px;
          height: 22px;
          background: #FFFFFF;
          border: 1px solid #E0E0E0;
          opacity: 1;
          border-radius: 2px;
          line-height: 22px;
          text-align: center;
          color: #999999;
          margin-top: 13px;
        }
      }
    }
  }
}

.list_tab {
  width: 100%;
  height: 167px;
  margin: 0 auto;
  z-index: 9;
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

.gap {
  height: 10px;
  width: 100vw;
  background: #f0f0f0;
}
</style>