import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/forum/:id',
      name: 'forum',
      component: () => import('../views/ForumView.vue')
    },
    {
      path: '/profile',
      name: 'about',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/addforum',
      name: 'addforum',
      component: () => import('../views/AddForumView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    }
  ]
})

export default router
