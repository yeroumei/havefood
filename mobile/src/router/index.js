import Vue from 'vue'
import Router from 'vue-router'
// import helloWorld from '@/components/HelloWorld'
import firstbar from '../components/index/firstbar.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'
import logout from '../components/logout.vue'
import edit_info from '../components/user/edit_info.vue'
import classify from '../components/recipe/classify.vue'
import addrecipe from '../components/recipe/addrecipe.vue'
import search from '../components/recipe/search.vue'
import addmove_img from '../components/discovery/addmove_img.vue'
import addmove_mp4 from '../components/discovery/addmove_mp4.vue'
import addnews from '../components/discovery/addnews.vue'
import pre_news from '../components/discovery/discory_pro/pre_news.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'firstbar',
      component: firstbar,
      redirect: '/recommend',
      children: [
        {
          path: '/recommend',
          name: 'recommend',
          components: {
            content: () =>
              import('@/components/index/recommend')
          }
        },
        {
          path: '/my',
          name: 'my',
          components: {
            content: () =>
              import('@/components/index/my')
          }
        },
      ]
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/edit_info',
      name: 'edit_info',
      component: edit_info,
      // * 需要登录才能访问
      meta: { requiresAuth: true },
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify
    },
    {
      path: '/addrecipe',
      name: 'addrecipe',
      component: addrecipe,
      // * 需要登录才能访问
      meta: { requiresAuth: true },
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/addmove_img',
      name: 'addmove_img',
      component: addmove_img,
      // * 需要登录才能访问
      meta: { requiresAuth: true },
    },
    {
      path: '/addmove_mp4',
      name: 'addmove_mp4',
      component: addmove_mp4,
      // * 需要登录才能访问
      meta: { requiresAuth: true },
    },
    {
      path: '/addnews',
      name: 'addnews',
      component: addnews,
      // * 需要登录才能访问
      meta: { requiresAuth: true },
    },
    {
      path: '/pre_news',
      name: 'pre_news',
      component: pre_news,
      // * 需要登录才能访问
      meta: { requiresAuth: true },
    }
  ]
})
