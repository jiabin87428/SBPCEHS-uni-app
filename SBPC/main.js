import Vue from 'vue'
import App from './App'

import store from './store'
import onfire from 'onfire.js'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$fire = new onfire()

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
