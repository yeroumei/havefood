<template>
    <main>
        <mt-header class="t" title="个人信息">
            <mt-button icon="back" @click="back()" slot="left" class="l">返回</mt-button>
		</mt-header>
        <mt-field class="inp" label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field class="inp" label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field class="inp" label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <mt-field class="inp" label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
        <mt-field class="inp" label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
    </main>
</template>

<script>
import { Field } from 'mint-ui';
export default {
    // props:['record'],
    data(){
        return{
            username:'',
            password:'',
            phone:'',
            email:'',
            birthday:''
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
    }
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
.inp{
    text-align: left;
}
</style>