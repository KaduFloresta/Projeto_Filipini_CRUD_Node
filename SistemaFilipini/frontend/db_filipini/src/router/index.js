import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/createuser',
    name: 'Create User',
    component: () => import("../views/Create/User.vue")
  },
  {
    path: '/createprod',
    name: 'Create Product',
    component: () => import("../views/Create/Product.vue")
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
