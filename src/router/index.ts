import Login from '@/views/auth/login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CloudDiskIndex from '../views/cloud-disk/index.vue'
import DocIndex from '../views/doc/index.vue'
import HomeView from '../views/HomeView.vue'
import MoreIndex from '../views/more/index.vue'
import UserIndex from '../views/user/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/user/index',
      name: 'user-index',
      component: UserIndex,
    },
    {
      path: '/doc/index',
      name: 'doc-index',
      component: DocIndex,
    },
    {
      path: '/more/index',
      name: 'more-index',
      component: MoreIndex,
    },
    {
      path: '/cloud-disk/index',
      name: 'cloud-disk-index',
      component: CloudDiskIndex,
    },
  ],
})

router.beforeEach((to) => {
  if (to.path !== '/auth/login' && !window.isLogin) {
    router.replace({ name: 'login' })
  }
})
export default router
