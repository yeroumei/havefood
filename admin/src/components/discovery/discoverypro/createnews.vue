<template>
    <a-modal title="添加文章" v-model='add' @cancel='cancelhandle' style="top:5%" width='70%' @ok='addNews' cancelText="取消" okText="确定" :maskClosable='false'>
        
        <a-form-model
            class="modal"
            ref="ruleForm"
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-model-item label="标题" prop="title" :rules="{
                required: true,
                message: 'domain can not be null',
                trigger: 'blur',
            }">
                <a-input v-model="form.title" placeholder="请输入文章标题" />
            </a-form-model-item>
            <a-form-model-item label="封面素材" prop="fileList1" ref="fileList1">
                <a-upload
                    name="file"
                    class="avatar-uploader"
                    :showUploadList="false"
                    :fileList="form.fileList1" 
                    action="/api/upload"
                    :beforeUpload="beforeUpload"
                    @change="handleAva"
                >
                    <div>
                        <a-button > <a-icon type="upload" />上传素材</a-button>
                    </div>
                </a-upload>
                <a-modal :visible="ImgVisible" :footer="null" @cancel="handleCancel">
                    <img alt="example" v-if="imageUrl" style="width: 100%" :src="imageUrl" />
                </a-modal>
                <div style="width:21rem;height:10rem;overflow:hidden">  
                    <img width="100%" @click="ImgVisible = true" v-if="imageUrl" :src="imageUrl" alt="avatar" />
                </div>
            </a-form-model-item>
            
            <div v-for="(item,index) in form.newsdata">
                <a-form-model-item label="二级标题" v-if="item.sub !== undefined" :prop="'newsdata.' + index + '.sub'" :rules="{
                        required: true,
                        message: 'domain can not be null',
                        trigger: 'blur',
                    }"
                    >
                    <a-input v-model="item.sub" placeholder="请输入二级标题" style="width:90%">
                    </a-input>
                    <a-popover placement="right"  style="width:5%">
                        <template slot="content">
                            <span>删除二级标题</span>
                        </template>
                        <a-icon style="margin-left:1em"  type="minus-circle" @click="()=>{if(index==0) {item.sub = undefined;delete item.sub;} else form.newsdata.splice(index,1) }" />
                    </a-popover>
                </a-form-model-item>
                <a-form-model-item label="内容描述" v-if="item.text !== undefined" :prop="'newsdata.' + index + '.text'" :rules="{
                        required: true,
                        message: 'domain can not be null',
                        trigger: 'blur',
                    }">
                    <a-textarea v-model="item.text" placeholder="请输入文章的内容描述"
                        :autoSize="{ minRows: 3, maxRows: 3}"
                        style="width:90%"
                    />
                    <a-popover placement="right" style="width:5%">
                        <template slot="content">
                            <span>删除内容描述</span>
                        </template>
                        <a-icon style="margin-left:1em"  type="minus-circle" @click="()=>{if(index==0) {item.text = undefined;delete item.text;} else form.newsdata.splice(index,1) }"/>
                    </a-popover>
                </a-form-model-item>
                <a-form-model-item label="图片" v-if="item.img !== undefined" :prop="'newsdata.' + index + '.img'">
                    <a-upload
                        action="/api/upload"
                        listType="picture-card"
                        :fileList="item.img" 
                        @preview="handlePreview"
                        @change="({ fileList })=>{item.img = fileList}"
                        style="width:90%"
                    >
                        <div>
                            <a-icon type="plus" />
                            <div class="ant-upload-text">上传步骤</div>
                        </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                    <a-popover placement="right"  style="width:5%">
                        <template slot="content">
                            <span>删除图片</span>
                        </template>
                        <a-icon style="margin-left:1em"  type="minus-circle" @click="()=>{if(index==0) {item.img = undefined;delete item.img;} else form.newsdata.splice(index,1) }" />
                    </a-popover>
                </a-form-model-item>
            </div>
            <a-row style="display:flex;justify-content: center;width: 100%">
                <a-col :span="5" :offset="1">
                    <a-button type="dashed" style="width: 90%" @click="form.newsdata.push({sub:''})">
                        <a-icon type="plus" /> 添加二级标题
                    </a-button>
                </a-col>
                <a-col :span="5" :offset="1">
                    <a-button type="dashed" style="width: 90%" @click="form.newsdata.push({text:''})">
                        <a-icon type="plus" /> 添加描述内容
                    </a-button>
                </a-col>
                <a-col :span="5" :offset="1">
                    <a-button type="dashed" style="width: 90%" @click="form.newsdata.push({img:[]})">
                        <a-icon type="plus" /> 添加图片
                    </a-button>
                </a-col>
            </a-row>
        </a-form-model>
    </a-modal>
</template>

<script>
export default {
    props:['cc'],
    data() {
        return {

            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
            rules: {
                title: [
                { required: true, message: 'Please input Activity name'},
                ],
                newsdata: [
                    {
                        type: 'array',
                        required: true,
                        message: 'Please select at least one activity type',
                    },
                ],
            },
            form: {
                title: '',
                fileList1: [],
                newsdata: [{sub:'',text:'',img:[]}]
            },
            add:false,
            ImgVisible:false,
            previewVisible: false,
            imageUrl: '',
            previewImage: '',
        }
    },
    watch: {
        cc(val){
            this.add = val
        }
    },
    methods: {
        addNews(e){
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    for(var i=0;i<this.form.newsdata.length;i++){
                        if(this.form.newsdata[i].img){
                            for(var j=0;j<this.form.newsdata[i].img.length;j++){
                                this.form.newsdata[i].img[j] = this.form.newsdata[i].img[j].response.result.url
                            }
                        }
                    }
                    this.$axios.post('./addNews',{
                        cover_pic : this.imageUrl, 
                        title : this.form.title, 
                        author : this.$store.state.islogin.username, 
                        media : this.form.newsdata, 
                        time : new Date(),
                        status: 0
                    }).then(res => {
                        console.log(res.data)
                        this.$emit('omodal',false)
                        this.$refs.ruleForm.resetFields();
                    })
                    console.log(this.form,'this.form,')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancelhandle(){
            console.log('取消')
            this.$emit('omodal',false)
            this.$refs.ruleForm.resetFields();
            // this.form.resetFields();
        },
        //封面图
        handleAva(info) {
            console.log(info,'info')
            let fileList = [...info.fileList];
            //限制只能传一个图片
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
                return file;
            });
            this.form.fileList1 = fileList
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                this.imageUrl = info.file.response.result.url;
                // //判断是视频还是图片
                // if(/image/.test(info.file.type)) this.style = 'image'
                // if(/video/.test(info.file.type)) this.style = 'video'
                this.loading = false;
            }
        },
        beforeUpload(file) {
            /* 存储后缀名 */
            const imgTypeCheck  = /(.jpg|.jpeg|.png)$/.test(file.type);
            // const videoTypeCheck = /(.mp4)$/.test(file.type);
            const imgCheck = /image/.test(file.type);
            // const videoCheck = /video/.test(file.type);
            if(!imgCheck) {
                   this.$message.error("只能上传图片作为封面");
                    return false;
            }
            const isJPG = imgTypeCheck 
            console.log(isJPG,'isJPG')
            if (!isJPG) {
                this.$message.error('只能上传图片作为封面!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            console.log(isLt2M,'isLt2M')
            if (!isLt2M) {
                this.$message.error('图片最大不能超过2MB!');
            }
            return isJPG && isLt2M;
        },
        // 取消图片预览
        handleCancel() {
            this.previewVisible = false;
            this.ImgVisible = false;
        },
        handlePreview(file) {
            this.previewImage = file.url || file.thumbUrl;
            this.previewVisible = true;
        },
    },
}
</script>

<style scoped>
.modal{
    height: 435px;
    overflow-y: scroll;
}
</style>