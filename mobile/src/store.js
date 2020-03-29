import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let token = ''
let userinfo = ''

try{
	if (sessionStorage.token)
    token=JSON.parse(sessionStorage.token)
    if (sessionStorage.userinfo)
        userinfo=JSON.parse(sessionStorage.userinfo)
}catch (e) {

}

export default new Vuex.Store({
    state: {
        token:token,
        userinfo:userinfo
	},
    mutations: {
        gettoken(state, msg) {
            state.token = msg.token
            sessionStorage.token = JSON.stringify(msg.token)
        },
        getuserinfo(state, msg) {
            state.userinfo = msg.userinfo
            sessionStorage.userinfo = JSON.stringify(msg.userinfo)
        },
    }
})