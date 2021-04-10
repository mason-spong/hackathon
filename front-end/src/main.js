import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.config.productionTip = false
Vue.use(VueCoreVideoPlayer)
let data = {
  company: null
}

new Vue({
  data,
  router,
  render: h => h(App)
}).$mount('#app')
