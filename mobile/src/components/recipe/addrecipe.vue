<template>
  <main>
    <mt-header class="t" title="创作菜谱">
        <mt-button icon="back" slot="left" @click="back" class="l">返回</mt-button>
        <!-- <mt-button class="r" slot="right" @click="addRecipe">发布</mt-button> -->
    </mt-header>
    <!-- <p style="height:50px">d</p> -->
	<section class="content">
        <div style="width:100%;padding-bottom：60%;">
            <nut-uploader
                name="file"
                url="/api/upload"
                :isPreview="see"
                :acceptType = "['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'video/mp4']"
                @success="onSuccess"
                @fail="onFail"
                typeError="对不起，不支持上传该类型文件！"
                limitError="对不起，文件大小超过限制！"
                class="imgbox"
            >
            <video v-if="previewType == 'video'" :src="previewImg" width="100%" height="100%" controls="controls" />
            <img v-else-if="previewType == 'image'"  width="100%" :src="previewImg" alt>
            <div v-else>
                <van-icon name="plus" size="3em" color="#aaa"/>
                <p style="color:#AAA;padding:1em 0">上传视频菜谱/图片菜谱</p>
            </div>
            </nut-uploader> 
        </div>
        <div class="tit">
            <nut-textinput 
                v-model="title"
                placeholder="请输入菜谱标题"
                :clearBtn="true"
                :disabled="false"
                :hasBorder="false"
            />
        </div>
        <div class="des">
            <nut-textbox 
                :switchMax="true" 
                :txtAreaH="100"
                :maxNum="300"
                :placeText="'简单描述一下这道菜吧~'"   
                @inputFunc="inputText"
            >
            </nut-textbox>
        </div>
        
        <nut-row v-for="(item,index) in menu" style="border-bottom: 1px solid #f5f5f5; ">
            <nut-col :span="12"  class="menu">
                <nut-textinput 
                    v-model="item.list"
                    placeholder="请输入食材名字"
                    :clearBtn="true"
                    :disabled="false"
                    :hasBorder="false"
                />
            </nut-col>
            <nut-col :span="12"  class="menu">
                <nut-textinput 
                    v-model="item.size"
                    placeholder="请输入食材用量"
                    :clearBtn="true"
                    :disabled="false"
                    :hasBorder="false"
                />
            </nut-col>
        </nut-row>
        <p style="color:#ff5151;padding:.8em 0; border-bottom:1px solid #f5f5f5">
            <span style="padding: em 3em"  @click="()=>{menu.push({list:'',size:''})}">+ 添加食材 +</span>
            <span style="padding: 0 3em" v-if="menu.length > 1" @click="()=>{menu.pop(menu[menu.length-1])}">- 删除食材 -</span>
        </p>

        <div class="page-picker-wrapper">
            <mt-cell title="选择所属类型" :value="selects" @click.native="showPicker = true" style="text-align: left;color:#aaa;"></mt-cell>
            <van-popup v-model="showPicker" position="bottom">
                <van-picker 
                show-toolbar 
                :visible-item-count="3"
                title="菜谱类型" 
                :columns="classdata"
                @cancel="showPicker = false"
                @confirm="onConfirm"
                />
            </van-popup>
        </div>
        <div class="des" >
            <mt-cell title="添加步骤：" style="text-align: left;color:#aaa;"></mt-cell>
            <van-uploader :after-read="afterread" :before-delete="beforedelete"  v-model="fileList"></van-uploader>
            <van-form v-for="(item,i) in steps">
                <van-field
                    v-model="item.temp"
                    :name="`temp${i}`"
                    rows="2"
                    autosize
                    :label="`步骤${i+1} ： `"
                    type="textarea"
                    maxlength="100"
                    placeholder="请输入留言"
                    show-word-limit
                    label-align="left"
                />
            </van-form>
            <br/><br/><br/><br/><br/>
            <nut-buttongroup style="position:fixed;bottom:0">
                <nut-button 
                    type="light"
                    style="border-top:1px solid #ececee"
                >
                    预览
                </nut-button>
                <nut-button @click="addRecipe">
                    发布
                </nut-button>
            </nut-buttongroup>
        </div>
    </section>
  </main>
</template>
<script>
import { Toast, Dialog } from 'vant';
export default {
    data() {
        return {
            title:'',
            menu:[],
            des:'',
            see:true,
            // 上传图片
            previewImg: '',
            previewType:'',
            classdata:[],
            showPicker:false,
            selects:'点击选择 > ',
            // 上传步骤
            fileList: [],
            temp:[],
            steps:[],
            flagnum:''
        }
    },
    mounted() {
        this.getclassfiy()
    },
    methods: {
        back(){
            if(this.previewImg !== '' || this.title !== '' || this.des !== '' || this.menu.length !== 0 || this.selects !== '点击选择 > ' || this.steps.length !== 0){
                Dialog.confirm({
                    title: '',
                    message: '是否保存到草稿？',
                    confirmButtonText:'是',
                    cancelButtonText:'否'
                }).then(() => {
                    console.log('存为草稿')
                    this.$axios.post('/addRecipe',{
                        title: this.title,
                        cover_pic: this.previewImg,
                        author: this.$store.state.userinfo.username,
                        des: this.des,
                        type: this.selects,
                        menu: this.menu,
                        step: this.steps,
                        time: new Date(),
                        style: this.previewType,
                        status: 2, //草稿 2
                    }).then(res=>{
                        console.log(res.data,'存入成功')
                        setTimeout(()=>{
                            this.$router.replace({path:'/recommend'})
                        },1200)
                    })
                }).catch(() => {
                    this.$router.go(-1)
                });
            }else{
                this.$router.go(-1)

            }
        },
        // 选择分类
        getclassfiy(){
            this.$axios.get('/classifyList').then(res=>{
                for(let i=0;i<res.data.length;i++){
                    this.classdata.push({
                        text : res.data[i].name,
                        children:[]
                    })
                    for(let j=0;j<res.data[i].kinds.length;j++){
                        this.classdata[i].children.push({
                            text: res.data[i].kinds[j]
                        }) 
                    }
                }
                // console.log(this.classdata,'arr')
            })
        },
        onConfirm(value) {
            this.selects = value;
            this.showPicker = false;
        },
        addRecipe(){
            if(this.previewImg == ''){
                Toast({
                    message:'请上传封面素材',
                    position:"bottom"
                });
            }else if(this.title == ''){
                Toast({
                    message:'请输入菜谱标题',
                    position:"bottom"
                });
            }else if(this.des == ''){
                Toast({
                    message:'请输入菜谱描述',
                    position:"bottom"
                });
            }else if(this.menu == ''){
                Toast({
                    message:'请输入菜谱食材',
                    position:"bottom"
                });
            }
            else if(this.selects == '点击选择 > '){
                Toast({
                    message:'请选择菜谱所属类型',
                    position:"bottom"
                });
            }
            else if(this.steps == ''){
                Toast({
                    message:'请上传菜谱步骤',
                    position:"bottom"
                });
            }else{
                this.$axios.post('/addRecipe',{
                    title: this.title,
                    cover_pic: this.previewImg,
                    author: this.$store.state.userinfo.username,
                    des: this.des,
                    type: this.selects,
                    menu: this.menu,
                    step: this.steps,
                    time: new Date(),
                    style: this.previewType,
                    status: 1, //普通用户发布的需要待审核或保存为草稿 2
                }).then(res=>{
                    console.log(res.data,'发布成功')
                    setTimeout(()=>{
                        this.$router.replace({path:'/recommend'})
                    },1200)
                })
            }
        },
        // 上传素材
        onSuccess(file,res){
            let resop = JSON.parse(res)
            this.previewImg = resop.result.url
            this.previewType = resop.type
        },
        onFail(file,res){
            alert('上传失败！');
        },
        //描述
        inputText(des){
            this.des = des
        },
        // 上传步骤图片
        afterread(file){
            let params = new FormData(); //创建form对象
            params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
            let config = {
                headers: { //添加请求头
                Authorization:
                    "Bearer " + window.localStorage.getItem("managementToken"),
                "Content-Type": "multipart/form-data"
                }
            };
            // let url = "";
            this.$axios.post('/upload',params,config).then(res=>{
                this.steps.push({temp:'',img:res.data.result.url})
                console.log(this.steps)
            })
        },
        // 删除步骤
        beforedelete(file){
            // let url = "";
            console.log(this.fileList)
            console.log(file.file.name,'删除')
            for(var i=0;i<this.fileList.length;i++){
                if(this.fileList[i].file.name == file.file.name){
                    this.flagnum = i
                }
            }
            this.$axios.post('/deleteImg',{
                url:this.steps[this.flagnum].img
            }).then(res => {
                console.log(res.data,'删除成功')
                this.fileList.splice(this.flagnum,1)
                this.steps.splice(this.flagnum,1)
            })
            
        },
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
	.l,.r{
		color: #ff5151;
		font-size: 16px;
    }
    /*网页内容*/
	.content{
		padding-top: 50px;
	}
    .menu >>> .nut-textinput input{
		padding: 0 0 0 10px;
    }
    .tit >>> .nut-textinput input{
		height: 3.5em !important;
		font-size: 16px;
        background-color: #f5f5f5;
        /* color: #aaaaaa; */
    }
    .tit >>> .nut-textinput input::-webkit-input-placeholder {
      /* color: #ffffff !important; */
      font-size: 16px !important; 
    }
    .des >>> .nut-textbox .txt-area textarea{
        /* color: #aaaaaa !important; */
        font-size: 16px;
        font-family: auto;
    }
    .des >>> .nut-textbox .txt-area textarea::-webkit-input-placeholder{
        color: #aaaaaa !important;
        font-size: 16px;
        font-family: auto;
    }
    .nut-tabselect .nut-tab-panel li{
        display: block;
        padding-left: none;
    }
    /* 封面素材 */
    .imgbox{
        padding-bottom:60%;
        overflow: hidden;
    }
    .imgbox img,.imgbox video{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        width:100%;
    }
    .imgbox div{
        position:absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .van-picker__cancel, .van-picker__confirm{
        color: #aaaaaa;
    }
    .des >>> .van-uploader{
        width: 100% !important;
    }
    .des >>> .van-uploader .van-uploader__wrapper{
        justify-content: center !important;
    }
    .des >>> .van-uploader  .van-uploader__wrapper .van-uploader__upload{
        /* width: 100% !important; */
    }
    
</style>