<template>
	<main>
		<header class="top">
			<div class="bar">
				
				<div class="user" v-if="$store.state.userinfo.username">
					<!-- <nut-avatar 
						@activeAvatar="activeAvatar"
						bgIcon=""
						:bgImage="$store.state.userinfo.avatar"
						class="userpic"
						> -->
						<nut-uploader
							name="file"
							url="/api/upload"
							@success="onSuccess"
							@fail="onFail"
							@showMsg="showMsgFn"
							class="userpic" 
						>
						<img width="100%" height="100%" style="border-radius:100%" :src="$store.state.userinfo.avatar"/>
						</nut-uploader>   
					<!-- </nut-avatar> -->
					<router-link to="/edit_info">
						<h2 class="tologin">{{$store.state.userinfo.username}}</h2>
						<span class="des">正在通往美食达人的路上..</span>
					</router-link>
				</div>
				<div class="user" v-else>
					<nut-avatar 
						@activeAvatar="activeAvatar"
						 class="userpic"
						 bgColor="none"
						>
						<nut-uploader
							name="file"
							url="/api/upload"
							@success="onSuccess"
							@fail="onFail"
							@showMsg="showMsgFn"
						></nut-uploader>   
					</nut-avatar>
					<router-link to="/login" >
						<h2 class="tologin">点击登录</h2>
						<span class="des">有美食，带你发现更多美食..</span>
					</router-link>
				</div>
				    <span class="tips" @click="account"> 账号管理 > </span>
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
			}
		},
		mounted(){
			console.log(this.$store.state.userinfo.number,'this.$store.state.userinfo.number ')
			if(this.$store.state.userinfo.number == ''){
				MessageBox.confirm('请先完善个人重要信息').then(action => {
					this.$router.push({name:'edit_info'})
				},cancel =>{
					console.log(cancel,'取消')
				});
			}
        },
        computed:{
            userinfo(){
                return this.$store.state.userinfo
            }
        },
		methods:{
            account(){
                if(!this.$store.state.islogin){
                    MessageBox.alert('请先登录', '提示');
                }else{
                    this.$router.push({name:'logout'})
                }
			},
			activeAvatar(){
				console.log('更换头像')

			},
			onSuccess(file,res){
				console.log(JSON.parse(res),'file,res')
				this.$axios.post('/updateUser',{
					oldname:this.$store.state.userinfo.username,
					username:this.$store.state.userinfo.username,
					avatar:JSON.parse(res).result.url
				}).then(res =>{
					if(res.data.flag == 1){
						this.$toast.fail('上传失败');
					}else{
						this.$axios.get('/userList',{ //更新登录数据
							params:{
								username:this.$store.state.userinfo.username
							}
						}).then(res=>{
							console.log(res.data)
							this.$store.commit('getuserinfo',{userinfo:res.data}) 
						})
						this.$toast.success('修改成功');
					}
					
				})
			},
			onFail(file,res){
				this.$toast.fail('上传失败！');
			},
			showMsgFn(msg){
				this.$toast.text(msg);
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
		display: inline-block;
		width: 5em;
		height: 5em;
		border: 2px solid rgba(255,255,255,0.5);
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
