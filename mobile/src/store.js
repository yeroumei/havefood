import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let islogin = ''
let userinfo = ''

try{
	if (sessionStorage.islogin)
        islogin=JSON.parse(sessionStorage.islogin)
    if (sessionStorage.userinfo)
        userinfo=JSON.parse(sessionStorage.userinfo)
}catch (e) {

}

export default new Vuex.Store({
    state: {
        islogin:islogin,
        userinfo:userinfo
	},
    mutations: {
        getislogin(state, msg) {
            state.islogin = msg.islogin
            sessionStorage.islogin = JSON.stringify(msg.islogin)
        },
        getuserinfo(state, msg) {
            state.userinfo = msg.userinfo
            sessionStorage.userinfo = JSON.stringify(msg.userinfo)
        },
    }
})