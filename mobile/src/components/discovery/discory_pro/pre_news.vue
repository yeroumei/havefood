<template>
  <main v-if="show">
        <!-- <mt-header class="t" title="预览文章">
            <mt-button icon="back" slot="left" @click="back" class="l">返回</mt-button>
        </mt-header> -->
        <section style="padding:1em 0.5em; text-align:left">
            <h2 style="font-weight:550">{{record.title}}</h2>
            <p style="padding:1em 0">
                <van-image fit="cover" round width="15%" style="float:left" :src="record.avatar" alt />
                <span style="padding-left:68px;font-size:20px;display: block;line-height: 32px;">{{record.author}}</span>
                <span style="padding-left:15px;font-size:14px">{{record.time}}</span>
            </p>
            <div v-for="item in record.media">
                <h3 v-if="item.sub">{{item.sub}}</h3>
                <p style="padding-bottom:1em" v-if="item.text">{{item.text}}</p>
                <van-image  style="padding-bottom:1em" fit="contain" width="100%" v-for="i in item.img" :src="i.url" alt />
            </div>
        </section>
  </main>
</template>

<script>
export default {
    props:['show','record'],
    data() {
        return {
            
        }
    },
    watch:{
        show(val){
            console.log(val,'show')
        },
        record(val){
            console.log(val,'record')
        },
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
    },
}
</script>

<style scoped>

</style>