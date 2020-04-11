<template>
    <main>
        <header class="topbar">
            <van-search
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                >
                <template #left>
                    <van-icon @click="back" color= "#ff5151" style="padding-right:0.5em" size="20px" name="arrow-left" />
                </template>
                <template #action>
                    <van-button @click="onSearch" size="small" style="font-size:14px" color="#ff5151">搜索</van-button>
                </template>
            </van-search>
        </header>
        <van-tabs v-model="activeName" @click="onClick" style="padding-top: 44px;">
            <van-tab title="食谱" name="recipe">
                <section>
                    <ul class="content">
                        <li class="lists" v-for="(item,index) in recipedata">
                            <p :class=" item.style == 'video' ? 'lists_l' : 'lists_img' ">
                                <van-image
                                    v-if="item.style == 'video'"
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="item.step[item.step.length-1].img"
                                />
                                <van-image
                                    v-if="item.style == 'image'"
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="item.cover_pic"
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
            </van-tab>
            <van-tab title="最新" name="news">
                <section>
                    <ul class="content">
                        <li class="lists" v-for="(item,index) in recipenews">
                            <p :class=" item.style == 'video' ? 'lists_l' : 'lists_img' ">
                                <van-image
                                    v-if="item.style == 'video'"
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="item.step[item.step.length-1].img"
                                />
                                <van-image
                                    v-if="item.style == 'image'"
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="item.cover_pic"
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
            </van-tab>
            <van-tab title="最热" name="hots">
                <section>
                    <ul class="content">
                        <li class="lists" v-for="(item,index) in recipehots">
                            <p :class=" item.style == 'video' ? 'lists_l' : 'lists_img' ">
                                <van-image
                                    v-if="item.style == 'video'"
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="item.step[item.step.length-1].img"
                                />
                                <van-image
                                    v-if="item.style == 'image'"
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="item.cover_pic"
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
            </van-tab>
            <van-tab title="用户" name="user">
                <van-card
                v-for="item in userdata"
                :title="'用户：'+item.username"
                :thumb="item.avatar ? item.avatar : 'null'"
                style="text-align:left"
                >
                <template #tags>
                    <van-tag plain type="primary" v-if="item.sex == 'male'"><van-icon style="padding-right:6px" name="user-o" /> 男</van-tag>
                    <van-tag plain type="danger" v-else><van-icon style="padding-right:6px" name="user-o" />  女</van-tag>
                </template>
                <template #desc>
                    <p style="padding:2px 0 8px 0" v-if="item">粉丝：{{ item.myfans}}</p>
                </template>
                <template #num>
                    <van-button v-if="fansdata.some(resp=>{
                        if(resp.parent_id==item.username && resp.fans_id==$store.state.userinfo.username){
                            return true 
                        } else{
                            return false
                        }
                    }) == false" color="#ff5151" plain  size="small" @click="onlove(item)">+ 关注</van-button>
                    <van-button v-else type="default" size="small" @click="onlove(item)">已关注</van-button>
                    <!-- <van-button size="mini">按钮</van-button> -->
                </template>
                </van-card>
                <!-- 用户{{userdata}} -->
            </van-tab>
            
        </van-tabs>
    </main>
</template>

<script>
export default {
    data() {
        return {
            value:'',
            activeName: 'recipe',
            userdata:[],
            recipedata:[],
            recipenews:[],
            recipehots:[],
            fansdata:[],
        }
    },
    mounted() {
        this.getFans()
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        getFans(){
            this.$axios.get('/fansList').then(resp=>{
                this.fansdata = resp.data
            })
        },
        //  关注
        onlove(item) {
            if(this.$store.state.userinfo.username){ //验证已登录
                    // console.log(item.username,this.$store.state.userinfo.username,result,'this.result')
            var result = this.fansdata.some(resp=>{
                if(resp.parent_id==item.username && resp.fans_id==this.$store.state.userinfo.username){
                    return true 
                } else{
                    return false
                }
            })
            if(result){ // 如果存在
                console.log(result,'存在')
                this.fansdata.splice(result, 1);
                this.$axios.post("/deleteFans", {
                        parent_id: item.username,
                        fans_id: this.$store.state.userinfo.username
                    }).then(res => {
                    // this.getFans()
                   this.toSearch()
                    console.log(res.data, "谁不关注我了");
                });

            }else{
                console.log(result,'不存在')
                this.fansdata.push({
                    parent_id: item.username,
                    fans_id: this.$store.state.userinfo.username
                });
                this.$axios.post("/addFans", {
                        parent_id: item.username,
                        fans_id: this.$store.state.userinfo.username
                    }).then(res => {
                //    this.getFans()
                   this.toSearch()
                    console.log(res.data, "谁关注我了");
                });
            }
                
            }else{
                this.$router.push({path:'/login'})
                console.log('请先登录')
            }
        },
        toSearch(){
            switch(this.activeName){
                case 'user':
                    this.getFans()
                    this.$axios.get('/userLikes',{
                        params:{
                            keyword: this.value
                        }
                    }).then(res=>{
                        this.userdata = res.data.data
                        for(let i=0;i<this.userdata.length;i++){
                            this.userdata[i].myfans = 0
                            for(let j=0;j<this.fansdata.length;j++){
                                if(this.userdata[i].username == this.fansdata[j].parent_id){
                                    console.log(this.fansdata[j],'this.fansdata[j].length')
                                    this.userdata[i].myfans++
                                }
                            }
                        }
                        // console.log(this.userdata,'修改的用户')
                    })
                break;
                case 'recipe':
                    this.$axios.get('/recipeLikes',{
                        params:{
                            keyword: this.value
                        }
                    }).then(res=>{
                        for (let i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].time = new Date(res.data.data[i].time).format(
                                "yyyy-MM-dd hh:ss:mm"
                            );
                        }
                        this.recipedata = res.data.data
                        console.log(res.data)
                    })
                    
                break;
                case 'news':
                    // this.$axios.get('/movesLikes',{
                    //     params:{
                    //         keyword: this.value
                    //     }
                    // }).then(res=>{
                    //     this.movesdata = res.data.data
                    //     console.log(res.data)
                    // })
                    this.$axios.get('/recipeLikes',{
                        params:{
                            keyword: this.value
                        }
                    }).then(res=>{
                        for (let i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].time = new Date(res.data.data[i].time).format(
                                "yyyy-MM-dd hh:ss:mm"
                            );
                        }
                        this.recipenews = this.sortKey(res.data.data,'time')
                        console.log(res.data.data)
                    })
                break;
                case 'hots':
                    // this.$axios.get('/newsLikes',{
                    //     params:{
                    //         keyword: this.value
                    //     }
                    // }).then(res=>{
                    //     this.newsdata = res.data.data
                    //     console.log(res.data)
                    // })
                    this.$axios.get('/recipeLikes',{
                        params:{
                            keyword: this.value
                        }
                    }).then(res=>{
                        for (let i = 0; i < res.data.data.length; i++) {
                            res.data.data[i].time = new Date(res.data.data[i].time).format(
                                "yyyy-MM-dd hh:ss:mm"
                            );
                        }
                        this.recipehots = this.sortKey(res.data.data,'time')  //根据收藏数或浏览量
                        console.log(res.data.data)
                    })
                break;
            }
        },
        // 排序封装
        sortKey(array,key){
            return array.sort(function(a,b){
                var x = a[key];
                var y = b[key];
                return ((y<x)?-1:(x>y)?1:0)   //从小到大排序
        })
        },
        onSearch(){
            console.log('进入搜索了')
            if(this.value){
                this.toSearch()
            }
        },
        onClick(name, title) {
            if(this.value){
                this.toSearch()
            }
            console.log(name,title);
        }
    },
}
</script>

<style scoped>
/* 顶部 */
.topbar{
		height: 44px;
    	width: 100%;    
    	background: #fefefe;
    	position: fixed;
   		top: 0px;
   		z-index: 3;
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
	.lists_img{
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

    /* 用户列表 */
    .van-card__title {
        line-height: 30px;
        font-size: 14px;
    }
</style>