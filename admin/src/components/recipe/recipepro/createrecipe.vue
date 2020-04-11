<template>
    <a-modal title="添加食谱" v-model='add' @cancel='cancelhandle' style="top:5%" width='70%' @ok='addRecipe' cancelText="取消" okText="确定" :maskClosable='false'>
    	<!-- <a-spin size="large" style="position:absolute;left:50%; top:50%; transform: translate(-50%, -50%);z-index:1;background:rgba(255,255,255,.6);padding:10%" tip="Submit successfully Loading..." v-if="spinning == true"></a-spin> -->
        <a-form :form='form' class="modal">
            <a-row>
                <a-col :span="12">
                    <a-form-item label="标题" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                        <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入食谱标题!' }]}]"
                            placeholder="请输入食谱标题"
                        />
                    </a-form-item>
                    <a-form-item label="封面素材" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                        <a-upload
                            name="file"
                            class="avatar-uploader"
                            :showUploadList="false"
                            :fileList="fileList1" 
                            action="/api/upload"
                            :beforeUpload="beforeUpload"
                            @change="handleAva"
                        >
                            <div>
                                <a-button> <a-icon type="upload" />上传素材</a-button>
                            </div>
                        </a-upload>
                        <!-- <div style="width:21rem;height:10rem;overflow:hidden">  
                            <video v-if="style == 'video'" :src="imageUrl" width="100%" height="100%" controls="controls" />
                            <img width="100%" height="100%" v-if="style == 'image'" :src="imageUrl" alt="avatar" />
                        </div> -->
                        <p style="color: #f5222d;" v-if="avatar_not">请上传素材</p>
                        <a-modal :visible="ImgVisible" :footer="null" @cancel="handleCancel">
                            <img alt="example" v-if="style == 'image'" style="width: 100%" :src="imageUrl" />
                        </a-modal>
                        <div style="width:21rem;height:10rem;overflow:hidden">  
                            <video v-if="style == 'video'" :src="imageUrl" width="100%" height="100%" controls="controls" />
                            <img width="100%" @click="ImgVisible = true" v-if="style == 'image' && imageUrl" :src="imageUrl" alt="avatar" />
                        </div>

                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="食谱描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                        <a-textarea
                            v-decorator="['des', { rules: [{ required: true, message: '请输入食谱的概要描述!' }]}]"
                            placeholder="请输入食谱的概要描述"
                            :autoSize="{ minRows: 3, maxRows: 6 }"
                        />
                    </a-form-item>
                    <a-form-item label="所属类型" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                        <a-cascader
                            :options="options"
                            @change="onChange"
                            :loadData="loadData"
                            placeholder="请选择所属类型"
                            changeOnSelect
                            v-decorator="['type', { rules: [{ required: true, message: '请选择所属类型' }]}]"
                        />
                    </a-form-item>
                    <!-- <a-form-item label="发布状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input
                            v-decorator="['status', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                        />
                    </a-form-item> -->
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="24">
                    <a-form-item label="食材" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                        <div v-for="i in tab">
                            <a-input
                                style="width: 45%;margin-right:2%"
                                v-decorator="[`menu[${i-1}].list`, { rules: [{ required: true, message: '请输入食材名字' }]}]"
                                placeholder="请输入食材名字"
                            />
                            <a-auto-complete allowClear
                                v-decorator="[`menu[${i-1}].size`,{
                                    rules:[{required:true,message:'请输入食材用量'}]
                                }]" 
                                :dataSource="edata"
                                style="width: 40%"
                                @change="handleSize"
                                placeholder="请输入食材用量"
                            />
                            <a-popover placement="right" v-if="i == 1">
                                <template slot="content">
                                    <span>添加食材</span>
                                </template>
                                <a-icon style="margin-left:1em" @click="tab++" type="plus-circle" />
                            </a-popover>
                            <a-popover placement="right" v-else>
                                <template slot="content">
                                    <span>删除食材</span>
                                </template>
                                <a-icon style="margin-left:1em" @click="tab--" type="minus-circle" />
                            </a-popover>
                            <!-- <a-icon v-if="item==1" style="margin-left:1em" @click="num++" type="plus-circle" />
                            <a-icon v-else style="margin-left:1em" @click="num--" type="minus-circle" /> -->
                        </div>
                    </a-form-item>
                </a-col>
            </a-row>     
            <a-row>   
                <a-col :span="24">
                    <a-form-item label="步 骤" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                        <a-upload
                            action="/api/upload"
                            listType="picture-card"
                            :fileList="fileList" 
                            @preview="handlePreview"
                            @change="handleChange"
                            >
                            <div>
                                <a-icon type="plus" />
                                <div class="ant-upload-text">上传步骤</div>
                            </div>
                        </a-upload>
                        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                            <img alt="example" style="width: 100%" :src="previewImage" />
                        </a-modal>
                        <div v-for="i in fileList.length">
                            <a-textarea
                                v-decorator="[`step[${i-1}].temp`, { rules: [{ required: true, message: '请输入食谱的步骤描述!' }] }]"
                                placeholder="请输入食谱的步骤描述"
                                :autosize="{ minRows: 2, maxRows: 2 }"
                                style="width:90%"
                            />
                        </div>
                        <p style="color: #f5222d;" v-if="step_not">请上传食谱步骤</p>

                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script>
import moment from 'moment';
export default {
    props:['cc'],
    data(){
        return {
            add:false,
            form:this.$form.createForm(this),
            formlayout:{
                labelCol:{span:6},
                wrapperCol:{span:14}
            },
            previewVisible: false,
            ImgVisible: false,
            previewImage: '',
            fileList: [],
            fileList1: [],
            edata:[],
            num:1,
            tab:1,
            loading: false,
            imageUrl: '',
            stepUrl:'',
            options:[],
            classdata:'',
            style:'',
            avatar_not:false,
            step_not:false
        }
    },
    mounted(){
        this.getclassfiy()
    },
    watch:{
        cc(val){
            this.add=val
        }
    },
    methods: {
        moment,
        getclassfiy(){
            this.$axios.get('/classifyList').then(res=>{
                this.classdata = res.data
                for(let i=0;i<res.data.length;i++){
                    this.options.push({
                        value : res.data[i].name,
                        label: res.data[i].name,
                        isLeaf:false
                    })
                }
            })
        },
        addRecipe(e){
            e.preventDefault();
            this.form.validateFields((err, values) => {
                console.log(values,'values')
                if (!err) {
                    if(this.imageUrl == ''){
                        this.avatar_not = true
                    }else if(this.fileList.length==0){
                        this.avatar_not = false
                        this.step_not = true
                    }else{
                        this.step_not = false
                        values.cover_pic = this.imageUrl
                        for(let i=0;i<this.fileList.length;i++){
                            values.step[i].img = this.fileList[i].response.result.url
                        }
                        this.$axios.post('/addRecipe',{
                            title: values.title,
                            cover_pic: values.cover_pic,
                            author: this.$store.state.islogin.username,
                            avatar: this.$store.state.islogin.avatar,
                            des: values.des,
                            type: values.type,
                            menu: values.menu,
                            step: values.step,
                            time: new Date(),
                            style: this.style,
                            status: 0, //管理员直接发布
                        }).then(res=>{
                            this.$emit('omodal',false)
                            this.form.resetFields();
                            this.imageUrl = ''
                            this.fileList = ''
                            this.tab = 1
                            console.log(res.data)
                        })
                    }
                    
                }
            })
        },
        cancelhandle(){
            console.log('取消')
            this.$emit('omodal',false)
            this.form.resetFields();
        },
        //步骤图
        handleCancel() {
            this.previewVisible = false;
            this.ImgVisible = false;
        },
        handlePreview(file) {
            this.previewImage = file.url || file.thumbUrl;
            this.previewVisible = true;
        },
        handleChange({ fileList }) {
            this.fileList = fileList;
            console.log(this.fileList,'this.fileListthis.fileListthis.fileList')
        },
        //食材
        handleSize(value) {
            console.log(typeof(value),'va')
            this.edata = !value || value.indexOf(' ') >= 0 ? [] : [
                `${value} 个`,
                `${value} 克`,
                `${value} 只`,
                `${value} 条`,
                `${value} 毫升`,
                `${value} 块`,
                `${value} 颗`,
                `${value} 勺`,
            ];
        },
        //封面图
        handleAva(info) {
            console.log(info,'info')

            let fileList = [...info.fileList];
            //限制只能传一个图片
            fileList = fileList.slice(-1);
            // 2. read from response and show file link
            fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
                return file;
            });
            this.fileList1 = fileList
            
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                this.imageUrl = info.file.response.result.url;
                //判断是视频还是图片
                if(/image/.test(info.file.type)) this.style = 'image'
                if(/video/.test(info.file.type)) this.style = 'video'
                this.loading = false;
            }
        },
        beforeUpload(file) {
            /* 存储后缀名 */
            const imgTypeCheck  = /(.jpg|.jpeg|.png)$/.test(file.type);
            const videoTypeCheck = /(.mp4)$/.test(file.type);
            const imgCheck = /image/.test(file.type);
            const videoCheck = /video/.test(file.type);
            if(!imgCheck && !videoCheck) {
                   this.$message.error("只能上传图片或视频");
                    return false;
            }
            const isJPG = imgTypeCheck || videoTypeCheck
            console.log(isJPG,'isJPG')
            if (!isJPG) {
                this.$message.error('You can only upload JPG file!');
            }
            // const isLt2M = file.size / 1024 / 1024 < 2;
            // console.log(isLt2M,'isLt2M')
            // if (!isLt2M) {
            //     this.$message.error('Image must smaller than 2MB!');
            // }
            // return isJPG && isLt2M;
            return isJPG;
        },
        // 选择类型
        onChange(value) {
            // this.style = value;
        },
        loadData(selectedOptions) {
            const targetOption = selectedOptions[selectedOptions.length - 1];
            targetOption.loading = true;
            targetOption.loading = false;
            var arr = []
            for(let i=0;i<this.classdata.length;i++){
                if(targetOption.value == this.classdata[i].name){
                    for(let j=0;j<this.classdata[i].kinds.length;j++){
                        arr.push({
                            label: this.classdata[i].kinds[j],
                            value: this.classdata[i].kinds[j],
                        })
                    }
                    targetOption.children = arr
                }
            }
            this.options = [...this.options];
        },
    }
    
}
</script>

<style scoped>
.modal{
    height: 435px;
    overflow-y: scroll;
}
</style>