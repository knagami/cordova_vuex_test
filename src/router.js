import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Sample1 from './components/Sample1.vue'
import Sample2 from './components/Sample2.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sample1',
      name: 'sample1',
      component: Sample1
    },
    {
      path: '/sample2',
      name: 'sample2',
      component: Sample2
    },

  ]
})
