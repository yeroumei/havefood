<template>
  <main>
        <mt-header class="t" title="关于我们">
            <mt-button icon="back" @click="back()" slot="left" class="l">返回</mt-button>
        </mt-header>
            <img style="width:100%" src="../../../static/img/sinin.png" />
        <div style="background:#fff">
            <van-divider content-position="left" style="margin:0;padding:20px 0 10px 0">在此，有美食 将和你一起</van-divider>
            <van-steps style="text-align:left" active-color="#ff5151" inactive-icon="success" direction="vertical" :active="active">
                <van-step>
                    <h3>与千百种美食相遇</h3>
                    <p>好好吃饭...</p>
                </van-step>
                <van-step>
                    <h3>与千百个人们相识</h3>
                    <p>用心生活...</p>
                </van-step>
                <van-step>
                    <h3>与千百样灵魂相知</h3>
                    <p>比什么都幸福！</p>
                </van-step>
            </van-steps>
        </div>
  </main>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            time:''
        }
    },
    mounted() {
        this.loop()
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        loop(){
            this.time = setInterval(()=>{
                if(this.active == 2){
                    this.active = -1
                }
                this.active++

            },3000)
        }
    },
    beforeDestroy() {
        clearInterval(this.time)
    },
}
</script>

<style scoped>
main{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    position: fixed;
}
.t{
    height: 50px;
    background: #fdfdfd;
    padding: 0px 16px;
    color: #000;
    font-size: 18px;
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