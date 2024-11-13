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
        path: 'authPage',
        name: 'authPage',
        component: ()=> import('../views/auth/AuthPage.vue'),
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
        path:'onboard-customer',
        name:'onboard-customer',
        component: ()=> import('../views/client/customerManagement/OnboardCustomer.vue'),
      },
      {
        path:'customerManagement',
        name:'customerManagement',
        component: ()=> import('../views/client/customerManagement/CustomerManagement.vue'),
      },
      {
        path:'ruleManagement',
        name:'ruleManagement',
        component: ()=> import('../views/client/ruleManagement/rules.vue'),
      },
      {
        path:'create-rule',
        name:'create-rule',
        component: ()=> import('../views/client/ruleManagement/createRules.vue'),
      },
      {
        path:'edit-rule/:ruleId',
        name:'edit-rule',
        component: ()=> import('../views/client/ruleManagement/EditRule.vue'),
      },
      {
        path:'searchConfigManagement',
        name:'searchConfigManagement',
        component: ()=> import('../views/client/searchConfigManagement/ListSearchConfig.vue'),
      },
      {
        path:'search-config/edit/:id',
        name:'editSearchConfig',
        component: ()=> import('../views/client/searchConfigManagement/AddEditSearchConfig.vue'),
      },
      {
        path:'search-config/add',
        name:'addSearchConfig',
        component: ()=> import('../views/client/searchConfigManagement/AddEditSearchConfig.vue'),
      },
      {
        path:'searchIndexManagement',
        name:'searchIndexManagement',
        component: ()=> import('../views/client/searchIndexManagement/SearchIndexList.vue'),
      },
      {
        path:'search-index/edit/:id',
        name:'editSearchIndex',
        component: ()=> import('../views/client/searchIndexManagement/EditSearchIndex.vue'),
      },
      {
        path:'search-index/add',
        name:'addSearchIndex',
        component: ()=> import('../views/client/searchIndexManagement/EditSearchIndex.vue'),
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
