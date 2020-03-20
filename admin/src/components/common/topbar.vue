<template>
    <a-row id="top">
        <a-col :span='4'>
            <img src="../../../static/img/logo_lo.png" class="logo" alt="">
        </a-col>
        <a-col :span='8' style="text-align: right;float:right">
            <span>欢迎登录！ {{$store.state.islogin ? $store.state.islogin.username : ''}}</span>
            <span style="margin-left:1em"> | </span>
            <a-button type="link" class="quit" @click="addLog">
                <router-link :to='{name:"login"}'>退出</router-link>
            </a-button>
        </a-col>
    </a-row>
</template>

<script>
export default {
    data() {
        return {
            name:''
        };
    },
    computed:{
        islogin(){
            return this.$store.state.islogin
        }
    },
    methods:{
        addLog(value){
            console.log(this.$store.state.islogin)
            // console.log(this.$store.state.islogin.intime,'this.$store.state.islogin.intime')
            let date = new Date()
            this.$axios.post('/addLog',{
                username: this.$store.state.islogin.username,
                password: this.$store.state.islogin.password,
                power: this.$store.state.islogin.type,
                intime: this.$store.state.islogin.intime,
                outtime: date.toLocaleString(),
                status: 0
            })
        },
    }
}
</script>
<style scoped>
#top{
    background-color: #ff4c39;
}
.logo {
    /* width: 120px; */
    height: 52px;
    /* background: rgba(255, 255, 255, 0.2); */
    margin: 6px 28px 6px 0;
    float: left;
}
.quit{
    color: #333;
}
.quit:hover{
    color: #fff;
}
</style>