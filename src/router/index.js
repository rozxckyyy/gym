import { createRouter, createWebHashHistory } from 'vue-router'

const Menu = () => import('../views/Menu.vue')
const Login = () => import('../views/Login.vue')
const Reg = () => import('../views/Reg.vue')
const Profile = () => import('../views/Profile.vue')
const Services = () => import('../views/Services.vue')
const Coaches = () => import('../views/Coaches.vue')
const Admin = () => import('../views/Admin.vue')
const MyServices = () => import('../views/MyServices.vue')
const Service = () => import('../views/Service.vue')
const DatePick = () => import('../views/DatePick.vue')


const routes = [
  {
    path: '/menu',
    component: Menu
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/reg',
    component: Reg,
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/profile/myservices',
    component: MyServices
  },
  {
    path: '/menu/services',
    component: Services
  },
  {
    path: '/menu/services/coaches',
    component: Coaches
  },
  {
    path: '/menu/services/coaches/service',
    component: Service
  },
  {
    path: '/menu/services/coaches/service/date-pick',
    component: DatePick
  },
  {
    path: '/admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
