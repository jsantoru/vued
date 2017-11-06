// boiler plate
import Vue from 'vue'
import vueResource from 'vue-resource'
import router from './router/router'

// components
import App from './App'
import TopNav from '@/components/TopNav'
import MainContent from '@/components/MainContent'
import LeftSidebar from '@/components/LeftSidebar'
import TheBody from '@/components/TheBody'
import About from '@/components/About'
import Mirror from '@/components/Mirror'

// the daos to access the store
import daos from './store/daos'

// global event bus available to all components as this.$bus
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
Vue.component('mirror', Mirror);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    daos: daos
  },
  router,
  render: h => h(App)
});
