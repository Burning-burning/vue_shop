import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Login = () => import('../views/login/Login.vue')
const Home = () => import('../views/home/Home.vue')
const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (window.sessionStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
