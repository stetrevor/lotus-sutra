import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Chapter from './views/Chapter.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/chapter/:chapter_num',
      name: 'chapter',
      component: Chapter,
    },
  ],
})
