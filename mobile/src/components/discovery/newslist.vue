<template>
  <main>
        <mt-header class="t" title="文章资讯">
            <mt-button icon="back" slot="left" @click="back" class="l">返回</mt-button>
            <mt-button icon="search" slot="right" class="l" @click="show = true"></mt-button>
        </mt-header>
        <div style="padding-top:50px" v-if="show">
            <van-search
                v-model="value"
                show-action
                shape="round"
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
            />
        </div>
        <section style="padding:0 10px">
            <p v-if="notdata" style="font-size:14px;color:#aaa">找不到相关文章~</p>
            <div  v-for="item in finddata">
                <router-link :to=" {name:'newsdetail', params: {id:item._id}}">
                    <img v-lazy="item.cover_pic" @click="newsDetails(item)" width="100%" />
                </router-link>
            </div>
        </section>
        <section  v-if="show == false" style="padding:50px 10px">
            <div v-for="item in daydata">
                <router-link :to=" {name:'newsdetail', params: {id:item._id}}">
                    <img v-lazy="item.cover_pic" @click="newsDetails(item)" width="100%" />
                    <p class="title" >
                        作者：{{item.author}}  
                        <span style="padding: 0 6px" >
                        获赞： {{item.loves ? item.loves.length : ''}}  <van-icon size="14px" name="like-o" color="#ff5151" /> 
                        </span>
                        <br/>
                        主题：{{item.title}}
                    </p>
                </router-link>
            </div>
        </section>
  </main>
</template>

<script>
export default {
    data() {
        return {
            daydata:[],
            value:'',
            finddata:'',
            show:false,
            notdata:false
        }
    },
    mounted() {
        this.getDay()
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        getDay(){
			this.$axios.get('/newsSend',{
				params:{
					status:0 //只显示已发布的
				}
			}).then(res=>{
				console.log(res.data,'新闻')
				this.daydata = res.data
			})
		},
		// 查看今日推荐详情
		newsDetails(item){
			console.log(item,'item的详情')
			this.$store.commit('getnewsdetails',{newsdetails:item}) 
        },
        //搜索（模糊）
        onSearch(val) {
            console.log(val);
            this.$axios.get('/newsLikes',{
				params:{
					keyword: val 
				}
			}).then(res=>{
				console.log(res.data,'find新闻')
                this.finddata = res.data.data
                if(this.finddata.length == 0){
                    this.notdata = true
                }
			})
        },
        onCancel() {
            console.log('取消');
            this.finddata = '',
            this.show = false
        }
    },
}
</script>

<style scoped>
 main{
        width: 100%;
        height: auto;
        /* background-color: #f5f5f5; */
    }
	.t{
		height: 50px;
	    background: #fdfdfd;
	    padding: 0px 16px;
	    color: #000;
	    font-size: 18px;
        width: 100%;
        position: fixed;
        z-index: 1;
	}
	.l,.r{
		color: #ff5151;
		font-size: 16px;
    }
    .title{
        color:#aaa;
        text-align:left;
        padding-bottom:1em;
        width: 100%;
		font-size: 14px;
	   	overflow: hidden;    
		text-overflow: ellipsis; 
		white-space: nowrap; 
    }
</style>