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
      meta:{guess:true},
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
      meta:{login:true},
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/addforum',
      name: 'addforum',
      meta:{login:true},
      component: () => import('../views/AddForumView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta:{admin:true},
      component: () => import('../views/AdminView.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  if (to.meta.login && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/login' })
  }

  if (to.meta.admin && isLoggedIn) {
    alert("You're not admin")
    next({ path: '/'})
  }
  
  if (to.meta.guess && isLoggedIn) {
    alert("You're already login")
    next({ path: '/'})
  }
  
  next()
})
export default router
