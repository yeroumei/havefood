// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'

//引入MintUI全部组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

//引入NutUI全部组件
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
NutUI.install(Vue);

import { Picker, TreeSelect, Field, Popup, Uploader, Cell, SwipeCell, 
       Button, Form, Icon, Image, ActionSheet, Step, Steps,Divider,
       Tab, Tabs, Search, Swipe, SwipeItem, Lazyload, List, PullRefresh,
       Col, Row  } from 'vant';

Vue.use(Picker)
       .use(TreeSelect)
       .use(Field)
       .use(Popup)
       .use(Uploader)
       .use(Cell)
       .use(SwipeCell)
       .use(Button)
       .use(Form)
       .use(Icon)
       .use(Image)
       .use(ActionSheet)
       .use(Step)
       .use(Steps)
       .use(Divider)
       .use(Tab)
       .use(Tabs)
       .use(Search)
       .use(Swipe)
       .use(SwipeItem)
       .use(Lazyload)
       .use(List)
       .use(PullRefresh)
       .use(Col)
       .use(Row)
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

//request拦截器
axios.interceptors.request.use(
       config => {
              if (store.state.token) {
                     config.headers.Authorization = `token ${store.state.token}`;
              }
              return config;
       },
       err => {
              return Promise.reject(err);
       }
);
//respone拦截器
axios.interceptors.response.use(
       response => {
              return response;
       },
       error => { //默认除了2XX之外的都是错误的，就会走这里
              if (error.response) {
                     switch (error.response.status) {
                            case 401:
                                   store.dispatch('UserLogout'); //可能是token失效，清楚它
                                   router.replace({ //跳转到登录页面
                                          path: '/login',
                                          query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                                   });
                     }
              }
              return Promise.reject(error.response.data);
       }
);
//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
       //获取store里面的token
       let token = store.state.token;
       //判断要去的路由有没有requiresAuth
       if (to.meta.requiresAuth) {
              if (token) {
                     next();
              } else {
                     next({
                            path: '/login',
                            query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                     });
              }
       } else {
              next();//如果无需token,那么随它去吧
       }
});
router.afterEach((to, from, next) => {  //进入个人中心页面之前刷新一下页面
       var reloaded = window.localStorage.getItem('reloaded') || '';
       if (reloaded == '') {
              if (from.path == '/login' || from.path == '/') {
                     window.location.reload();
                     window.localStorage.setItem('reloaded', 'yes');
              }
       } else {
              window.localStorage.setItem('reloaded', 'yes');
       }
})

//日期格式化
Date.prototype.format = function (format) {
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
}

/* eslint-disable no-new */
new Vue({
       el: '#app',
       router,
       store,
       components: { App },
       template: '<App/>'
})
