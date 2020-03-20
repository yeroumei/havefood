<template>
    <a-modal title="编辑食谱" v-model='edit' @cancel='cancelhandle' style="top:5%" width='70%' @ok='editRecipe' cancelText="取消" okText="确定" :maskClosable='false'>
    	<!-- <a-spin size="large" style="position:absolute;left:50%; top:50%; transform: translate(-50%, -50%);z-index:1;background:rgba(255,255,255,.6);padding:10%" tip="Submit successfully Loading..." v-if="spinning == true"></a-spin> -->
        <a-form :form='form' class="modal">
            <a-row>
                <a-col :span="12">
                    <a-form-item label="食谱封面" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                    <!-- <span style="line-height:104px;padding:0 5em">食谱封面，可点击查看</span> -->
                    <a-upload
                        name="avatar"
                        listType="picture-card"
                        class="avatar-uploader"
                        :showUploadList="false"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :beforeUpload="beforeUpload"
                        @change="handleAva"
                    >
                        <img width="100%" v-if="imageUrl" :src="imageUrl" alt="avatar" />
                        <div v-else>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload>
                    </a-form-item>
                    <a-form-item label="步 骤" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                        <div v-for="(item,index) in record.step">
                            <a-upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                :fileList="[
                                    {
                                        uid: '-1',
                                        name: 'xxx.png',
                                        status: 'done',
                                        url: item.img,
                                    },
                                ]"
                                @preview="handlePreview"
                                @change="handleChange"
                                >
                                <div v-if="fileList.length < 3">
                                    <a-icon type="plus" />
                                    <div class="ant-upload-text">Upload</div>
                                </div>
                            </a-upload>
                            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                <img alt="example" style="width: 100%" :src="previewImage" />
                            </a-modal>
                            <a-textarea
                                v-decorator="['temp', { rules: [{ required: true, message: '请输入食谱的步骤描述!' }],initialValue:item.temp }]"
                                placeholder="请输入食谱的步骤描述"
                                :autosize="{ minRows: 2, maxRows: 2 }"
                                style="width:90%"
                            />
                            <a-popover placement="right" v-if="index==0">
                                <template slot="content">
                                    <span>添加步骤</span>
                                </template>
                                <a-icon style="margin-left:1em" @click="()=>{record.step.push({temp:'',img:''})}" type="plus-circle" />
                            </a-popover>
                            <a-popover placement="right" v-else>
                                <template slot="content">
                                    <span>删除步骤</span>
                                </template>
                                <a-icon style="margin-left:1em" @click="()=>{record.step.pop(record.step[index])}" type="minus-circle" />
                            </a-popover>
                        </div>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入食谱标题!' }],initialValue:record.title }]"
                            placeholder="请输入食谱标题"
                        />
                    </a-form-item>
                    <a-form-item label="食谱描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-textarea
                            v-decorator="['des', { rules: [{ required: true, message: '请输入食谱的概要描述!' }],initialValue:record.des }]"
                            placeholder="请输入食谱的概要描述"
                            :autosize="{ minRows: 3, maxRows: 3 }"
                        />
                    </a-form-item>
                    <a-form-item label="食材" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <div v-for="(item,index) in record.menu">
                            <a-input
                                style="width: 44%"
                                v-decorator="['menu_name', { rules: [{ required: true, message: '请输入食材名字' }],initialValue:item.list }]"
                                placeholder="请输入食材名字"
                            />
                            <a-auto-complete allowClear
                                v-decorator="['menu_size',{
                                    rules:[{required:true,message:'请输入食材用量'}],initialValue:item.size
                                }]" 
                                :dataSource="edata"
                                style="width: 43%"
                                @change="handleSize"
                                placeholder="请输入食材用量"
                            />
                            <a-popover placement="right" v-if="index==0">
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
                    <a-form-item label="发布时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-date-picker  format='YYYY/MM/DD' style="width:100%" v-decorator="['time',
                            { rules: [{ required: true, message: '请输入发布时间!' }],initialValue:moment(record.time, 'YYYY/MM/DD') }
                        ]" />
                    </a-form-item>
                    <a-form-item label="所属类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input
                            v-decorator="['type', { rules: [{ required: true, message: 'Please input your note!' }],initialValue:record.type }]"
                        />
                    </a-form-item>
                    <a-form-item label="发布状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input
                            v-decorator="['status', { rules: [{ required: true, message: 'Please input your note!' }],initialValue:record.status }]"
                        />
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
            previewImage: '',
            fileList: [],
            edata:[],
            num:1,
            tab:1,
            loading: false,
            imageUrl: '',
        }
    },
    mounted(){
        
    },
    watch:{
        ee(val){
            this.edit=val
            
        },
        record(val){
            console.log(val,'record')
            this.imageUrl = val.cover_pic
            // for(var i=0;i<val.step.lenght;i++){
            //     this.fileList[i].url = val.step[i].img
            // }
        }
    },
    methods: {
        moment,
        editRecipe(e){
            console.log('编辑')

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
            if (info.file.status === 'uploading') {
            this.loading = true;
            return;
            }
            if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                this.imageUrl = imageUrl;
                this.loading = false;
            });
            }
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            if (!isJPG) {
            this.$message.error('You can only upload JPG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
            this.$message.error('Image must smaller than 2MB!');
            }
            return isJPG && isLt2M;
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