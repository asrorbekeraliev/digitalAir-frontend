import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard'
import AddDevice from '../components/Zones.vue'
import Zones from '../components/Zones.vue'
import ZoneInfo from '../components/ZoneInfo.vue'
import Users from '@/components/Users.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/login',
    name: 'login',
    component: Login
  },
  {
    path:'/register',
    name: 'register',
    component: Register
  },
  {
    path:'/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/add-device',
    name: 'add-device',
    component: AddDevice
  },
  {
    path: '/zones',
    name: 'zones',
    component: Zones
  },
  {
    path: '/zones/:id',
    name: 'zoneInfo',
    component: ZoneInfo
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  }



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
