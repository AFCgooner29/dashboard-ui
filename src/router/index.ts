import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/website/Website.vue'),
    children: [
      { 
        path: '', 
        component: () => import('../views/website/NewLandingPage.vue') 
      },
      {
        path: 'smart/search',
        name: 'search-landing',
        component: () => import('../views/website/landingPage/LandingV2.vue'),
        children: [
          {
            path: 'client',
            name: 'smart-search-client',
            component: () => import('../views/client/ClientHome.vue'),
            children: [
              { path: 'chat', name: 'smart-search-client-chat', component: () => import('../views/client/chat/Chat.vue') },
              { path: 'dashboard', name: 'smart-search-client-dashboard', component: () => import('../views/client/dashboard/Dashboard.vue') },
              { path: 'searchplayground', name: 'smart-search-client-searchPlayground', component: () => import('../views/client/searchPlayground/Search.vue') },
              { path: 'customer-form/:customerId', name: 'smart-search-client-customer-form', component: () => import('../views/client/customerManagement/CustomerForm.vue') },
              { path: 'customerManagement', name: 'smart-search-client-customerManagement', component: () => import('../views/client/customerManagement/CustomerManagementReport.vue') },
              { path: 'ruleManagement', name: 'smart-search-client-ruleManagement', component: () => import('../views/client/ruleManagement/rules.vue') },
              { path: 'rule-form/:ruleId', name: 'smart-search-client-rule-form', component: () => import('../views/client/ruleManagement/RulesForm.vue') },
              { path: 'searchConfigManagement', name: 'smart-search-client-searchConfigManagement', component: () => import('../views/client/searchConfigManagement/SearchConfigReport.vue') },
              { path: 'search-config-form/:id', name: 'smart-search-client-search-config-form', component: () => import('../views/client/searchConfigManagement/SearchConfigForm.vue') },
              { path: 'searchIndexManagement', name: 'smart-search-client-searchIndexManagement', component: () => import('../views/client/searchIndexManagement/SearchIndexReport.vue') },
              { path: 'search-index-form/:id', name: 'smart-search-client-search-index-form', component: () => import('../views/client/searchIndexManagement/SearchIndexForm.vue') },
              { path: 'subscriptionTypeManagement', name: 'smart-search-client-subscriptionTypeManagement', component: () => import('../views/client/subscriptionTypeManagement/SubscriptionTypeReport.vue') },
              { path: 'subscription-type-form/:id', name: 'smart-search-client-subscription-type-form', component: () => import('../views/client/subscriptionTypeManagement/SubscriptionTypeForm.vue') },
              { path: 'synonymManagement', name: 'smart-search-client-synonymManagement', component: () => import('../views/client/synonymManagement/SynonymReport.vue') },
              { path: 'synonym-form/:id', name: 'smart-search-client-synonym-form', component: () => import('../views/client/synonymManagement/SynonymForm.vue') },
              { path: 'data-upload', name: 'smart-search-client-data-upload', component: () => import('../views/client/dataUpload/SearchIndexDataUpload.vue') },
            ]
          },
          {
            path: 'authPage',
            name: 'smart-search-authPage',
            component: () => import('../views/auth/AuthPage.vue')
          },
          {
            path: 'documentation',
            name: 'smart-search-documentation',
            component: () => import('../views/website/landingPage/components/Documentation.vue')
          }
        ]
      },
      { 
        path: 'privacy', 
        name: 'privacy', 
        component: () => import('../views/website/PrivacyPolicy.vue') 
      }
    ]
  },
  {
    path: '/admin',
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('../views/admin/dashboard/Dashboard.vue')
      }
    ]
  },
  // 404 Error page
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/notFound/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
