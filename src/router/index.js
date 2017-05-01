import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import details from '@/components/Details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/details',
      name: 'details',
      component: details
    }
  ]
})
