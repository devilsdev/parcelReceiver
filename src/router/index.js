import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '@/components/Login'
import Main from '@/components/Main'
import ParcelDeliver from '@/components/ParcelDeliver'
import ParcelReceive from '@/components/ParcelReceive'
import CreateAccount from '@/components/CreateAccount'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/main',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/parcelreceive',
      name: 'Receive',
      component: ParcelReceive,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/parceldeliver',
      name: 'Deliver',
      component: ParcelDeliver,      
      meta: {
        requiresAuth: true
      }
    }, 
    {
      path: '/createaccount',
      name: 'CreateAccount',
      component: CreateAccount
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser)
    next('login')
  else
    next()
})

export default router
