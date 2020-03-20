<template>
    <main>
		<mt-header class="t" title="登录有美食">
            <mt-button icon="back" slot="left" @click="back" class="l">返回</mt-button>
		  	<router-link to="/register" slot="right">
		  		<mt-button class="r">注册</mt-button>
	  	  	</router-link>
		</mt-header>
		<form class="loginbox"  action="#" @submit.prevent="check()">
			<input type="text" id="username" value="" placeholder="用户名" />
			<input type="password" id="password" value="" placeholder="密码" />
			<br />
			<button>登录</button>
			<p>忘记密码？</p>
		</form>
		<!-- <div class="otherbox">
			<span class="qq">QQ登录</span>
			<span class="weibo">微博登录</span>
		</div> -->
	</main>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{

        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        check(){
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            // var tips = document.getElementsByClassName('tip')
            if(username == null || username == ""){
                Toast({
                    message:'请先输入您的用户名~'
                });
                return false
            }else if(password == null || password == ""){
                Toast({
                    message:'亲，忘了输密码咯~'
                });
                return false
            }
            else{
                this.$axios.post('/login',{
                    username:username,
                    password:password
                }).then(res =>{
                    console.log(res.data)
                    if(res.data.username == username && res.data.password == password){
                        let date = new Date()
                        this.$store.commit('getislogin', {islogin: true }) 
						this.$store.commit('getuserinfo',{userinfo:res.data}) 
                        this.$router.replace({name:'my'})
                    }else{
                        Toast({
                            message:'登录失败，请再次确认用户名和密码'
                        });
                    }
                })
                return true
            }
        }
	},
	beforeDestroy(){ //进入刷新组件
		window.localStorage.removeItem('reloaded');
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
	.sign{
	    padding: 0px 16px;
	    right: 0px;
	}
	.loginbox{
		margin-top: 16px;
	}
	.loginbox input{
	    width: 100%;
		height: 44px;
	    background: #fdfdfd;
	    font-size: 16px;
	    padding: 10px 16px;
	    border: 0px;
	    box-sizing: border-box;
	    border-bottom: 1px solid #f5f5f5;
	}
	.loginbox button{
		width: 90%;
		height: 44px;
	    background: #ff5151;
	    font-size: 16px;
	    color: #fff;
	    margin-top: 16px;
	    border-radius: 2px;
	    border: 0px;
	    outline: none;
	}
	.loginbox p{
	    font-size: 14px;
		color: #999;
		line-height: 44px;
	}
	.otherbox{
	    width: 100%;
	    margin-top: 25px;
	}
	.otherbox span{
		width: 62px;
		display: inline-block;
	    margin: 0px 15px;
	    padding-top: 62px;
	    line-height: 46px;
	    font-size: 14px;
		background-size: 62px 62px;
	}
	
</style>