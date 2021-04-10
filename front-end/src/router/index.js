import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ApplicationEdit from '../views/ApplicationEdit.vue'
import Application from '../views/Application.vue'
import Launchpad from '../views/Launchpad.vue'
import ThankYou from '../views/ThankYou.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/application/edit',
    name: 'ApplicationEdit',
    component: ApplicationEdit
  },
  {
    path: '/application',
    name: 'Application',
    component: Application
  },
  {
    path: '/launchpad',
    name: 'Launchpad',
    component: Launchpad
  },
  {
    path: '/thankyou',
    name: 'ThankYou',
    component: ThankYou
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
