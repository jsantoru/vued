import Vue from 'vue'
import vueResource from 'vue-resource'

import App from './App'
import router from './router/router'
import TopNav from '@/components/TopNav'
import MainContent from '@/components/MainContent'
import LeftSidebar from '@/components/LeftSidebar'
import TheBody from '@/components/TheBody'
import About from '@/components/About'

// single source of truth
import store from './store.js'

// global event bus available to all components as this.$bus
// global store available to all components as this.$store ???
export const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
});

// config
Vue.config.productionTip = false;

// use
Vue.use(vueResource);

// components - global registering
Vue.component('top-nav', TopNav);
Vue.component('main-content', MainContent);
Vue.component('left-sidebar', LeftSidebar);
Vue.component('the-body', TheBody);
Vue.component('about', About);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    store: store
  },
  router,
  render: h => h(App)
});
