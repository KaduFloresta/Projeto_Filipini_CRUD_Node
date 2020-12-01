import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthService from '../services/AuthService.js'
import LoggedLayout from '@/layouts/LoggedLayout'
import AuthLayout from '@/layouts/AuthLayout'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: 'Home',
  component: LoggedLayout,
  children: [{
    // Homepage
    path: '/home',
    name: 'Home',
    component: Home
  },
  // Page Sobre
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
    path: '/createproduct',
    name: 'CreateProduct',
    component: () => import("../views/Create/Product.vue")
  },
  {
    path: '/createlogin',
    name: 'CreateLogin',
    component: () => import("../views/Create/UserLogin.vue")
  },
  // Read
  {
    path: '/listuser',
    name: 'ListUser',
    component: () => import("../views/Read/User.vue")
  },
  {
    path: '/listproduct',
    name: 'ListProduct',
    component: () => import("../views/Read/Product.vue")
  },
  {
    path: '/listlogin',
    name: 'ListLogin',
    component: () => import("../views/Read/UserLogin.vue")
  },
  // Detalhe Update/Delete
  {
    path: '/detailuser',
    name: 'DetailUser',
    component: () => import("../views/Details/User.vue")
  },
  {
    path: '/detailproduct',
    name: 'DetailProduct',
    component: () => import("../views/Details/Product.vue")
  },
  {
    path: '/detaillogin',
    name: 'DetailLogin',
    component: () => import("../views/Details/UserLogin.vue")
  },
  ]
},
{
  path: '/login',
  redirect: 'Login',
  component: AuthLayout,
  children: [{
    path: '/login',
    name: 'Login',
    component: () =>
      import("../views/Login.vue")
  }]
}
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
