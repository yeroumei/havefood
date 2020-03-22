<template>
    <a-modal title="新增用户" v-model='createuser' @cancel='cancelhandle' width='35%' @ok='addUser' cancelText="取消" okText="确定" :maskClosable='false'>
    	<!-- <a-spin size="large" style="position:absolute;left:50%; top:50%; transform: translate(-50%, -50%);z-index:1;background:rgba(255,255,255,.6);padding:10%" tip="Submit successfully Loading..." v-if="spinning == true"></a-spin> -->
        <a-form :form='form' class="modal">
            <a-form-item label="用户名" v-bind="formlayout">
                <a-input v-decorator="['username',{
                    rules:[{required:true,message:'请输入用户名'}]
                }]" placeholder="请输入用户名">
                </a-input>
            </a-form-item>
            <a-form-item label="登录密码" v-bind="formlayout">
                <a-input v-decorator="['password',{
                    rules:[{required:true,message:'请输入用户登录密码'},{pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/,message:'必须包含大小写字母和数字的组合，长度在6-10之间'}]
                }]" placeholder="请输入用户登录密码">
                </a-input>
            </a-form-item>
            <a-form-item label="用户类型" v-bind="formlayout">
                <a-select v-decorator="['type',{
                    rules:[{required:true,message:'请选择用户类型'}]
                }]" placeholder="请选择用户类型">
                    <a-select-option value="admin">admin</a-select-option>
                    <a-select-option value="normal">normal</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="性别" v-bind="formlayout">
                <a-radio-group v-decorator="['sex',{
                    rules:[{required:true,message:'请选择用户性别'}]
                }]">
                    <a-radio value="female">女</a-radio>
                    <a-radio value="male">男</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="手机号码" v-bind="formlayout">
                <a-input v-decorator="['number',{
                    rules:[{required:true,message:'请输入用户名'},{pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,message:'请输入正确的手机号码'}]
                }]" placeholder="请输入用户手机号码">
                </a-input>
            </a-form-item>
            <a-form-item label="邮箱" v-bind="formlayout">
                <a-input v-decorator="['email',{
                    rules: [{type: 'email',message: '请输入正确的邮箱!'}],
                        },
                    ]" placeholder="请输入用户邮箱">
                </a-input>
            </a-form-item>
            <a-form-item label="出生日期" v-bind="formlayout" >
                <a-date-picker format='YYYY/MM/DD' style="width:100%" v-decorator="['birth',{
                }]" />
            </a-form-item>
            
            <!-- <a-form-item label="头像" v-bind="formlayout" >
                <a-upload
                    v-decorator="['avatar']"
                    name="file"
                    action="http://localhost:8080/api/upload"
                    :headers="headers"
                    @change="handleChange"
                    :fileList="fileList"
                    :beforeUpload="beforeUpload"
                    list-type="picture"
                >
                    <a-button> <a-icon type="upload" /> 上传图片 </a-button>
                </a-upload>
            </a-form-item> -->
        </a-form>
    </a-modal>
</template>

<script>
import moment from 'moment';

export default {
    props:['cc'],
    data() {
        return {
            form:this.$form.createForm(this),
            formlayout:{
                labelCol:{span:6},
                wrapperCol:{span:14}
            },
            // headers: {
            //     authorization: 'authorization-text',
            // },
            // fileList:[],
            createuser:false,
        }
    },
    mounted(){
        
    },
    watch:{
        cc(val){
            this.createuser=val
        }
    },
    methods: {
        moment,
        cancelhandle(e){
            this.$emit('omodal',false)
            this.form.resetFields();
        },
        addUser(e){ //添加用户
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if(values.avatar){ //判断有头像时
                    values.avatar = values.avatar.file.response.result.url //获取服务器返回的图片地址
                }
                // if(values.birth){
                //     values.birth = values.birth.format('YYYY/MM/DD')
                // }
                if (!err) {
                    console.log(values);
                    this.$axios.post('/addUser',values).then(res =>{
                        if(res.data.flag == 1){
                            this.$notification['error']({
                                message: '添加失败',
                                description:
                                    '该用户名已存在',
                            });
                        }else if(res.data.flag == 0){
                            this.form.resetFields();
                            this.$emit('omodal',false) //关闭弹窗
                        }else{
                            this.$notification['error']({
                                message: '错误',
                                description:
                                    '未知报错',
                            });
                        }
                        
                        
                    })
                }
            });
        },
        //上传头像的相关方法
        //上传前对上传的图片文件进行限制
        beforeUpload(file) {  
            /* 存储后缀名 */
            let extName = '';
            switch (file.type) {
            case 'image/png':
                extName = 'image/png';
                break;
            case 'image/x-png':
                extName = 'image/x-png';
                break;
            case 'image/jpg':
                extName = 'image/jpg';
                break;
            case 'image/jpeg':
                extName = 'image/jpeg';
                break;
            }
            const isJPG = file.type === extName;
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
        //上传
        handleChange(info) {
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
            this.fileList = fileList;
            // console.log(info.file, info.fileList);
            if(info.file.response){
                if (info.file.status === 'removed') { //移除，也从服务端中移除
                    this.$axios.post('/deleteImg',{
                        url: info.file.response.result.url
                    }).then(res => {
                        console.log(res.data,'已经从服务器上移除');
                    })
                }
                if (info.file.status !== 'uploading') {
                }
                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            }else{
                for(var i=0;i<info.fileList.length;i++){ //显示有误，没上传到服务器
                    info.fileList[i].status = 'error'
                }
            }
        },
    }
};
</script>
<style scoped>

</style>