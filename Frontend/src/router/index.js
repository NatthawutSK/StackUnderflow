import { createRouter, createWebHistory } from 'vue-router'
import Swal from 'sweetalert2'
import axios from '@/plugins/axios';
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
      meta: { guess: true },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/forum/:id',
      name: 'forum',
      component: () => import('../views/ForumView.vue')
    },
    {
      path: '/profile/:id',
      name: 'about',
      meta: { login: true },
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/addforum',
      name: 'addforum',
      meta: { login: true },
      component: () => import('../views/AddForumView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { admin: true },
      component: () => import('../views/AdminView.vue')
    },
    //only for test delete later
    {
      path: '/test',
      name: 'test',
      meta: { login: true },
      component: () => import('../views/test.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const user = await axios.get('/user/me')
  // console.log(user);
  const isLoggedIn = !!document.cookie

  if(!isLoggedIn){
    console.log("555555")
    localStorage.setItem('user', JSON.stringify({}))
  }
  if (to.meta.login && !isLoggedIn) {
    const sweet = await Swal.fire({
      icon: 'error',
      title: 'Please Login First',
      confirmButtonText: 'Login'
    })
    // localStorage.setItem('user', JSON.stringify({}))
    if (sweet) {
      next({ path: '/login' })
    }
  }

  else if ((to.meta.admin && user.data.role != "admin")) {
    // console.log(user.data);
    const sour = await Swal.fire({
      icon: 'error',
      title: 'You Don\'t Have Permission To Do This Action',
      confirmButtonText: 'back'

    })
    if (sour) {
      next({ path: '/' })
    }
  }

  else if (to.meta.guess && isLoggedIn) {
    const bitter = await Swal.fire({
      icon: 'error',
      title: 'You Alreaady Login Der Ja',
      confirmButtonText: 'back'

    })
    if (bitter) {
      next({ path: '/' })
    }
  }
  else {
    next()
  }
})
export default router