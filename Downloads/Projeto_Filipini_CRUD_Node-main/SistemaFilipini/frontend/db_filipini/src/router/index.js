import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthService from "../services/AuthService.js"

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
  // Login
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Login.vue")
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

router.beforeEach((to, from, next) => {
  if (to.name != 'Login' && !AuthService.isSignedIn()) {
    next({ name: 'Login' });
  }
  else {
    if (to.name == "CreateProduct" && !AuthService.isAdmin()) {
      next({ name: 'Home' });
    }
    next();
  }
})

export default router
