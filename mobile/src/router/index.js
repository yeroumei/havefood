import Vue from 'vue'
import Router from 'vue-router'
// import helloWorld from '@/components/HelloWorld'
import firstbar from '../components/index/firstbar.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'
import logout from '../components/logout.vue'
import edit_info from '../components/user/edit_info.vue'
import classify from '../components/recipe/classify.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
			path:'/',
      name: 'firstbar',
      component: firstbar,
			redirect:'/recommend',
			children:[
				{
          path: '/recommend',
          name: 'recommend',
					components: {
            content: () =>
                  import ('@/components/index/recommend')
          }
				},
				{
          path: '/my',
          name: 'my',
					components: {
            content: () =>
                  import ('@/components/index/my')
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
      component:  register
    },
    {
      path: '/edit_info',
      name: 'edit_info',
      component:  edit_info
    },
    {
      path: '/classify',
      name: 'classify',
      component:  classify
    },
  ]
})
