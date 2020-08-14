import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Login = () => import('../views/login/Login.vue')
const Home = () => import('../views/home/Home.vue')
const Welcome = () => import('../views/welcome/Welcome.vue')
const Users = () => import('../views/users/Users.vue')
const Rights = () => import('../views/power/Rights.vue')
const Roles = () => import('../views/power/Roles.vue')
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
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      }

    ]
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
