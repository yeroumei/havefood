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
                    <a-form-item label="食谱封面" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
s                        <div>
                        <a-upload
                            name="file"
                            listType="picture"
                            class="avatar-uploader"
                            :showUploadList="false"
                            :fileList="fileList1" 
                            action="/api/upload"
                            :beforeUpload="beforeUpload"
                            @change="handleAva"
                        >
                            <video v-if="type == 'video'" :src="imageUrl" width="100%" height="100%" controls="controls" />
                            <img width="100%" v-else-if="type == 'image'" :src="imageUrl" alt="avatar" />
                            <div v-else >
                                <a-icon :type="loading ? 'loading' : 'plus'" />
                                <div class="ant-upload-text">Upload</div>
                            </div>
                        </a-upload>
                        </div>
                    </a-form-item>
                    
                </a-col>
                <a-col :span="12">
                    <a-form-item label="食谱描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                        <a-textarea
                            v-decorator="['des', { rules: [{ required: true, message: '请输入食谱的概要描述!' }]}]"
                            placeholder="请输入食谱的概要描述"
                            :autosize="{ minRows: 3, maxRows: 3 }"
                        />
                    </a-form-item>
                    <a-form-item label="所属类型" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                        <a-cascader
                            :options="options"
                            @change="onChange"
                            :loadData="loadData"
                            placeholder="Please select"
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
                    <!-- <a-form-item label="发布时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-date-picker  format='YYYY/MM/DD' style="width:100%" v-decorator="['time',
                            { rules: [{ required: true, message: '请输入发布时间!' }] }
                        ]" />
                    </a-form-item> -->
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
                                <div class="ant-upload-text">Upload</div>
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
                            <!-- <a-popover placement="right" v-if="i == 1">
                                <template slot="content">
                                    <span>添加步骤</span>
                                </template>
                                <a-icon style="margin-left:1em" @click="num++" type="plus-circle" />    
                            </a-popover>
                            <a-popover placement="right" v-else>
                                <template slot="content">
                                    <span>删除步骤</span>
                                </template>
                                <a-icon style="margin-left:1em" @click="num--" type="minus-circle" />
                            </a-popover> -->
                        </div>
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
            type:''
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
                    if(this.imageUrl){
                        values.cover_pic = this.imageUrl
                    }
                    if(this.fileList.length!==0){
                        for(let i=0;i<this.fileList.length;i++){
                            values.step[i].img = this.fileList[i].response.result.url
                        }
                    }
                    this.$axios.post('/addRecipe',{
                        title: values.title,
                        cover_pic: values.cover_pic,
                        author: this.$store.state.islogin.username,
                        des: values.des,
                        type: values.type,
                        menu: values.menu,
                        step: values.step,
                        time: new Date(),
                        style: "形式",
                        status:'状态',
                    }).then(res=>{
                        this.$emit('omodal',false)
                        console.log(res.data)
                    })
                }
            })
        },
        cancelhandle(){
            console.log('取消')
            this.$emit('omodal',false)
            // this.form.resetFields();
        },
        //步骤图
        handleCancel() {
            this.previewVisible = false;
        },
        handlePreview(file) {
            this.previewImage = file.url || file.thumbUrl;
            this.previewVisible = true;
        },
        handleChange({ fileList }) {
            this.fileList = fileList;
            console.log(this.fileList,'this.fileListthis.fileListthis.fileList')
        },
        //步骤图
        // handleStep(info) {
        //     console.log(info)
        //     if (info.file.status === 'uploading') {
        //         this.loading = true;
        //         return;
        //     }
        //     if (info.file.status === 'done') {
        //         this.stepUrl = info.fileList[0].response.result.url;
        //         this.loading = false;
        //         return info.fileList[0].response.result.url;
        //     }
        // },
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
                if(/image/.test(info.file.type)) this.type = 'image'
                if(/video/.test(info.file.type)) this.type = 'video'
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
            const isLt2M = file.size / 1024 / 1024 < 2;
            console.log(isLt2M,'isLt2M')
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 选择类型
        onChange(value) {
            // this.type = value;
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