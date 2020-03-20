import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let islogin = ''

try{
	// if (localStorage.taskflag)
	// 	taskflag=JSON.parse(localStorage.taskflag)
	if (sessionStorage.islogin)
        islogin=JSON.parse(sessionStorage.islogin)
}catch (e) {

}

export default new Vuex.Store({
    state: {
        // baseblock:baseblock,
        islogin:islogin
	},
    mutations: {
        getislogin(state, msg) {
            state.islogin = msg.islogin
            sessionStorage.islogin = JSON.stringify(msg.islogin)
        },
        // getblock(state,msg){
		// 	state.baseblock = msg.baseblock
      	// 	localStorage.baseblock=JSON.stringify(msg.baseblock)
		// },
    }
})