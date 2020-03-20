<template>
	<main>
		<header class="top">
			<div class="bar">
				
				<div class="user" v-if="$store.state.userinfo.username">
					<img class="userpic" :src="$store.state.userinfo.avatar"/>
					<router-link to="/edit_info">
						<h2 class="tologin">{{$store.state.userinfo.username}}</h2>
						<span class="des">正在通往美食达人的路上..</span>
					</router-link>
				</div>
				<div class="user" v-else>
					<img class="userpic" src="../../assets/images/userpic.png"/>
					<router-link to="/login" >
						<h2 class="tologin">点击登录</h2>
						<span class="des">有美食，带你发现更多美食..</span>
					</router-link>
				</div>
				<!-- <router-link to="/logout"  v-if="$store.state.userinfo.username"> -->
				    <span class="tips" @click="account"> 账号管理 > </span>
				<!-- </router-link> -->
			</div>
		</header>
		<ul style="overflow: hidden;">
			<li class="nav_li">
				<a href="#">关注 <span>{{$store.state.userinfo.myloves ? $store.state.userinfo.myloves.length : ''}}</span> </a>
			</li>
			<li class="nav_li">
				<a href="#">粉丝 <span>{{$store.state.userinfo.myfans ? $store.state.userinfo.myfans.length : ''}}</span> </a>
			</li>
			<li class="nav_li">
				<a style="border-right: 0;"><span>0</span> 菜谱</a>
			</li>
		</ul>
		<mt-cell title="消息通知"  to="/login" is-link style="overflow: hidden;" class="new">
		  <img slot="icon" src="../../assets/images/news.png" width="27" height="27">
		</mt-cell>
		
		<mt-cell title="我的发布"  to="/login" is-link style="overflow: hidden;">
		  <img slot="icon" src="../../assets/images/send.png" width="27" height="27">
		</mt-cell>
		<mt-cell title="我的收藏"  to="/login" is-link style="overflow: hidden;">
		  <img slot="icon" src="../../assets/images/love.png" width="27" height="27">
		</mt-cell>
		<mt-cell title="关于我们"  to="/login" is-link style="overflow: hidden;">
		  <img slot="icon" src="../../assets/images/us.png" width="27" height="27">
		</mt-cell>
		<!-- <Edit  :record="userdata"></Edit> -->
	</main>
</template>

<script >
import { MessageBox } from 'mint-ui';
// import Edit from '../user/edit_info'
	export default{
  		// components: { Edit },
		data(){
			return{
                medal:[],
                // userdata:'',
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
			// getuser(){
            //     console.log(this.$store.state.islogin.username)
            //     this.$axios.get('/userList',{
            //         params:{
            //             username:this.$store.state.islogin.username
            //         }
            //     }).then(res=>{
            //         this.userdata = res.data
            //         console.log(this.userdata)
            //     })
            // },
            account(){
                if(!this.$store.state.islogin){
                    MessageBox.alert('请先登录', '提示');
                }else{
                    this.$router.push({name:'logout'})
                }
			},
			
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
	.top{
		width: 100%;
		padding-bottom: 40%;
		background: url(../../assets/images/mybg.png);
		background-size: 100%;
		position: relative;
	}
	.bar{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.user{
		width: 80%;
		margin: 5% auto 0px;
		text-align: left;
	    display: block;
	    position: relative;
	}
	.userpic{
		display: block;
		width: 25%;
		border: 3px solid rgba(255,255,255,0.5);
		border-radius: 50%;
		position: absolute;
		left: -15px;
		top: 18px;
	}
	.tologin{
		font-size: 18px;
		color: #fff;
		padding: 5% 0 0 27%;
	}
	.des{
		display: inline-block;
		color: #fff;
		text-align: left;
		padding-left: 27%;
		font-size: 14px;
		line-height: 28px;
	}
	/* .des:after{ */
	.tips{
		/* content: '有美食DNA 0条>'; */
		height: 24px;
	    line-height: 22px;
	    border-radius: 16px;
	    color: #fff;
	    font-size: 12px;
	    border: 1px solid rgba(255,255,255,0.5);
	    background: rgba(255,255,255,0.2);
	    box-sizing: border-box;
	    display: inline-block;
	    padding: 0px 18px;
	    position: absolute;
	    left: 30%;
	    bottom: 20%;
	}
	.nav_li{
		width: 33.333333%;
		float: left;
		background: #fefefe;    
		margin-bottom: 10px;
	}
	.nav_li>a{
		display: inline-block;
		width: 100%;
	    vertical-align: top;
	    border-right: 1px solid #eee;
	    height: 24px;
	    line-height: 24px;
	    margin: 10px 0px;
	    font-size: 14px;
	    color: #999;
	    box-sizing: border-box;
	}
	.nav_li span{
		color: #ff4c35;
	}
	/*勋章*/
	/* .xunzbox{
		background: #fefefe;    
		width: 100%;
		overflow: hidden;
		text-align: left;
		margin-bottom: 10px;
	} */
	/* .xunzbox>h2{
		font-size: 16px;
		padding-top: 6px;
		padding-left: 3.125%;
		line-height: 32px;
	} */
	/* .xunz_ul{
		width: 100%;
		display: inline-block;
		padding: 0 3.125%;
		padding-bottom: 14px;

	}
	.xunz_li{
		float: left;
		height: 32px;
    	width: 38px;
    	margin-right: 12px;
	}
	.xunz_li img{
		width: 100%;
	} */
	.mint-cell{
		min-height: 45px;
		text-align: left;
	}
	.mint-cell-value span{
		font-size: 12px;
		color: #FF4C35;
	}
	.new{
		margin: 10px 0;
	}
</style>
