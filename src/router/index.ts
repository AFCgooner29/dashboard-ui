import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Landing from '../views/website/landingPage/Landing.vue';
import Website from '@/views/website/Website.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'website',
    component: Website,
    children:[
      { path: '', name: 'landing', component: ()=> Landing },
      {
        path: 'login',
        name: 'login',
        component: ()=> import('../views/auth/Login.vue'),
      },
      {
        path: 'signup',
        name: 'signup',
        component: ()=> import('../views/auth/Signup.vue'),
      },
    ]
  },
  
  
  {
    path: '/client',
    name: 'client',
    component: ()=> import('../views/client/ClientHome.vue'),
    children:[
      {
        path:'chat',
        name:'chat',
        component: ()=> import('../views/client/chat/Chat.vue'),
      },
      {
        path:'document',
        name:'document',
        component: ()=> import('../views/client/documents/Documents.vue'),
      },
      {
        path:'dashboard',
        name:'clientdashboard',
        component: ()=> import('../views/client/dashboard/Dashboard.vue'),
      },
      {
        path:'searchplayground',
        name:'searchPlayground',
        component: ()=> import('../views/client/searchPlayground/Search.vue'),
      },
      {
        path:'settings',
        name:'clientsettings',
        component: ()=> import('../views/client/settings/Settings.vue'),
      },
      {
        path:'rulesManagement',
        name:'rulesManagement',
        component: ()=> import('../views/client/ruleManagement/rules.vue'),
      },
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    children:[
      {
        path:'dashboard',
        name:'dashboard',
        component: ()=> import('../views/admin/dashboard/Dashboard.vue'),
      },
    ]
  },
  // 404 Error page.
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: ()=> import('../views/notFound/NotFound.vue'),
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
