import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'website',
    component: ()=> import('../views/website/Website.vue'),
    children:[
      { path: '', name: 'landing', component: ()=> import('../views/website/landingPage/LandingV2.vue') },
      {
        path: 'authPage',
        name: 'authPage',
        component: ()=> import('../views/auth/AuthPage.vue'),
      },
      {
        path: 'documentation',
        name: 'documentation',
        component: ()=> import('../views/website/landingPage/components/Documentation.vue'),
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: ()=> import('../views/website/PrivacyPolicy.vue'),
      }
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
        path:'customer-form/:customerId',
        name:'customer-form',
        component: ()=> import('../views/client/customerManagement/CustomerForm.vue'),
      },
      {
        path:'customerManagement',
        name:'customerManagement',
        component: ()=> import('../views/client/customerManagement/CustomerManagementReport.vue'),
      },
      {
        path:'ruleManagement',
        name:'ruleManagement',
        component: ()=> import('../views/client/ruleManagement/rules.vue'),
      },
      {
        path:'rule-form/:ruleId',
        name:'rule-form',
        component: ()=> import('../views/client/ruleManagement/RulesForm.vue'),
      },
      {
        path:'searchConfigManagement',
        name:'searchConfigManagement',
        component: ()=> import('../views/client/searchConfigManagement/SearchConfigReport.vue'),
      },
      {
        path:'search-config-form/:id',
        name:'search-config-form',
        component: ()=> import('../views/client/searchConfigManagement/SearchConfigForm.vue'),
      },
      {
        path:'searchIndexManagement',
        name:'searchIndexManagement',
        component: ()=> import('../views/client/searchIndexManagement/SearchIndexReport.vue'),
      },
      {
        path:'search-index-form/:id',
        name:'search-index-form',
        component: ()=> import('../views/client/searchIndexManagement/SearchIndexForm.vue'),
      },
      {
        path:'subscriptionTypeManagement',
        name:'subscriptionTypeManagement',
        component: ()=> import('../views/client/subscriptionTypeManagement/SubscriptionTypeReport.vue'),
      },
      {
        path:'subscription-type-form/:id',
        name:'subscription-type-form',
        component: ()=> import('../views/client/subscriptionTypeManagement/SubscriptionTypeForm.vue'),
      },
      {
        path:'synonymManagement',
        name:'synonymManagement',
        component: ()=> import('../views/client/synonymManagement/SynonymReport.vue'),
      },
      {
        path:'synonym-form/:id',
        name:'synonym-form',
        component: ()=> import('../views/client/synonymManagement/SynonymForm.vue'),
      },
      {
        path:'data-upload',
        name:'data-upload',
        component: ()=> import('../views/client/dataUpload/SearchIndexDataUpload.vue'),
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
