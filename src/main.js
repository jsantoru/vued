import Vue from 'vue'
import App from './App'
import router from './router'
import HelloWorld from '@/components/HelloWorld'
import Vue2 from '@/components/Vue2'

Vue.config.productionTip = false

// components - global registering
//Vue.component('hello', HelloWorld);
Vue.component('vue2', Vue2);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
