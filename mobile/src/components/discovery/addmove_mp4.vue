<template>
  <main>
        <mt-header class="t" title="分享美食">
            <mt-button icon="back" slot="left" @click="back" class="l">返回</mt-button>
                <mt-button class="r" slot="right" @click="addMoving">发布</mt-button>
        </mt-header>
		<section class="content">
            <van-field
                v-model="content"
                rows="2"
                :autosize="{ maxHeight: 100, minHeight: 100 }"
                type="textarea"
                placeholder="这一刻的想法..."
                show-word-limit
            />
            <div style="width:100%;padding-bottom：60%;">
                <nut-uploader
                    name="file"
                    url="/api/upload"
                    :isPreview="true"
                    :acceptType = "['video/mp4']"
                    @success="onSuccess"
                    @fail="onFail"
                    typeError="对不起，不支持上传该类型文件！"
                    limitError="对不起，文件大小超过限制！"
                    class="imgbox"
                >
                <div style="padding:1em;height:13em" v-if="previewImg" >
                    <video :src="previewImg" width="100%" height="100%" controls="controls" />
                </div>
                <!-- <van-image fit="contain" v-else-if="previewType == 'image'"  width="100%" :src="previewImg" alt /> -->
                <div v-else>
                    <van-icon name="plus" size="3em" color="#aaa"/>
                    <p style="color:#AAA;padding:1em 0">上传视频</p>
                </div>
                </nut-uploader> 
            </div>
            <!-- <van-uploader :after-read="afterread" :max-count="9" :before-delete="beforedelete"  v-model="fileList"></van-uploader> -->
		</section>
  </main>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
            content:'',
            fileList:[],
            media:[],
            flagnum:'',
            previewImg:''
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        // 上传素材
        onSuccess(file,res){
            let resop = JSON.parse(res)
            this.previewImg = resop.result.url
        },
        onFail(file,res){
            alert('上传失败！');
        },
        // afterread(file){
        //     let params = new FormData(); //创建form对象
        //     params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
        //     let config = {
        //         headers: { //添加请求头
        //         Authorization:
        //             "Bearer " + window.localStorage.getItem("managementToken"),
        //         "Content-Type": "multipart/form-data"
        //         }
        //     };
        //     // let url = "";
        //     this.$axios.post('/upload',params,config).then(res=>{
        //         console.log(res.data,'res.data')
        //         this.media.push(res.data.result.url)
        //         // this.steps.push({temp:'',img:res.data.result.url})
        //         // console.log(this.steps)
        //     })
        // },
        // beforedelete(file){
        //     // let url = "";
        //     console.log(this.fileList)
        //     console.log(file.file.name,'删除')
        //     for(var i=0;i<this.fileList.length;i++){
        //         if(this.fileList[i].file.name == file.file.name){
        //             this.flagnum = i
        //         }
        //     }
        //     this.$axios.post('/deleteImg',{
        //         url:this.media[this.flagnum]
        //     }).then(res => {
        //         console.log(res.data,this.media[this.flagnum],'删除成功')
        //         this.fileList.splice(this.flagnum,1)
        //         this.media.splice(this.flagnum,1)
        //     })
        // },
        addMoving(){
            console.log('发布成功')
            var time = new Date();
            console.log(time,'发布时间')
            if(this.content == ''){
                Toast({
                    message:'请先输入你要分享的内容',
                    position:"bottom"
                });
            }else if(this.previewImg == ''){
                Toast({
                    message:'请先上传分享的视频喔~',
                    position:"bottom"
                });
            }
            else{
                let medias = {
                    type:'video',
                    matter:this.previewImg
                }
                this.$axios.post('/addMoves',{
                    // id: Number(Math.random().toString().substr(3,length) + Date.now()).toString(36),
                    author : this.$store.state.userinfo.username,
                    media : medias, 
                    content : this.content, 
                    time : time, 
                    status : 1
                }).then(res=>{
                    console.log(res.data)
                    Toast({
                        message: '发布成功',
                        icon: 'success'
                    });
                    setTimeout(()=>{
                        this.$router.replace({path:'/recommend'})
                    },1200)
                })
            }
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
    /*网页内容*/
	.content{
		padding-top: 50px;
	}
    .content >>> .van-uploader{
        display: block;
    }
    .content >>> .van-uploader__preview ,.content >>> .van-uploader__upload{
        margin: 0 0 8px 8px;
    }
</style>