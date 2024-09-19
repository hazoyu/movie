import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Admin from '@/views/Admin/index.vue'
import Layout from '@/views/Layout/index.vue'
import Movie from '@/views/Movie/index.vue'
import Cinema from '@/views/Cinema/index.vue'
import Hot from '@/views/Movie/components/Hot.vue'
import Future from '@/views/Movie/components/Future.vue'
import UserM from '@/views/UserM/index.vue'
import MovieM from '@/views/MovieM/index.vue'
import CinemaM from '@/views/CinemaM/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      children:[
        {
          path: '',
          component: Home
        },
        {
          path: 'movie',
          component: Movie,
          children:[
            {
              path: '',
              component: Hot
            },
            {
              path: 'future',
              component: Future
            },
          ]
        },
        {
          path: 'cinema',
          component: Cinema
        },
      ]
    },
    {
      path: '/admin',
      component: Admin,
      children:[
        {
          path: '',
          component: UserM
        },
        {
          path: 'moviem',
          component: MovieM
        },
        {
          path: 'cinemam',
          component: CinemaM
        },
      ]
    },

    
  ]
})

export default router
