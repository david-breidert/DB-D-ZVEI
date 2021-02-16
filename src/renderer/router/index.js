import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/renderer/views/Dashboard'
import Settings from '@/renderer/views/Einsatzmittel'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/einsatzmittel',
    name: 'einsatzmittel',
    component: Settings
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ '../views/Einsatzmittel.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
