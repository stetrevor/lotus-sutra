import Vue from 'vue'
import App from './App.vue'
import router from './router'
import workbox from './registerServiceWorker'

Vue.config.productionTip = false

Vue.prototype.$workbox = workbox

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
