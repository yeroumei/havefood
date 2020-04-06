<template>
    <a-modal title="编辑食谱" v-model='edit' @cancel='cancelhandle' style="top:5%" width='70%' @ok='editRecipe' cancelText="取消" okText="确定" :maskClosable='false'>
    	<!-- <a-spin size="large" style="position:absolute;left:50%; top:50%; transform: translate(-50%, -50%);z-index:1;background:rgba(255,255,255,.6);padding:10%" tip="Submit successfully Loading..." v-if="spinning == true"></a-spin> -->
        <a-form :form='form' class="modal">
            <a-row>
                <a-col :span="12">
                    <a-form-item label="标题" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                        <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入食谱标题!' }],initialValue:record.title}]"
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
                                <a-button > <a-icon type="upload" />上传素材</a-button>
                            </div>
                        </a-upload>
                        <a-modal :visible="ImgVisible" :footer="null" @cancel="handleCancel">
                            <img alt="example" v-if="style == 'image'" style="width: 100%" :src="imageUrl" />
                        </a-modal>
                        <div style="width:21rem;height:10rem;overflow:hidden">  
                            <video v-if="style == 'video'" :src="imageUrl" width="100%" height="100%" controls="controls" />
                            <img width="100%" @click="ImgVisible = true" v-if="style == 'image'" :src="imageUrl" alt="avatar" />
                        </div>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="食谱描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                        <a-textarea
                            v-decorator="['des', { rules: [{ required: true, message: '请输入食谱的概要描述!' }],initialValue:record.des}]"
                            placeholder="请输入食谱的概要描述"
                            :autoSize="{ minRows: 3, maxRows: 10 }"
                        />
                    </a-form-item>
                    <a-form-item label="所属类型" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                        <a-cascader
                            :options="options"
                            @change="onChange"
                            :loadData="loadData"
                            placeholder="请选择所属类型"
                            v-decorator="['type', { rules: [{ required: true, message: '请选择所属类型' }],initialValue:record.type}]"
                        />
                    </a-form-item>
                    <!-- <a-form-item label="发布状态" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                        <a-select
                            v-decorator="[
                            'status',
                            { rules: [{ required: true, message: '请选择发布状态' }],initialValue:record.status },
                            ]"
                            placeholder="请选择发布状态"
                        >
                            <a-select-option value="已发布">已发布</a-select-option>
                            <a-select-option value="待审核">待审核</a-select-option>
                            <a-select-option value="草稿">草稿</a-select-option>
                        </a-select>
                    </a-form-item> -->
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="24">
                    <a-form-item label="食材" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
                        <div v-for="(item,index) in record.menu">
                            <a-input
                                style="width: 45%;margin-right:2%"
                                v-decorator="[`menu[${index}].list`, { rules: [{ required: true, message: '请输入食材名字' }],initialValue:item.list}]"
                                placeholder="请输入食材名字"
                            />
                            <a-auto-complete allowClear
                                v-decorator="[`menu[${index}].size`,{
                                    rules:[{required:true,message:'请输入食材用量'}],initialValue:item.size
                                }]" 
                                :dataSource="edata"
                                style="width: 40%"
                                @change="handleSize"
                                placeholder="请输入食材用量"
                            />
                            <a-popover placement="right" v-if="index == 0">
                                <template slot="content">
                                    <span>添加食材</span>
                                </template>
                                <a-icon style="margin-left:1em" @click="()=>{record.menu.push({list:'',size:''})}" type="plus-circle" />
                            </a-popover>
                            <a-popover placement="right" v-else>
                                <template slot="content">
                                    <span>删除食材</span>
                                </template>
                                <a-icon style="margin-left:1em" @click="()=>{record.menu.pop(record.menu[index])}" type="minus-circle" />
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
                                <div class="ant-upload-text">上传步骤</div>
                            </div>
                        </a-upload>
                        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                            <img alt="example" style="width: 100%" :src="previewImage" />
                        </a-modal>
                        <a-form-item :label="`步骤${i}`" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }"  v-for="i in fileList.length">
                            <!-- <div  v-for="i in fileList.length"> -->
                                <a-textarea
                                    v-decorator="[`step[${i-1}].temp`, { rules: [{ required: true, message: '请输入步骤描述' }],initialValue:records.step[i-1].temp }]"
                                    placeholder="请输入食谱的步骤描述"
                                    :autoSize="{ minRows: 3, maxRows: 6 }"
                                    style="width:90%"
                                />
                            <!-- </div> -->
                        </a-form-item>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script>
import moment from 'moment';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default {
    props:['ee','record'],
    data(){
        return {
            edit:false,
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
            records:'',
            style:''
        }
    },
    mounted(){
        this.getclassfiy()
    },
    watch:{
        ee(val){
            this.edit=val
            
        },
        record(val){
            this.fileList = []
            this.records = val
            this.imageUrl = val.cover_pic
            this.style = val.style
            for(var i=0;i<val.step.length;i++){
            console.log(val,'编辑信息')
                this.fileList.push({
                    uid: i,
                    name:'init.png',
                    status: 'done',
                    url: val.step[i].img,
                })
            }

        },
        // fileList(val){
        //     this.records.step.push({
        //         temp:''
        //     })
        // }
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
                console.log(this.options,'this.options')
            })
        },
        editRecipe(e){
            console.log('编辑')
            this.form.validateFields((err, values) => {
                console.log(this.fileList,'this.fileList')
                if (!err) {
                    if(this.imageUrl){
                        values.cover_pic = this.imageUrl
                    }
                    if(this.fileList.length!==0){
                        for(let i=0;i<this.fileList.length;i++){
                            if(this.fileList[i].response){
                                values.step[i].img = this.fileList[i].response.result.url
                            }else{
                                values.step[i].img = this.fileList[i].url
                            }
                        }
                    }
                    this.$axios.post('/updateRecipe',{
                        _id: this.records._id,
                        title: values.title,
                        cover_pic: values.cover_pic,
                        // author: this.$store.state.islogin.username,
                        des: values.des,
                        type: values.type,
                        menu: values.menu,
                        step: values.step,
                        // time: new Date(),
                        style: this.style,
                        status: values.status,
                    }).then(res=>{
                        this.$emit('omodal',false)
                        console.log(res.data)
                    })
                    console.log(values,'values')

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
            this.ImgVisible = false;
        },
        handlePreview(file) {
            this.previewImage = file.url || file.thumbUrl;
            this.previewVisible = true;
        },
        handleChange({ fileList }) {
            this.fileList = fileList;
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
            fileList = fileList.map(file => {
            if (file.response) {
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
            console.log(selectedOptions,'selectedOptions')
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