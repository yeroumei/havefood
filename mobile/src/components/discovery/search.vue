<template>
    <main>
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
        <van-tabs v-model="activeName" @click="onClick">
            <van-tab title="食谱" name="recipe">食谱</van-tab>
            <van-tab title="用户" name="user">用户</van-tab>
            <van-tab title="动态" name="moves">动态</van-tab>
            <van-tab title="文章" name="news">文章</van-tab>
        </van-tabs>
    </main>
</template>

<script>
export default {
    data() {
        return {
            value:'',
            activeName: 'recipe'
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        toSearch(){
            switch(this.activeName){
                case 'user':
                    this.$axios.get('/userLikes',{
                        params:{
                            keyword: this.value
                        }
                    }).then(res=>{
                        console.log(res.data)
                    })
                break;
                case 'recipe':
                    this.$axios.get('/recipeLikes',{
                        params:{
                            keyword: this.value
                        }
                    }).then(res=>{
                        console.log(res.data)
                    })
                break;
                case 'moves':
                    this.$axios.get('/movesLikes',{
                        params:{
                            keyword: this.value
                        }
                    }).then(res=>{
                        console.log(res.data)
                    })
                break;
                case 'news':
                    this.$axios.get('/newsLikes',{
                        params:{
                            keyword: this.value
                        }
                    }).then(res=>{
                        console.log(res.data)
                    })
                break;
            }
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

</style>