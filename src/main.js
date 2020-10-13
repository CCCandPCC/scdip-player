import "whatwg-fetch";
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify';
import VueAnalytics from 'vue-analytics'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

if (process.env.VUE_APP_GOOGLE_ANALYTICS_ID)
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
    router
  })