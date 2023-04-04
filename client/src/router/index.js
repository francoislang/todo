import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('~/views/HomeView.vue'),
    },
    {
      path: '/home',
      component: () => import('~/views/HomeView.vue'),
    },
    {
      path: '/task/:id',
      component: () => import('~/views/TaskDetails.vue'),
    },
    {
      path: '/:catchALL(.*)',
      component: () => import('~/views/404.vue'),
    },
  ],
})

export default router
