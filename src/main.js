import Vue from 'vue'
import 'lib-flexible'
import router from './router'
import * as echarts from 'echarts'
import App from './App.vue'
import Header from './components/Header.vue'
import store from './vuex/store'
import './validate'
import * as API from './api/index'
import i18n from './i18n'
import { Button, Navbar, TabItem } from 'mint-ui'
import CartControl from './components/CartControl'
import VueLazyload from 'vue-lazyload'
import loading from './pages/Shop/img/timg.gif'
import './mock/mockServer'
Vue.use(VueLazyload, {
    loading,
})
Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.prototype.$API = API
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.component('Header', Header)
Vue.component('CartControl', CartControl)
new Vue({
    render: (h) => h(App),
    router,
    i18n,
    store,
}).$mount('#app')