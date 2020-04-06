<template>
  <main>
        <!--头部导航条-->
		<mt-header class="t" title="菜谱视频大全">
		  	<router-link to="/" slot="left">
		    	<mt-button class="l">主页</mt-button>
		  	</router-link>
			<router-link to="/search"  slot="right">
		  		<mt-button class="r"></mt-button>
		  	</router-link>
		</mt-header>
        <!--页面内容-->
		<section>
			<ul class="content">
				<li class="lists" v-for="(item,index) in videodata">
					<p class="lists_l">
                        <van-image
                            class="lists_img"
							width="100%"
							height="100%"
							fit="cover"
							:src="item.step[item.step.length-1].img"
						/>
						<!-- <img class="lists_img" :src="item.step[item.step.length-1].img"/> -->
						<!-- <span class="lists_t">{{item.time}}</span> -->
					</p>
					<p class="lists_p">{{item.title}}</p>
                    
					<span class="lists_s">{{item.time}}</span>
                        <van-icon size="20px" name="eye-o" style="position: absolute;bottom:14px;right:65px;" />
                        <span style="position: absolute;bottom:17px;right:6px;font-size:12px">
                            浏览 12 次
                        </span>
                        <nut-avatar
                            style="position: absolute;bottom:14px;right:165px;" 
                            size="small"
                            bg-icon
                            :bg-image="item.avatar"
                        >
                        </nut-avatar>
                        <span  style="position: absolute;bottom:17px;right:128px;font-size:14px" >{{item.author}}</span>
				</li>
			</ul>
		</section>
  </main>
</template>

<script>
export default {
    data() {
        return {
            videodata:[]
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData(){
            this.videodata = []
            var arr = []
            this.$axios.get('/recipeList').then(res=>{
                arr = res.data
                for(let i=0;i<arr.length;i++){
                    if(arr[i].style == 'video'){
                        arr[i].time = new Date(arr[i].time).format("yyyy-MM-dd hh:ss:mm");
                        this.$axios.get('/userOne',{
                            params:{
                                username:arr[i].author
                            }
                        }).then(resp=>{
                            arr[i].avatar = resp.data[0].avatar
                            this.videodata.push(arr[i])
                        })
                    }
                }
                console.log(this.videodata)
            })
        },
        // getUser(username){
        //     this.$axios.get('/userOne',{
        //         params:{
        //             username:username
        //         }
        //     }).then(res=>{
        //         console.log(res.data[0].avatar)
        //         return res.data[0].avatar
        //     })
        // }
    },
}
</script>

<style scoped>
    .t{
		height: 44px;
	    background: #fff;
	    color: #000;
	    font-size: 18px;
	}
	.l{
	    background: url(../../assets/images/back_icon.png) left center no-repeat;
    	background-size: 19px 44px;
    	padding-left: 16px;
    	color: #ff5151;
		font-size: 16px;
	}
	.r{
		background: url(../../assets/images/find_icon.png) right center no-repeat;
    	background-size: auto 44px;
    	width: 100%;    
    	margin-left: 4%;
	}
    /*页面内容*/
	.content{
		margin: 0 15px;
	}
	.lists{
		width: 100%;
		border-bottom: 1px dashed #ddd;
		padding: 14px 0;
        overflow: hidden;
        position: relative;
	}
	.lists_l{
		width: 40%;
        height: 6em;
		float: left;
		position: relative;
	}
	.lists_l::before{
		content: '';
		display: block;
		position: absolute;
	    top: calc(50% - 6px);
		left: calc(50% - 4px);
	    width: 0;
	    height: 0;
	    border-top: 7px solid transparent;
	    border-bottom: 7px solid transparent;
	    border-left: 9px solid #fff;
	    z-index: 1;
	}
	.lists_l::after{
		content: '';
		display: block;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: rgba(0,0,0,0.6);
		position: absolute;
		top: calc(50% - 16px);
		left: calc(50% - 16px);
	}
	.lists_l img{
		width: 100%;
		float: left;
	}
	/* .lists_t{
		display: block;
		background-color: rgba(99,99,99,0.8);
		width: 37px;
		height: 15px;
		line-height: 16px;
		font-size: 10px;
		color: #fff;
		padding: 1px 2px;
		position: absolute;
		right: 0;
		bottom: 0;
	} */
	.lists_p,.lists_s{
		display: block;
		width: 48%;
		float: left;
		text-align: left;
		box-sizing: border-box;
		padding-left: 10px;
		overflow: hidden;
	}
	.lists_p{
		font-size: 16px;
		line-height: 24px;
	}
	.lists_s{
		font-size: 12px;
    	color: #ccc;
    	line-height: 28px;
	}
</style>