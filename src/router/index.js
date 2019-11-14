import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Scores from '../views/Scores.vue'
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
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/rooms',
    name: 'rooms',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "rooms" */ '../views/RoomList.vue')
  },
  {
    path: '/game-start/:id',
    name: 'Game',
    component: Game
  },
  {
    path: '/scores',
    name: 'Scores',
    component: Scores
  },
  {
    path: '/rooms/:id',
    name: 'Lobby',
    component: Lobby
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router