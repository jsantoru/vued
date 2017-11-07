import Vue from 'vue'
import Router from 'vue-router'
import MainContent from '@/components/MainContent'
import About from '@/components/About'
import Mirror from '@/components/Mirror'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainContent',
      component: MainContent
    },
    {
      path: '/main-content',
      name: 'MainContent',
      component: MainContent
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/mirror',
      name: 'Mirror',
      component: Mirror
    }
  ]
})
