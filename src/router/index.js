import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Lobby from '../views/Lobby.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name) {
        next()
      } else {
        next('/')
        localstorage.clear()
      }
    }
  },
  {
    path: '/rooms',
    name: 'rooms',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "rooms" */ '../views/RoomList.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name) {
        next()
      } else {
        next('/')
        localstorage.clear()
      }
    }
  },
  {
    path: '/game-start/:id',
    name: 'Game',
    component: Game,
    beforeEnter: (to, from, next) => {
      if (from.name) {
        next()
      } else {
        next('/')
        localstorage.clear()
      }
    }
  },
  {
    path: '/scores/:id',
    name: 'Scores',
    component: () => import( /* webpackChunkName: "scores" */ '../views/Scores.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name) {
        next()
      } else {
        next('/')
        localstorage.clear()
      }
    }
  },
  {
    path: '/rooms/:id',
    name: 'Lobby',
    component: Lobby,
    beforeEnter: (to, from, next) => {
      if (from.name) {
        next()
      } else {
        next('/')
        localstorage.clear()
      }
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router