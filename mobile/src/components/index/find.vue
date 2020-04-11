<template>
    <main>

        <header class="topbar">
            <!-- <mt-button icon="back" @click="back()" slot="left" class="l">返回</mt-button> -->
            <!-- <i class="back" @click="back()"></i> -->
            <router-link to="/search" class="find">
                <img src="../../assets/images/findbtn.png"/>
                搜索任何你想要的
            </router-link>
        </header>
        <!-- <header class="topbar">
            <van-search
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                >
                <template #action>
                    <van-button @click="onSearch" size="small" style="font-size:14px" color="#ff5151">搜索</van-button>
                </template>
            </van-search>
        </header> -->
        <section style="padding:54px 10px 50px 10px">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <van-row gutter="10"> 
                        <van-col span="12" v-for="(item,index) in list" :key="index" style="height:18em">
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
                                </p>
                                <div style="text-align: left;padding:6px">
                                    <p class="title" >
                                        {{item.title}}
                                        <span class="lists_s">{{item.time}}</span>
                                    </p>
                                    <span style="display: flex;justify-content: space-between;">
                                        <nut-avatar
                                            size="small"
                                            bg-icon
                                            :bg-image="item.avatar"
                                        >
                                        </nut-avatar>
                                        <span  style="font-size:14px" >{{item.author}}</span>
                                        <span>
                                            <van-icon size="14px" name="like-o" />
                                            <span style="font-size:10px" >
                                            12
                                            </span>
                                        </span>
                                        <span>
                                        <van-icon size="14px" name="star-o"/>
                                            <span style="font-size:10px">
                                            134
                                            </span>
                                        </span>
                                    </span>
                                </div>
                                <!--<p style="height:10%" class="text"><a class="text_a">{{item.des}}</a></p> -->
                            </router-link>
                        </van-col>
                    </van-row>
                </van-list>
            </van-pull-refresh>
        </section>
    </main>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
            value:'',
            page:0,
            now:0,
            listdata:[],
            list: [],
            loading: false,
            finished: false,
            refreshing: false,
            // options:{controls: true}
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        onSearch(){
            console.log('进入搜索了')
            if(this.value){
                this.$router.push({path:'/search'})
                this.toSearch()
            }else{
                Toast({
                    message:'请输入搜索内容',
                    position:"bottom"
                });
            }
        },
        getData(){
            this.$axios.get('/recipeList').then(res=>{
                this.page = Math.ceil(res.data.length / 6);
                console.log(this.listdata,this.page,'page')
            })
        },
        
        onLoad() {
            this.$axios.get('/recipeList',{
                params:{
                    status:0
                }
            }).then(res=>{
                for(let i=0;i<res.data.length;i++){
                    res.data[i].time = new Date(res.data[i].time).format("yyyy-MM-dd");
                    // this.$axios.get('/userOne',{
                    //     params:{
                    //         username:res.data[i].author
                    //     }
                    // }).then(resp=>{
                    //     res.data[i].avatar = resp.data[0].avatar
                    //     res.data[i].time = new Date(res.data[i].time).format("yyyy-MM-dd");
                    // })  
                }
                this.listdata = res.data
                let len = this.listdata.length
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }
                if(this.page>1 && this.now < this.page){
                    // console.log(this.now , this.page,'this.page')
                    this.now++
                    for (let i = 0; i < 6; i++) {
                        this.list.push(this.listdata[this.list.length]);
                    }
                    this.page--
                }else{
                    this.list = this.listdata
                }
                this.loading = false;
                if (this.listdata.length == this.list.length) {
                    console.log(this.now , this.page,'这里最最后最后最后后')
                    this.finished = true;
                }
                console.log(this.list,'this.list')
            })
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        }
    },
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
    .back{
		height: 44px;
	    min-width: 35px;
	    position: absolute;
	    display: block;
	    top: 0px;
	    left: 0px;
	    background: url(../../assets/images/back_icon2.png) center no-repeat;
	    background-size: auto 44px;
	}
	.find{
		height: 32px;
	    line-height: 32px;
	    background: #f5f5f5;
	    color: #aaa;
	    border-radius: 2px;
	    margin: 0 10px;
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
    .title{
		font-size: 14px;
	    font-weight: 500;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
        padding-bottom: 5px;
	    /* padding: 12px 0px 2px 6px; */
	}
    .lists_s{
		font-size: 12px;
    	color: #ccc;
    	line-height: 28px;
	}
</style>