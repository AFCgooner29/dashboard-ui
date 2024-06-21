import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Landing from '../views/website/landingPage/Landing.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Landing,
  },
  {
    path: '/admin',
    name: 'admin',
    component: ()=> import('../views/admin/dashboard/Dashboard.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
