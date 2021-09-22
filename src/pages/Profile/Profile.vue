<template>
  <section class="profile">
    <Header title="个 人"/>
     <div v-if="user._id">
       <mt-button type="danger" size="large" @click="logout">退出登录</mt-button>
     </div>
  </section>
</template>

<script type="text/ecmascript-6">
import {Button,MessageBox} from 'mint-ui'
 import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState(['user'])
    },
    methods: {
      logout(){
        MessageBox.confirm('确定要推出吗？').then(
          (action)=>{
            this.$store.dispatch('logout')
            this.$router.replace('/login')
          },
          (action)=>{
          console.log('登录取消了')
          }
        )
      }
    },
  }
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
  &.profile //我的
    width 100%
    
</style>
