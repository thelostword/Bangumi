import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import layer from './utils/layer.js'
import filters from './common/filters.js'

// 使用vuex
Vue.prototype.$store = store
Vue.prototype.$layer = layer
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
