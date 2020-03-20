<template>
    <main>
		<mt-header class="t" title="账号管理">
            <mt-button icon="back" @click="back()" slot="left" class="l">返回</mt-button>
		  	<!-- <router-link to="/register" slot="right">
		  		<mt-button class="r">注册</mt-button>
	  	  	</router-link> -->
		</mt-header>
		<mt-cell :title="$store.state.userinfo.username"  to="/login" is-link class="new">
		  <img slot="icon" :src="$store.state.userinfo.avatar" class="avatar">
		</mt-cell>
        <!-- <router-link to="/login"> -->
			<button @click="logout" class="out">退出当前账号</button>
	  	<!-- </router-link> -->
	</main>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            // userdata:''
        }
    },
    mounted(){
        // this.getuser()
    },
    computed:{
        userinfo(){
            return this.$store.state.userinfo
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        // getuser(){
        //     // console.log(this.$store.state.islogin.username)
        //     this.$axios.get('/userList',{
        //         params:{
        //             username:this.$store.state.islogin.username
        //         }
        //     }).then(res=>{
        //         this.userdata = res.data
        //         // console.log(this.userdata)
        //     })
        // },
        logout(){ //退出账号
            // console.log(this.$store.state.userinfo.intime,'this.$store.state.userinfo.intime')
            let date = new Date()
            this.$axios.post('/addLog',{
                username: this.$store.state.userinfo.username,
                password: this.$store.state.userinfo.password,
                power: this.$store.state.userinfo.type,
                intime: this.$store.state.userinfo.intime,
                outtime: date.toLocaleString(),
                status: 0
            }).then(res=>{
                this.$router.replace({name:'login'})
                sessionStorage.clear()
            })
        }
    }
}
</script>

<style scoped>
main{
		width: 100%;
	    height: 100%;
	    background-color: #f5f5f5;
	    position: fixed;
	}
	.t{
		height: 50px;
	    background: #fdfdfd;
	    padding: 0px 16px;
	    color: #000;
	    font-size: 18px;
	}
	/* .l{
	    background: url(../assets/images/back_icon.png) left center no-repeat;
    	background-size: 19px 44px;
    	padding-left: 16px;
	} */
	.l,.r{
		color: #ff5151;
		font-size: 16px;
	}
	.new{
		min-height: 55px;
		text-align: left;
        /* overflow: hidden; */
	}
	.new span{
		font-size: 12px;
		color: #ff4c39;
	}
    .avatar{
        border-radius: 50%;
        width: 13%;
        height: auto;
        border: 0.7px solid #c8c8cd;
        margin-right: 0.5em;
    }
    .out{
        /* overflow: hidden; */
        width: 100%;
		height: 45px;
	    background: #fff;
	    font-size: 16px;
	    color: #ff4c39;
	    margin-top: 16px;
	    border-radius: 2px;
	    border: 0px;
	    outline: none;
    }
</style>