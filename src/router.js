import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Practices from './views/Practices.vue'
import PracticesEmbed from './views/PracticesEmbed.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/remixer',
      component: () => import(/* webpackChunkName: "extras" */ './views/AFA.vue')
    },
    {
      path: '/kudos-and-credits',
      component: () => import(/* webpackChunkName: "extras" */ './views/APKudos.vue')
    },
    {
      path: '/practices/:pid',
      component: Practices
    },
    {
      path: '/practices-embed/:pid',
      component: PracticesEmbed
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
