import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// 路由规则
const routes = [
  {
    path: '/',
    name: 'chat',
    component: () => import('@/views/Chat/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound/index.vue')
  }
]

// 创建路由实例
const router = createRouter({
  // hash 模式
  history: createWebHashHistory(),
  // history 模式
  // history: createWebHistory()
  routes
})

export default router
