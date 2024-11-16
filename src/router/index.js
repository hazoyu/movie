import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Admin from '@/views/Admin/index.vue'
import Layout from '@/views/Layout/index.vue'
import Movie from '@/views/Movie/index.vue'
import Future from '@/views/Movie/components/Future.vue'
import Hot from '@/views/Movie/components/Hot.vue'
import User from '@/views/User/index.vue'
import UserM from '@/views/UserM/index.vue'
import HotM from '@/views/MovieM/HotM.vue'
import FutureM from '@//views/MovieM/FutureM.vue'
import CinemaM from '@/views/CinemaM/index.vue'
import Register from '@/views/Register/index.vue'
import Order from '@/views/User/components/Order.vue'
import Info from '@/views/User/components/Info.vue'
import Revise from '@/views/User/components/Revise.vue'
import Buy from "@/views/Buy/index.vue"
import Detail from '@/views/Detail/index.vue'
import Review from '@/views/Review//index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login', //登录页
      component: Login
    },
    {
      path: '/register',
      name:'register',  //注册页
      component: Register
    },
    {
      path: '/home',
      component: Layout,  //首页
      children:[
        {
          path: '',
          component: Home
        },
        {
          path: '/movie',
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
          path: '/user',
          component: User,
          children:[
            {
              path: '',
              component: Order
            },
            {
              path: 'info',
              component: Info
            },
            {
              path: 'revise',
              component: Revise
            },
          ]
        },
        {
          path: '/buy/:id',
          component: Buy,
        },
        {
          path: '/selecthall/:movie_id/:cinema_id',
          component: ()=>import('@/views/Buy/SelectHall.vue'),
        },
        {
          path: '/selectseat/:movie_id/:session_id',
          component: ()=>import('@/views/Buy/SelectSeat.vue'),
        },
        {
          path: '/puy',
          component: ()=>import('@/views/Buy/Puy.vue'),
        },
        {
          path: '/success',
          component: ()=>import('@/views/Buy/Success.vue'),
        },
        {
          path: '/detail/:id',
          component: Detail,
        },
      ]
    },
    {
      path: '/admin', //管理员页
      name:'admin',
      component: Admin,
      children:[
        {
          path: '',
          name:'userm',
          component: UserM
        },
        {
          path: 'hotm',
          name:'hotm',
          component: HotM
        },
        {
          path: 'futurem',
          name:'futurem',
          component: FutureM
        },
        {
          path: 'cinemam',
          name:'cinemam',
          component: CinemaM
        },
        {
          path: 'review',
          name:'review',
          component: Review
        },
        {
          path: 'cinemaInfo',
          name:'cinemaInfo',
          component:()=>import('@/views/CinemaHall/CinemaInfo.vue'),
        },
        {
          path: 'sessionInfo',
          name:'sessionInfo',
          component:()=>import('@/views/CinemaHall/SessionInfo.vue'),
        },
      ]
    },

    
  ],
  //路由滚动行为定制 切换页面自动到顶部
  scrollBehavior(){
    return{
      top:0
    }
  }
})

export default router
