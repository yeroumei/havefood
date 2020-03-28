<template>
	<main>
		<!--顶部标题栏-->
		<header class="topbar">
			<i class="add icon" @click="downshow()"></i>
			<router-link to="/search" class="find">
				<img src="../../assets/images/findbtn.png"/>
				搜索你感兴趣的
			</router-link>
			<router-link  to="/login"><i class="mail icon"></i></router-link>
			<!--add的二级菜单-->
			<div class="downmenu" v-show="show">
				<span></span>
				<ul>
					<!-- <router-link  to="/addmoving"> -->
						<li @click="select = true">
							<img src="../../assets/images/picbtn.png"/>
							晒作品
						</li>
					<!-- </router-link> -->
					<router-link  to="/addrecipe">
						<li>
							<img src="../../assets/images/upbtn.png"/>
							传菜谱
						</li>
					</router-link>
					<router-link  to="/addnews">
						<li>
							<van-icon name="notes-o" size="20px" style="top:2px;padding: 0 8px;" />
							<!-- <img src="../../assets/images/upbtn.png"/> -->
							   写文章
						</li>
					</router-link>
				</ul>
			</div>
			<van-action-sheet v-model="select" :actions="actions" @select="onSelect" />
		</header>
	</main>
</template>
<script>

export default {
	data() {
		return {
			show:false,
			select:false,
			down:[
				{
					"title":"晒作品",
					"pic":"../../assets/images/picbtn.png"
				},
				{
					"title":"传菜谱",
					"pic":"../../assets/images/upbtn.png"
				}
			],
			actions:[
				{name:'图文分享',path:'/addmove_img'},
				{name:'视频食谱',path:'/addmove_mp4'},
				{name:'',path:''},

			]
		};
	},
	methods:{
		downshow(){
			this.show=!this.show
		},
		onSelect(item){
			console.log(item)
			this.$router.push({path:item.path})
			this.select = false
		}
	}
}
</script>
<style scoped>
	/*顶部标题栏*/
	.topbar{
		height: 44px;
    	width: 100%;    
    	background: #fefefe;
    	position: fixed;
   		top: 0px;
   		z-index: 1;
	}
	.icon{
		height: 44px;
	    width: 52px;
	    position: absolute;
	    display: block;
	    top: 0px;
	}
	.add{
	    left: 0px;
	    background: url(../../assets/images/addbtn.png) center no-repeat;
	    background-size: 52px 44px;
	}
	.mail{
	    right: 0px;
	    background: url(../../assets/images/mailbtn.png) center no-repeat;
	    background-size: 52px 44px;
	}
	.find{
		height: 32px;
	    line-height: 32px;
	    background: #f5f5f5;
	    color: #aaa;
	    border-radius: 2px;
	    margin: 0px 52px;
	    font-size: 14px;
	    display: block;
	    position: relative;
	    top: 6px; 
	}
	.find img{
	    height: 14px;
	    width: 14px;
	    margin: 9px 4px 0px 0px;
	}
	/*add的二级菜单*/
	.downmenu{
		position: absolute;
	    top: 44px;
	    left: 10px;
	    border-radius: 4px;
	}
	.downmenu span{
		position: absolute;
	    top: 0px;
	    left: 10px;
	    border-left: 5px solid transparent;
	    border-right: 5px solid transparent;
	    border-bottom: 7px solid #333;
	}
	.downmenu ul{
		margin-top: 7px;
	    border-radius: 4px;
	    background: #333;
	}
	.downmenu ul li{
		height: 48px;
	    line-height: 48px;
	    color: #fff;
	    font-size: 16px;
	    border-bottom: 1px solid rgba(255,255,255,0.1);
	    padding-right: 16px;
	    display: block;
	}
	.downmenu ul li img{
		height: 30px;
	    width: 30px;
	    display: block;
	    margin: 9px 4px 9px 6px;
	    display: inline-block;
	    vertical-align: top;
	}
</style>