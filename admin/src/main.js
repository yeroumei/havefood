// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'
import store from './store'

Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(Vuex)

router.beforeEach((to, from, next) => {  //路由守卫
  var res = sessionStorage.getItem('islogin')
  if (res && res == true) {
    next()
  } else if (to.name == 'login') {
    sessionStorage.clear() //返回到登录界面，清空所有session
    next()
  } else {
    if (from.name == 'login' && res == null) {
      next({ path: '/' })
    }
    else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
