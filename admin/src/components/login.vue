<template>
<div id="components-layout-demo-basic">
    <a-layout>
        <a-layout-header>
        <img src="../../static/img/logo_lo.png" class="logo" alt="">
        </a-layout-header>
        <a-layout-content style="padding: 3em 0">
            <a-row>
                <a-col :span="8" :offset="4">
                    <img src="../../static/img/sinin.png">
                </a-col>
                <a-col :span="6" :offset="2">
                    <div class="welcome">
                        <h2 class="wetitle">
                            欢迎登录“有美食”管理界面</h2>
                        <a-form id='loginform' :form='form' >
                            <a-form-item>
                                <a-input v-decorator='["username",{rules:[{required:true,message:"Please input your username"}]}]' placeholder='Username' autofocus>
                                    <a-icon slot="prefix" type='user' style='color:grey' />
                                </a-input>
                            </a-form-item>
                            <a-form-item>
                                <a-input v-decorator='["password",{rules:[{required:true,message:"Please input your password"}]}]' type='password' placeholder='Password'>
                                    <a-icon slot="prefix" type='lock' style="color:grey" />
                                </a-input>
                            </a-form-item>
                            <a-form-item>
                                <!-- <button @click="getData">查询数据</button>
                                <button @click="addData">插入数据</button>
                                <button @click="updData">修改数据</button>
                                <button @click="delData">删除数据</button> -->
                                <a-button type='primary' html-type='submit' class='btn' @click="check">登录</a-button>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-col>
            </a-row>
        </a-layout-content>
        <a-layout-footer>
            <p style="text-align: center;">浏览器推荐使用：谷歌（Chrome）、火狐（FireFox）、IE10（以上）版本，大于1440*900分辨率!</p>
            <p style="text-align: center;">Copyright ® 2016-2020 岭南师范学院 计算机科学与技术（软件服务外包）2班.</p>
        </a-layout-footer>
    </a-layout>
</div>
</template>

<script>

export default {
    name: 'Login',
    data () {
        return {
            form: this.$form.createForm(this),
            userdata:[]
        }
    },
    computed:{
        getislogin(){
            return this.$store.state.islogin
        }
    },
    methods:{
        
      addData(){
        this.$axios({
            method:'post',
            url:'/register',
            data:{
                username: 'nbgls',
                password: '321',
                number: '13245678901',
                type: 'general',
                sex:'girl'
            }
        }).then((res => {
            console.log(res)
        }))
        },
        getData(){
        this.$axios({
            method:'get',
            url:'/userList',
        }).then((res => {
            console.log(res.data)
        }))
        },
        updData(){
            this.$axios({
                method:'post',
                url:'/updateUser',
                data:{
                    filterName:'yrm',
                    updateObj:{
                        username: 'nb',
                        password: '123',
                        number: '18802571325',
                        type: 'general',
                        sex: 'female',
                        email: "qq.com"
                    }
                }
            }).then((res => {
                console.log(res)
            }))
        },
        delData(){
        this.$axios({
            method:'post',
            url:'/deleteUser',
            data:{
                username:'nbgls'
            }
        }).then((res => {
            console.log(res)
        }))
        },
        check  (e) {  //登录验证
            e.preventDefault();
            this.form.validateFields((err,value)=>{
                if(!err){
                    console.log(value)
                    this.$axios.post('/login',value).then(res =>{
                        console.log(res.data)
                        if(res.data.username == value.username && res.data.password == value.password){
                            if(res.data.type == 'admin'){ //只有管理员可以进入
                                let date = new Date()
                                this.$store.commit('getislogin', {
                                    islogin: {
                                        flag:true,
                                        username: res.data.username,
                                        password: res.data.password,
                                        type: res.data.type,
                                        intime: date.toLocaleString()
                                    },
                                }) 
                                this.$router.push({name:'cookbook'})
                            }else{
                                this.$notification['error']({
                                    message: '登录失败',
                                    description:
                                        '权限不足：只有管理员能进入管理界面！',
                                });
                            }
                            this.form.resetFields()
                        }else{
                            // this.$store.commit('islogin', {
                            //     islogin: {
                            //         flag:false
                            //     },
                            // })
                            this.$notification['error']({
                                message: '登录失败',
                                description:
                                    '找不到该用户，请再次确认用户名和密码',
                            });
                            this.form.resetFields()
                        }
                    })
                }
            },
        )},
    }
}
</script>

<style scoped>
#components-layout-demo-basic {
    text-align: center;
  }
#components-layout-demo-basic .ant-layout-header {
    background: #fff;
    color: #fff;
    height: 10%;
}
#components-layout-demo-basic .ant-layout-footer {
    line-height: 1.5;
    background: #fff;
    height: 10%;
}
.wetitle{
    color:#333 !important;
    line-height: 4em;
    text-align: center
}
.welcome{
    background-color: #fff;
    border: 1px solid #f8f8f7;
    padding: 2.5em;
}
.btn{
    width:100%;
    background-color: #ff4c39;
    border: none
}
.logo {
    /* width: 100px; */
    height: 80px;
    /* background: rgba(255, 255, 255, 0.2); */
    margin: 6px 0 6px 60px;
    float: left;
}
</style>
