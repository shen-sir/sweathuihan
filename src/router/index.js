import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import details from '@/components/Details'
import pay from '@/components/pay'
import personal from '@/components/personal'
import CheckIn from '@/components/CheckIn'
import CheckOut from '@/components/CheckOut'

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
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/CheckIn',
      name: 'CheckIn',
      component: CheckIn
    },
    {
      path: '/CheckOut',
      name: 'CheckOut',
      component: CheckOut
    }
  ]
})
