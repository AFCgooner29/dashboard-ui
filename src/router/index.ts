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
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: ()=> import('../views/notFound/NotFound.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    children:[
      {
        path: '/login',
        name: 'login',
        component: ()=> import('../views/auth/Login.vue'),
      },
      {
        path: '/signup',
        name: 'signup',
        component: ()=> import('../views/auth/Signup.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
