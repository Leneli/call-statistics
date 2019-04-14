import Vue from 'vue'
import ViserVue from 'viser-vue'
import App from './App.vue'
import store from './store'
import './plugins/element.js'

Vue.use(ViserVue)
Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
