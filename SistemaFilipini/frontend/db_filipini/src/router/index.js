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
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  // Create
  {
    path: '/createuser',
    name: 'CreateUser',
    component: () => import("../views/Create/User.vue")
  },
  {
    path: '/createuseraccess',
    name: 'CreateUserAccess',
    component: () => import("../views/Create/UserAccess.vue")
  },
  {
    path: '/createprod',
    name: 'CreateProduct',
    component: () => import("../views/Create/Product.vue")
  },
  // Read
  {
    path: '/listprod',
    name: 'ListProduct',
    component: () => import("../views/Read/Product.vue")
  },
  {
    path: '/detailprod',
    name: 'DetailProduct',
    component: () => import("../views/Details/Product.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
