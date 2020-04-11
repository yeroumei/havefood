<template>
    <main v-if="show" style="padding:20px">
        <div v-for="(com,index) in record" style="text-align:left;background-color:#fff">
            <div>
                <p style="display:flex;align-items: center;">
                    <nut-avatar
                    size="small"
                    bg-icon
                    :bg-image="com.avatar"
                    >
                    </nut-avatar>
                    <span style="color:#ff5151">{{com.from_user}}</span>  <span style="padding-left:2em;font-size:12px;color:#999">{{com.time}}</span>
                </p>
                <p @click="toReply(com,index)" style="font-size:14px;color:#333">&nbsp;&nbsp;&nbsp;&nbsp;{{com.content}}</p>
                
                <!-- 下面是回复 -->
                <van-divider /> 
                <div v-for="(rep,i) in com.reply" style="font-size:14px;color:#333;padding-left:2em">
                    <p style="display:flex;align-items: center;">
                        <nut-avatar
                        size="small"
                        bg-icon
                        :bg-image="rep.avatar"
                        >
                        </nut-avatar>
                        <span style="color:#ff5151">{{rep.from_user}}</span>
                    </p>
                    <p  @click="rep_toReply(rep,i)">@{{rep.to_user}}：&nbsp;{{rep.content}}</p>
                    
                <van-divider /> 
                
                <p style="display: flex;align-items: flex-end;" v-if="repflag && rep_toreply == i">
                    <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    type="textarea"
                    :placeholder="'@回复'+ rep.from_user +'：'"
                    />
                    <van-button hairline size="small" @click="replySome(com)">回复</van-button>
                </p>
                
                </div>
            
            </div>
            <p style="display: flex;align-items: flex-end;" v-if="showflag && toreply == index">
                <van-field
                v-model="message"
                rows="2"
                autosize
                type="textarea"
                :placeholder="'@回复'+ com.from_user +'：'"
                />
                <van-button hairline size="small" @click="replySome(com)">回复</van-button>
            </p>

            <!-- 分割线 -->
            <van-divider /> 
        </div>
    </main>
</template>

<script>
import {  Dialog } from 'vant';
export default {
    props:['show','record','proid'],
    data() {
        return {
            showflag:false,
            repflag:false,
            message:'',
            toreply:'',
            rep_toreply:''
        }
    },
    watch:{
        show(val){
            this.showflag = false
            console.log(val,'show')
        },
        record(val){
            console.log(val,'record')
        },
        proid(val){
            console.log(val,'proid')
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        toReply(item,index){
            if(this.$store.state.userinfo.username){ //验证已登录
                if(item.from_user == this.$store.state.userinfo.username){
                    console.log(item,'作者是自己呢')
                    Dialog.confirm({
                        title: '删除',
                        message: '你确定要删除该评论？'
                        }).then(() => {
                            this.$axios.post('/deleteComments',{
                                _id: item._id,
                                pro_id: item.pro_id
                            }).then(res=>{
                                for(let i=0;i<this.record.length;i++){
                                    if(item == this.record[i]){
                                        this.record.splice(i,1)
                                    }
                                }
                                this.$axios.post('/sureMoves',{
                                    _id : this.proid,
                                    comments : this.record
                                }).then(res=>{
                                    console.log(res.data,'删除评论成功')
                                })
                            })
                        }).catch(() => {
                            
                    });
                }else{
                    console.log(item,index,'准备')
                    this.toreply = index
                    this.showflag = !this.showflag 
                }
            }else{
            this.$router.push({path:'/login'})
            console.log('请先登录')
            }
        },
        rep_toReply(rep,i){
            if(this.$store.state.userinfo.username){ //验证已登录
                if(rep.from_user == this.$store.state.userinfo.username){
                    console.log(rep,'回复作者是自己呢')
                    Dialog.confirm({
                        title: '删除',
                        message: '你确定要删除该回复？'
                        }).then(() => {
                            this.$axios.post('/deleteReplys',{
                                _id: rep._id,
                            }).then(res=>{
                                for(let i=0;i<this.record.length;i++){
                                    for(let j=0;j<this.record[i].reply.length;j++)
                                    if(rep == this.record[i].reply[j]){
                                        this.record[i].reply.splice(j,1)
                                    }
                                }
                                this.$axios.post('/sureMoves',{
                                    _id : this.proid,
                                    comments : this.record
                                }).then(res=>{
                                    console.log(res.data,'删除回复成功')
                                })
                            })
                        }).catch(() => {
                            
                    });
                }else{
                    this.rep_toreply = i
                    this.repflag = !this.repflag 
                }
            }else{
                this.$router.push({path:'/login'})
                console.log('请先登录')
            }
        },
        replySome(com){
            if(this.message == ''){
                Toast({ message:'回复内容不能为空' });
            }else{
                this.$axios.post('/addReplys',{
                    from_user: this.$store.state.userinfo.username,
                    avatar : this.$store.state.userinfo.avatar,
                    to_user: com.from_user,
                    pro_id: com._id,
                    content:this.message,
                    type: 'tocom'
                }).then(res=>{
                    this.showflag = false
                    // this.getComments()
                    com.reply.push(res.data.list)
                    console.log(com,'回复')
                    // 将评论存进指定的动态
                    this.$axios.post('/sureMoves',{
                        _id : com.pro_id,
                        comments : com
                    }).then(res=>{
                        console.log(res.data,'更新')
                        this.message = ''
                        this.repflag = false
                    })
                })
            }
        }
    },
}
</script>

<style scoped>


</style>