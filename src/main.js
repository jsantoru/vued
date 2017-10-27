import Vue from 'vue'
import App from './App'
import router from './router/router'
import TopNav from '@/components/TopNav'
import MainContent from '@/components/MainContent'

Vue.config.productionTip = false

// components - global registering
Vue.component('top-nav', TopNav);
Vue.component('main-content', MainContent);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
