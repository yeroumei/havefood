<template>
	<main>
		<!--顶部标题栏-->
		<header class="topbar">
			<i class="add icon" @click="downshow()"></i>
			<h1  class="find">有美食</h1>
			<!-- <router-link to="/search" class="find">
				<img src="../../assets/images/findbtn.png"/>
				搜索你感兴趣的
			</router-link> -->
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
		<!--导航轮播-->
		<nav class="nav">
		    <div class="navbar">
		    	<h2>今日</h2>
		    	<ul class="btn_list">
				  	<li class="t t1" v-for="(item,index) in navs">{{item.title}}</li>
			  	</ul>
		    </div>
		    <section class="con">
		    	<swiper :options="swiperOption" id="eat_data">
			        <swiper-slide v-for="(item,index) in listdata" class="lists" style="height:20em">
			        	<router-link :to=" {name:'recipedetail', params: {id:item._id}}">
							<p style="height:70%;position:relative"> 
								<van-image
									v-if="item.style == 'image'"
									width="100%"
									height="100%"
									fit="cover"
									:src="item.cover_pic"
								/>
								<van-image
									v-else
									width="100%"
									height="100%"
									fit="cover"
									:src="item.step[item.step.length-1].img"
								/>
								<van-icon v-if="item.style == 'video'" color="rgba(0,0,0,0.6)" name="play-circle" size="28px" style="position:absolute;top:10px;right:10px" />
								<!--<van-icon v-if="item.style == 'video'" color="#ff5151" name="play-circle-o" size="22px" style="position:absolute;bottom:10px;right:10px" />
								 <img v-if="item.style == 'image'" :src="item.cover_pic" class="simg"/> 
								<img v-else :src="item.step[item.step.length-1].img" class="simg"/>-->
							</p>
				       		<p style="height:10%" class="title" >{{item.title}}</p>
				       		<p style="height:10%" class="text"><a class="text_a">{{item.des}}</a></p>
			        	</router-link>
			        </swiper-slide>
			        <div class="swiper-pagination" slot="pagination"></div>
			    </swiper>
		    </section>
		</nav>
		<!--推荐页面内容-->
		<div class="content">
			<!--图标菜单栏-->
			<!-- <div class="menu">
				<ul v-for="(m,i) in site" >
					<router-link :to="m.adr">
						<li class="menu_list" :style="{'background': 'url('+m.pic+') center top no-repeat','background-size': '100% auto'}">
							{{m.title}}
						</li>
	        		</router-link>
				</ul>
			</div> -->

			<div class="menu">
				<ul>
					<router-link to="/classify">
						<li class="menu_list" id="clsbtn1">
							食谱分类
						</li>
	        		</router-link>
					<router-link to="/videorecipe">
						<li class="menu_list" id="clsbtn2">
							视频食谱
						</li>
	        		</router-link>
					<router-link to="/my">
						<li class="menu_list" id="clsbtn3">
							早餐
						</li>
	        		</router-link>
					<router-link to="/my">
						<li class="menu_list" id="clsbtn4">
							文章资讯
						</li>
	        		</router-link>
				</ul>
			</div>

			<h2 class="title1">今日推荐</h2>
			<van-swipe :autoplay="3000" style="height: 154px;" vertical>
				<van-swipe-item v-for="(item, index) in daydata">
					<router-link :to=" {name:'newsdetail', params: {id:item._id}}">
						<img v-lazy="item.cover_pic" width="100%" />
						<!-- <img v-if="item.step && item.style == 'video'" v-lazy="item.step[item.step.length-1].img" width="100%" /> -->
					</router-link>
				</van-swipe-item>
			</van-swipe>
			
			<div class="like">
				<div class="title2">
					<img src="../../assets/images/likelogo.png"/>
					<div class="like_title">
						<span class="like_t">猜你喜欢</span>
						<br />
						<span class="like_s"> 更新  {{refresh}} </span>
					</div>
				</div>
				<ul>
					<li class="like_list" v-for="(item,index) in likedata">
						<!-- <img :src="item.cover_pic"/> -->
						<van-image
							v-if="item.style == 'image'"
							width="100%"
							height="100%"
							fit="cover"
							:src="item.cover_pic"
						/>
						<van-image
							v-else
							width="100%"
							height="100%"
							fit="cover"
							:src="item.step[item.step.length-1].img"
						/>
						<van-icon v-if="item.style == 'video'" color="rgba(0,0,0,0.6)" name="play-circle" size="28px" style="position:absolute;top:10px;right:10px" />
						<span>{{item.title}}</span>
					</li>
				</ul>
			</div>
		</div>
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

			],
			navs:[
				{
					"title":"早餐"
				},
				{
					"title":"午餐"
				},
				{
					"title":"下午茶"
				},
				{
					"title":"晚饭"
				},
				{
					"title":"夜宵"
				}
			],
			site:[
				{	
					"adr":"/classify",
					"title":"菜谱分类",
					"pic":"../../assets/images/site1.png"
				},
				{	
					"adr":"/video",
					"title":"视频菜谱",
					"pic":"../../assets/images/site2.png"
				},
				{	
					"adr":"/eatingwords",
					"title":"早餐",
					"pic":"../../assets/images/site3.png"
				},
				{	
					"adr":"/video",
					"title":"附近",
					"pic":"../../assets/images/site4.png"
				}
			],
			listdata:[],
			daydata:[],
			likedata:[],
			record:[],
			refresh:'',
			swiperOption:{
				slidesPerView: 2,
				spaceBetween: 0,
				slidesPerGroup: 2,
				loop:true,
				loopFillGroupWithBlank: true,
				pagination: {
				el: '.swiper-pagination',
				clickable: true
				}
			},
		};
	},
	mounted() {
		this.getData() //每日三餐
		this.getDay()  // 今日推荐

	},
	methods:{
		downshow(){
			this.show=!this.show
		},
		onSelect(item){
			console.log(item)
			this.$router.push({path:item.path})
			this.select = false
		},
		tabtn(index){
			this.record = this.listdata[index]
			console.log(index,this.record,'jjjjj')
			this.$router.push({path:'/my'})
		},
		rand(arr,ranNum){ //分别随机抽取2推荐的每日三餐，避免抽取重复
			// var ranNum = 2;
			var hash = {};
			var result = [];
			while(ranNum > 0) {
				var ran = Math.floor(Math.random() * arr.length);
				if (!hash[ran]) {
					hash[ran] = 1;
					result.push(arr[ran]);
					ranNum--;
				};
			}
			return result
		},
		getData(){
			this.likedata = []
			this.$axios.get('/recipeList').then(res=>{
				// console.log(res.data)
				let breakfast = []
				let lunch = []
				let dinner = []
				let afternoon_tea = []
				let supper = []
				for(let i=0;i<res.data.length;i++){
					if(res.data[i].type[0] == '每日三餐'){
						switch(res.data[i].type[1]){
							case '早餐':
								breakfast.push(res.data[i]);
								break;
							case '午餐':
								lunch.push(res.data[i]);
								break;
							case '下午茶':
								afternoon_tea.push(res.data[i]);
								break;
							case '晚餐':
								dinner.push(res.data[i]);
								break;
							case '夜宵':
								supper.push(res.data[i]);
								break;
						}
					}
				}
				this.listdata = this.listdata.concat(this.rand(breakfast,2)).concat(this.rand(lunch,2)).concat(this.rand(afternoon_tea,2)).concat(this.rand(dinner,2)).concat(this.rand(supper,2))
				// console.log(this.listdata)
				this.likedata = this.rand(res.data,10)
				console.log(this.likedata)
				this.refresh = (new Date()).toLocaleTimeString()
			})
		},
		getDay(){
			this.$axios.get('/newsList').then(res=>{
				console.log(res.data,'新闻')
				this.daydata = res.data
			})
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
	/*轮播导航*/
	li{
		display: inline-block;
	}
	.nav{
		padding-top:44px;
	}
	.navbar{
		display: block;
	    padding: 20px 0px 20px;
	    position: relative;
	    height: 22px;
	    width: 100%;
	    text-align: left;
	}
	.navbar h2{
	    line-height: 22px;
	    font-size: 20px;
	    display: inline-block;
	    margin-left: 15px;
	    font-weight: 900;
	}
	.btn_list{
		height: 22px;
		line-height: 24px;
	    display: inline-block;
	    position: absolute;
	    left: 65px;
	    width: 265px;
	}
	.t{
		font-size: 14px;
	    font-weight: 400;
	    color: #666;
	    line-height: 22px;
	    margin-right: 16px;
	}
	/*轮播*/
	.con{
		position: relative;
	}
	.swiper-container{
	    margin: 0px 2.666666vw;
	    text-align: left;    
	    z-index: 0;
	    position:static;
	    overflow: auto;
	    overflow-x: hidden;
	}
	.swiper-slide{
		box-sizing: border-box;
    	padding: 0px 1.233333vw;
	}
	.simg{
		width: 100%;
		border-radius: 7px;
	    box-shadow: 0 3px 6px rgba(0,0,0,0.1);
	    background-color: #f8f8f8;
	}
	.title{
		font-size: 18px;
		line-height: 28px;
	    font-weight: 600;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    padding: 12px 0px 2px;
	}
	.text{
		width: 100%;
		font-size: 14px;
	   	overflow: hidden;    
		text-overflow: ellipsis; 
		white-space: nowrap; 
	}
	.text_a{
	    background: #fde8e6;
	}
	.swiper-container-horizontal > .swiper-pagination-bullets{
		bottom: auto;
		top: -40px;
		left: -15px;
	}
	/*图标菜单栏*/
	.content{
		width: 93.75%;
	    margin: 0px auto;
	    padding-top: 24px;
		padding-bottom: 50px;
	    position: relative;
	}
	.menu_list{
	    vertical-align: top;
	    padding-top: 19%;
	    width: 19%;
	    margin: 0px 3%;
	    line-height: 32px;
	    font-size: 12px;
	    color: #333;
	    float: left;
	}
	#clsbtn1{
		background: url(../../assets/images/site1.png) center top no-repeat;
		background-size: 100% auto;
	}
	#clsbtn2{
		background: url(../../assets/images/site2.png) center top no-repeat;
		background-size: 100% auto;
	}
	#clsbtn3{
		background: url(../../assets/images/site3.png) center top no-repeat;
		background-size: 100% auto;
	}
	#clsbtn4{
		background: url(../../assets/images/exercise1.png) center top no-repeat;
		background-size: 100% auto;
	}
	/*今日推荐*/
	.title1{
		font-size: 18px;
	    line-height: 40px;
	    padding-top: 14px;
	    clear: both;/*清除li浮动的影响*/
	}
	.day img{
		width: 100%;
		margin-bottom: 3%;
	}
	/*猜你喜欢*/
	.like{
	    margin-bottom: 52px;
	}
	.title2{
		padding: 24px 0px 14px;
	}
	.title2 img{
		height: 30px;
	    width: 30px;
		display: inline-block;
	    vertical-align: top;
	}
	.like_title{
		display: inline-block;
	    vertical-align: top;
	    height: 30px;
	    padding-left: 4px;
	    text-align: left;
	}
	.like_t {
		font-size: 18px;
		line-height: 20px;
	    margin-top: -1px;
	}
	.like_s{
		font-size: 10px;
		line-height: 12px;
	    color: #999;
	}
	.like_list{
		width: 49%;
		height: 11em;
		margin-bottom: 2%;
		position: relative;
	}
	/* .like_list img{
		width: 100%;
	} */
	.like_list span{
	    width: 100%;
		height: 32px;
	    display: block;
	    position: absolute;
	    bottom: 0px;
	    left: 0px;
	    font-size: 14px;
	    color: #fff;
	    text-shadow: 0px 1px 0px rgba(0,0,0,0.7);
	    overflow: hidden;    
	    text-overflow: ellipsis;
	    white-space: nowrap;
		background: url(../../assets/images/bg.png) center no-repeat;
	    background-size: 100% auto;
	}
	
</style>
<style>
	.swiper-pagination-bullet {
	    width: 38px;
	    height: 21px;
	    display: inline-block;
	    border-radius: 0;
	    background: none;
	    opacity: 0;
	    outline: none;
	}
	.swiper-pagination-clickable .swiper-pagination-bullet {
	    cursor: none;
	}
	.swiper-wrapper{
		z-index: 0;
	}
</style>