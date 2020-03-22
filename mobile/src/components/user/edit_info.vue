<template>
    <main>
        <mt-header class="t" title="个人信息">
            <mt-button icon="back" @click="back()" slot="left" class="l">返回</mt-button>
		</mt-header>
        <mt-field class="inp" label="用户名" placeholder="请输入用户名" @blur.native.capture="checkName" :state="nameStatus" v-model="username"></mt-field>
        <mt-field class="inp" label="密码" placeholder="请输入密码" @blur.native.capture="checkPassword" :state="pwdStatus" v-model="password"></mt-field>
        <mt-field class="inp" label="手机号" placeholder="请输入手机号" @blur.native.capture="checkTel" :state="telStatus" type="tel" v-model="number"></mt-field>
        <mt-field class="inp" label="邮箱" placeholder="请输入邮箱" @blur.native.capture="checkEmail" :state="emailStatus" type="email" v-model="email"></mt-field>
        <mt-field class="inp" label="生日" placeholder="请输入生日" type="date" v-model="birth"></mt-field>
        <mt-radio
            class="inp"
            align="right"
            title="性别"
            v-model="sex"
            :options="[
            {
                label: '男',
                value: 'male'
            },
            {
                label: '女',
                value: 'female'
            }
            ]">
        </mt-radio>
		
        <button @click="change" class="out">修改</button>

    </main>
</template>

<script>
import { Field } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    // props:['record'],
    data(){
        return{
            username:'',
            password:'',
            number:'',
            email:'',
            birth:'',
            sex:'',
            pwdStatus:'',
            telStatus:'',
            emailStatus:'',
            nameStatus:'',
        }
    },
    mounted() {
        this.username = this.$store.state.userinfo.username
        this.password = this.$store.state.userinfo.password
        this.number = this.$store.state.userinfo.number
        this.email = this.$store.state.userinfo.email
        this.birth = new Date(this.$store.state.userinfo.birth).format('yyyy-MM-dd')
        this.sex = this.$store.state.userinfo.sex
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        checkName(){
            if(this.username){
                this.nameStatus = ''
            }else{
                Toast({
                    message:'用户名不能为空',
                    position: 'bottom',
                });
                this.nameStatus = 'error'
            }
        },
        checkPassword(){
            let pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/
            if(!pwd.test(this.password)){
                this.pwdStatus = 'error'
                Toast({
                    message:'必须包含大小写字母和数字的组合，长度在6-10之间',
                    position: 'bottom',
                });
            }else{
                this.pwdStatus = ''
            }
        },
        checkTel(){
            let tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
            if(!tel.test(this.number) && this.number){
                this.telStatus = 'error'
                Toast({
                    message:'请输入正确的手机号码',
                    position: 'bottom',
                });
            }else{
                this.telStatus = ''
            }
        },
        checkEmail(){
            let mail = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
            if(!mail.test(this.email) && this.email){
                this.emailStatus = 'error'
                Toast({
                    message:'邮箱地址格式有误',
                    position: 'bottom',
                });
            }else{
                this.emailStatus = ''
            }
        },
        change(){
            if(this.nameStatus !== 'error' && this.telStatus !== 'error' && this.pwdStatus !== 'error' && this.emailStatus !== 'error'){
                this.$axios.post('/updateUser',{
                    oldname:this.$store.state.userinfo.username,
                    username:this.username,
                    password:this.password,
                    number:this.number,
                    email:this.email,
                    birth:this.birth,
                    sex:this.sex,
                }).then(res =>{
                    if(res.data.flag == 1){
                        Toast({
                            message:'修改失败：用户名重复',
                        });
                    }else{
                        this.$axios.get('/userList',{ //更新登录数据
							params:{
								username:this.username
							}
						}).then(res=>{
							console.log(res.data)
                            this.$store.commit('getuserinfo',{userinfo:res.data}) 
                            Toast({
                                message:'修改成功',
                            });
						})
                        
                    }
                })
            }else{
                Toast({
                    message:'请先输入正确的信息',
                    position: 'bottom',
                });
            }
            

            console.log(this.birth,'this.birth')

        }
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
.out{
    /* overflow: hidden; */
    width: 100%;
    height: 45px;
    background: #fff;
    font-size: 16px;
    color: #ff4c39;
    margin-top: 16px;
    border-radius: 2px;
    border: 0px;
    outline: none;
}

</style>