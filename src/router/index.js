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
const MyDate = () => import('../views/MyDate.vue')
const History = () => import('../views/History.vue')
const Favorite = () => import('../views/Favorite.vue')
const NotFound = () => import('../views/NotFound.vue')

// самый обычный роутер

const routes = [
  {
    path: '/:pathMatch(.*)*',
    component:NotFound
  },
  {
    path: '/',
    component: Menu
  },
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
    path: '/profile/mydate',
    component: MyDate
  },
  {
    path: '/profile/history',
    component: History
  },
  {
    path: '/profile/favorite',
    component: Favorite
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
