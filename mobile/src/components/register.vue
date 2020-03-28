<template>
  <main>
    <mt-header class="t" title="注册有美食">
        <mt-button icon="back" slot="left" @click="back" class="l">返回</mt-button>
		  	<router-link to="/login" slot="right">
		  		<mt-button class="r">注册</mt-button>
	  	  </router-link>
		</mt-header>
    <form class="loginbox"  action="#" @submit.prevent="check()">
			<input type="text" id="username" value="" placeholder="用户名" />
			<input type="password" id="password" value="" placeholder="密码" />
			<input type="password" id="ispassword" value="" placeholder="确认密码" />
			<br />
			<button>注册</button>
			<p>忘记密码？</p>
		</form>
  </main>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    check(){
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      var ispassword = document.getElementById('ispassword').value;
      var pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/
      // var tips = document.getElementsByClassName('tip')
      if(username == null || username == ""){
          Toast({
              message:'请先输入您的用户名~',
              position: 'bottom'
          });
          return false
      }else if(password == null || password == ""){
          Toast({
              message:'亲，忘了输密码咯~',
              position: 'bottom'
          });
          return false
      }else if(!pwd.test(password)){
        Toast({
              message:'密码必须包含大小写字母和数字的组合，长度在6-10之间~',
              position: 'bottom'
          });
          return false
      }else if(ispassword !== password){
        Toast({
              message:'亲，密码两次输入不一致喔~',
              position: 'bottom'
          });
          return false
      }
      else{
          this.$axios.post('/register',{
              username:username,
              password:password,
              number:number,
              type: 'normal',
          }).then(res =>{
              console.log(res.data)
              if(res.data.flag == 1){
                Toast({
                    message:res.data.des,
                    position: 'bottom'
                });
              }else{
                Toast({
                    message:res.data.des,
                    position: 'bottom'
                });
                this.$router.replace({name:'login'})
              }
              
          })
          return true
      }
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