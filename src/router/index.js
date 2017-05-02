import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import details from '@/components/Details'
import pay from '@/components/pay'

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
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay
    }
  ]
})
