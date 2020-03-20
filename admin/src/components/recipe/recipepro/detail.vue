<template>
    <a-modal title="食谱详情" v-model='look' @cancel='cancelhandle' style="top:5%" width='80%' @ok='checkAll' cancelText="取消" okText="确定" :maskClosable='false'>
    <!-- <a-card title="食谱详情信息" style="margin:1em 0 0 1em"> -->
        <a-form :form="form" @submit="handleSubmit" class="modal">
            <a-row>
                <a-col :span="12">
                    <a-form-item label="食谱封面" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                    <a-upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        :fileList="[
                            {
                                uid: '-1',
                                name: 'xxx.png',
                                status: 'done',
                                url: record.cover_pic,
                            },
                        ]"
                        @preview="handlePreview"
                        @change="handleChange"
                        style="padding:0 5em"
                        >
                        <!-- <div v-if="fileList.length == 0">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">Upload</div>
                        </div> -->
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                    </a-form-item>
                    <a-form-item label="发布者" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input v-decorator="['author',{
                                rules:[{required:true,message:'请输入发布者'}],initialValue:record.author
                            }]"
                            disabled
                        />
                    </a-form-item>
                    <a-form-item label="发布时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input
                            v-decorator="['time', { rules: [{ required: true, message: 'Please input your note!' }],initialValue:record.time }]"
                            disabled
                        />
                    </a-form-item>
                    <a-form-item label="所属类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input
                            v-decorator="['type', { rules: [{ required: true, message: 'Please input your note!' }],initialValue:record.type }]"
                            disabled
                        />
                    </a-form-item>
                    <a-form-item label="发布状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input
                            v-decorator="['status', { rules: [{ required: true, message: 'Please input your note!' }],initialValue:record.status }]"
                            disabled
                        />
                    </a-form-item>
                    <a-form-item label="评论数" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input
                            v-decorator="['comments', { rules: [{ required: true, message: 'Please input your note!' }],initialValue:record.comments }]"
                            disabled
                        />
                    </a-form-item>
                    <a-form-item label="收藏数" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input
                            v-decorator="['loves', { rules: [{ required: true, message: 'Please input your note!' }],initialValue:record.loves }]"
                            disabled
                        />
                    </a-form-item>
                    <a-form-item label="点赞数" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input
                            v-decorator="['likes', { rules: [{ required: true, message: 'Please input your note!' }],initialValue:record.likes }]"
                            disabled
                        />
                    </a-form-item>
                    <a-form-item label="浏览数" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input
                            v-decorator="['visits', { rules: [{ required: true, message: 'Please input your note!' }],initialValue:record.visits }]"
                            disabled
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入食谱标题!' }],initialValue:record.title }]"
                            placeholder="请输入食谱标题"
                            disabled
                        />
                    </a-form-item>
                    <a-form-item label="食谱描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-textarea
                            v-decorator="['des', { rules: [{ required: true, message: '请输入食谱的概要描述!' }],initialValue:record.des }]"
                            placeholder="请输入食谱的概要描述"
                            :autosize="{ minRows: 3, maxRows: 3 }"
                            disabled
                        />
                    </a-form-item>
                    <a-form-item label="食材" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <div v-for="(item,index) in record.menu">
                            <a-input
                                style="width: 44%"
                                v-decorator="['menu_name', { rules: [{ required: true, message: '请输入食材名字' }],initialValue:item.list }]"
                                placeholder="请输入食材名字"
                                disabled
                            />
                            <a-auto-complete allowClear
                                v-decorator="['menu_size',{
                                    rules:[{required:true,message:'请输入食材用量'}],initialValue:item.size
                                }]" 
                                :dataSource="edata"
                                style="width: 44%"
                                @change="handleSize"
                                placeholder="请输入食材用量"
                                disabled
                            />
                            <!-- <a-icon v-if="index==1" style="margin-left:1em" @click="num++" type="plus-circle" />
                            <a-icon v-else style="margin-left:1em" @click="num--" type="minus-circle" /> -->
                        </div>
                    </a-form-item>
                    <a-form-item label="步 骤" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
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
                                disabled
                                >
                                <!-- <div v-if="fileList.length < 3">
                                    <a-icon type="plus" />
                                    <div class="ant-upload-text">Upload</div>
                                </div> -->
                            </a-upload>
                            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                <img alt="example" style="width: 100%" :src="previewImage" />
                            </a-modal>
                            <a-textarea
                                v-decorator="['temp', { rules: [{ required: true, message: '请输入食谱的步骤描述!' }],initialValue:item.temp }]"
                                placeholder="请输入食谱的步骤描述"
                                :autosize="{ minRows: 2, maxRows: 2 }"
                                style="width:90%"
                                disabled
                            />
                            <!-- <a-popover placement="right" v-if="item==1">
                                <template slot="content">
                                    <span>添加步骤</span>
                                </template>
                                <a-icon style="margin-left:1em" @click="tab++" type="plus-circle" />
                            </a-popover>
                            <a-popover placement="right" v-else>
                                <template slot="content">
                                    <span>删除步骤</span>
                                </template>
                                <a-icon style="margin-left:1em" @click="tab--" type="minus-circle" />
                            </a-popover> -->
                        </div>
                    </a-form-item>
                </a-col>
                <!-- <a-col :span="12">
                    <a-form-item label="发布者" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-select style="width: 100%" @change="handleSelect" 
                            v-decorator="['author', { rules: [{ required: true, message: '请选择发布者!' }] 
                        }] " placeholder="请选择发布者">
                            <a-select-option value="jack">Jack</a-select-option>
                            <a-select-option value="lucy">Lucy</a-select-option>
                            <a-select-option value="Yiminghe">yiminghe</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col> -->
                
                <!-- <a-col :span="12">
                    <a-form-item label="形式" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <a-input
                            v-decorator="['style', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                        />
                    </a-form-item>
                </a-col> -->
                
                
                <!-- <a-button type="primary" html-type="submit">
                    Submit
                </a-button> -->
            </a-row>
        </a-form>
    <!-- </a-card> -->
</a-modal>
</template>

<script>

export default {
    name: 'cookbook',
    props:['dd','record'],
    data() {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'coordinated' }),
        
            previewVisible: false,
            previewImage: '',
            fileList: [
                // {
                //     uid: '-1',
                //     name: 'xxx.png',
                //     status: 'done',
                //     url: 'http://localhost:3000/serverImage/20200310001523_14784.png',
                // },
            ],
            edata:[],
            num:1,
            details:'',
            look:false
        };
    },
    watch:{
        dd(val){
            console.log(val)
            this.look=val
        }
    },
    methods: {
        gg(){
            alert('kkk')
        },
        //封面图
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

        cancelhandle(){
            this.$emit('omodal',false)
        },
        checkAll(){
            console.log('详情')
            this.$emit('omodal',false)
        },
        handleSelect(){
            console.log('选择发布者')
        },
        handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
            console.log('Received values of form: ', values);
            }
        });
        },
        handleSelectChange(value) {
        console.log(value);
        this.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
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