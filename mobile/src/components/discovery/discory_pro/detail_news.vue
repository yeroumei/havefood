<template>
    <main>
        <mt-header class="t" title="文章详情">
            <mt-button icon="back" slot="left" @click="back" class="l">返回</mt-button>
        </mt-header>
        <section style="padding:53px 0.5em; text-align:left">
            <h2 style="font-weight:550">{{$store.state.newsdetails.title}}</h2>
            <p style="padding:1em 0">
                <van-image fit="cover" round width="3.4em" height="3.4em" style="float:left" :src="$store.state.newsdetails.avatar" alt />
                <span style="padding-left:68px;font-size:20px;display: block;line-height: 32px;">{{$store.state.newsdetails.author}}</span>
                <span style="padding-left:15px;font-size:14px">{{$store.state.newsdetails.time}}</span>
            </p>
            <div v-for="item in $store.state.newsdetails.media">
                <h3 v-if="item.sub">{{item.sub}}</h3>
                <p style="padding-bottom:1em" v-if="item.text">{{item.text}}</p>
                <van-image  style="padding-bottom:1em" fit="contain" :width="item.img.length > 1 ? '50%' : '100%' " v-for="i in item.img" :src="i" alt />
            </div>
        </section>
        <nut-buttongroup style="position:fixed;bottom:0">
            <van-button :icon="$store.state.newsdetails.loves.indexOf($store.state.userinfo.username) == -1 ? 'like-o': 'like' " color="#ff5151" plain hairline style="width:100%" @click="onlove">点赞 {{$store.state.newsdetails.loves.length}}</van-button>
            <van-button :icon="flag ? 'star' : 'star-o' " color="#ff5151" plain hairline style="width:100%" @click="onCollect">收藏  {{this.collects.length}}</van-button>
        </nut-buttongroup>
    </main>
</template>

<script>
export default {
    data() {
        return {
            collects:[],
            flag:''
        }
    },
    mounted() {
        this.getCollect()
        this.$store.state.newsdetails.time =  new Date(this.$store.state.newsdetails.time).format("yyyy-MM-dd hh:ss:mm");
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        //  点赞
        onlove(item) {
            if(this.$store.state.userinfo.username){ //验证已登录
                var flag = this.$store.state.newsdetails.loves.indexOf(this.$store.state.userinfo.username);
                if (flag !== -1) {
                    this.$store.state.newsdetails.loves.splice(flag, 1);
                } else {
                    this.$store.state.newsdetails.loves.push(this.$store.state.userinfo.username);
                }
                this.$axios
                    .post("/loveNews", {
                    loves: this.$store.state.newsdetails.loves,
                    _id: this.$store.state.newsdetails._id
                    })
                    .then(res => {
						this.$store.commit('getnewsdetails',{newsdetails:res.data[0]}) 
                        console.log(res.data, "谁点赞了呢");
                });
            }else{
                this.$router.push({path:'/login'})
                console.log('请先登录')
            }
        },
        onCollect(){
            if(this.flag){
                this.$axios
                    .post("/deleteCollects", {
                        user : this.$store.state.userinfo.username, 
                        type: 'news',
                        favorite : this.$store.state.newsdetails._id, 
                    })
                    .then(res => {
                        this.getCollect()
                        this.flag = false
                        console.log(res.data,'谁不收藏我了')
                });
            }else{
                this.$axios
                    .post("/addCollects", {
                        user : this.$store.state.userinfo.username, 
                        type: 'news',
                        favorite : this.$store.state.newsdetails._id, 
                    })
                    .then(res => {
                        this.getCollect()
                        this.flag = true
                        console.log(res.data,'谁收藏我了')
                });
            }
        },
        getCollect(){
            this.$axios.get('/collectsList',{
                params:{
                    type : 'news',
                    favorite : this.$store.state.newsdetails._id
                }
            }).then(res=>{
                this.collects = res.data
                for(let i = 0;i < res.data.length;i++){
                    if(res.data[i].user == this.$store.state.userinfo.username){
                        this.flag = true
                    }else{
                        this.flag = false
                    }
                }
                console.log(res.data,'这是收藏的文章')
            })
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
	/* .l{
	    background: url(../assets/images/back_icon.png) left center no-repeat;
    	background-size: 19px 44px;
    	padding-left: 16px;
	} */
	.l,.r{
		color: #ff5151;
		font-size: 16px;
    }
</style>