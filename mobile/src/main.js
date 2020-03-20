// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'

//引入MintUI全部组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

//引入swiper轮播插件
import Swiper from 'swiper';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);

//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios;

//解决跨域问题
axios.defaults.baseURL = '/api'
import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store'

Vue.config.productionTip = false
router.afterEach((to,from,next) => {  //进入个人中心页面之前刷新一下页面
  var reloaded = window.localStorage.getItem('reloaded') || '';
  if (reloaded == '') {
      if (from.path == '/login' || from.path == '/') {
          window.location.reload();
          window.localStorage.setItem('reloaded','yes');
      }
  } else {
    window.localStorage.setItem('reloaded','yes');
    
  }
  })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
