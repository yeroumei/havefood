import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      components: {
          default: () =>
              import ('@/components/login')
      }
    },
    {
      path: '/cookbook/detail',
      name: 'detail',
      components: {
          content: () =>
              import ('@/components/recipe/recipepro/detail')
      },
    },
    {
      path: '/cookbook',
      name: 'cookbook',
      components: {
          content: () =>
              import ('@/components/recipe/cookbook')
      },
    },
    {
      path: '/classify',
      name: 'classify',
      components: {
          content: () =>
              import ('@/components/recipe/classify')
      }
    },
    {
      path: '/recommend',
      name: 'recommend',
      components: {
          content: () =>
              import ('@/components/recipe/recommend')
      }
    },
    {
      path: '/moving',
      name: 'moving',
      components: {
          content: () =>
              import ('@/components/discovery/moving')
      }
    },
    {
      path: '/news',
      name: 'news',
      components: {
          content: () =>
              import ('@/components/discovery/news')
      }
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      components: {
          content: () =>
              import ('@/components/user/userinfo')
      }
    },
    {
      path: '/log',
      name: 'log',
      components: {
          content: () =>
              import ('@/components/user/log')
      }
    },
    {
      path: '/about',
      name: 'about',
      components: {
          content: () =>
              import ('@/components/system/about')
      }
    },
    {
      path: '/notice',
      name: 'notice',
      components: {
          content: () =>
              import ('@/components/system/notice')
      }
    },
    
  ]
})
