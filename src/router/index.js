import { createRouter, createWebHashHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const Login = () => import('../views/Login.vue')
const Reg = () => import('../views/Reg.vue')

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/reg',
    component: Reg
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
