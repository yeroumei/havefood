<template>
	<main>
      	<router-view name="content"></router-view>
		  <!-- <router-view></router-view> -->
      	<ul class="navlist">
      		<!-- <li class="btns" v-for="(item,index) in list">
        		<router-link :to="item.adr">
        			<img :src="item.pics" class="act"/>
        			<img :src="item.pic"/>
        			{{item.word}}
        		</router-link>
        	</li> -->
            <li class="btns">
        		<router-link to="/recommend">
        			<img src="../../assets/images/btn1.png" class="act"/>
        			<img src="../../assets/images/btn11.png"/>
        			推荐
        		</router-link>
        	</li>
            <li class="btns">
        		<router-link to="/find">
        			<img src="../../assets/images/btn2.png" class="act"/>
        			<img src="../../assets/images/btn22.png"/>
        			发现
        		</router-link>
        	</li>
            <li class="btns">
        		<router-link to="/move">
        			<img src="../../assets/images/btn3.png" class="act"/>
        			<img src="../../assets/images/btn33.png"/>
        			食趣
        		</router-link>
        	</li>
            <li class="btns">
        		<router-link to="/my">
        			<img src="../../assets/images/btn4.png" class="act"/>
        			<img src="../../assets/images/btn44.png"/>
        			我的
        		</router-link>
        	</li>
      	</ul>
	</main>
</template>
<script>
	export default{
        
		data(){
			return{
				// list:[
                //     {	
                //         adr:"/recommend",
                //         pic:"../../assets/images/btn11.png",
                //         pics:"../../assets/images/btn1.png",
                //         word:"推荐"
                //     },
                //     {
                //         adr:"/discover",
                //         pic:"../../assets/images/btn22.png",
                //         pics:"../../assets/images/btn2.png",
                //         word:"发现"
                //     },
                //     {
                //         adr:"/eatingwords",
                //         pic:"../../assets/images/btn33.png",
                //         pics:"../../assets/images/btn3.png",
                //         word:"食话"
                //     },
                //     {
                //         adr:"/my",
                //         pic:"../../assets/images/btn44.png",
                //         pics:"../../assets/images/btn4.png",
                //         word:"我的"
                //     }
                // ],
			}
		},
		mounted(){
			// this.$http.get('./data/my_data.json')
			// .then((res)=>{
			// 	this.list=res.data.list
			// })
			// .catch(()=>{
				
			// })
			// .finally(()=>{
				
			// })
		},
		methods:{
			
		},
	}
	
</script>
<style type="text/css">
	.navlist{
		position: fixed;
		width: 100%;
		height: 51px;
		bottom: 0;
		margin: 0 auto;
		background: #fefefe;
	    position: fixed;
	    z-index: 1;
	    border-top: 1px solid #eee;
	}
	.btns{
		float: left;
		width: 25%;
	}
	.btns a{
		font-size: 10px;
	    color: #868686;
	    line-height: 14px;
	}
	.btns img{
	    display: block;
	    margin: 3px auto 0px;
	    height: 30px;
	    width: 30px;
	}
	.router-link-exact-active{
		color: #ff4c39 !important;
	}
	.btns .act{
		display: none;
	}
	.btns .router-link-active .act{
		display:block;
	}
	.btns .router-link-active img{
		display: none;
	}
</style>