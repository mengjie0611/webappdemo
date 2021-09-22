<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShow"></FooterGuide>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterGuide from './components/FooterGuide/FooterGuide'
import './common/stylus/mixins.styl'
export default {
  components: {
    FooterGuide,
  },
  mounted() {
    // this.$store.dispatch('getAddress')
    // this.$store.dispatch('getCategorys')
    // this.$store.dispatch('getShops')
    this.$store.dispatch('autoLogin')
  },
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped></style>
