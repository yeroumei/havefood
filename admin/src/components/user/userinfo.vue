<template>
<a-row>
    <!-- <a-row class="mytitle">
      用户信息
    </a-row> -->
    <a-row style="margin:1rem;background:#fff">
        <a-card title="用户信息" hoverable>
            <div style="margin:0 0 1em 0 ">
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>创建</span>
                    </template>
                    <a-button type="primary" icon='file-add' @click="create = true"></a-button>
                </a-tooltip>
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>编辑</span>
                    </template>
                    <a-button type="primary" style="margin-left:1em" icon='form' @click="openmodal('modify')"></a-button>
                </a-tooltip>
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>批量删除</span>
                    </template>
                    <a-button type="danger" style="margin-left:1em" icon='delete' @click="deleteMany"></a-button>
                </a-tooltip>
            </div>
            <a-table
            :dataSource="userdata"
            :columns="columns"
            :rowSelection="{onChange:onChange}"
            :pagination="pagination"
            rowKey='_id'
            bordered
            size = 'small'
            :loading="loading"
            >
                <div
                    slot="filterDropdown"
                    slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                    style="padding: 8px"
                >
                    <a-input
                    v-ant-ref="c => searchInput = c"
                    :placeholder="`Search ${column.dataIndex}`"
                    :value="selectedKeys[0]"
                    @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                    @pressEnter="() => handleSearch(selectedKeys, confirm)"
                    style="width: 188px; margin-bottom: 8px; display: block;"
                    />
                    <a-button
                    type="primary"
                    @click="() => handleSearch(selectedKeys, confirm)"
                    icon="search"
                    size="small"
                    style="width: 90px; margin-right: 8px"
                    >Search</a-button>
                    <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">Reset</a-button>
                </div>
                <a-icon
                    slot="filterIcon"
                    slot-scope="filtered"
                    type="search"
                    :style="{ color: filtered ? '#108ee9' : undefined }"
                />
                <template slot="customRender" slot-scope="text">
                    <span v-if="searchText">
                    <template
                        v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                    >
                        <mark
                        v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                        :key="i"
                        class="highlight"
                        >{{fragment}}</mark>
                        <template v-else>{{fragment}}</template>
                    </template>
                    </span>
                    <template v-else>{{text}}</template>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <a-popconfirm
                    v-if="userdata.length"
                    title="Sure to delete?"
                    @confirm="() => onDelete(record._id)"
                    >
                    <a href="javascript:;" style="color:#ff4c39">Delete</a>
                    </a-popconfirm>
                </template>
                <template slot="avatar" slot-scope="text, record">
                    <a-avatar v-if="record.avatar" :src="record.avatar" />
                    <a-avatar v-else style="backgroundColor: #ff4c39" icon="user" />
                </template>
                <template slot="sex" slot-scope="text, record">
                    <span v-if="record.sex == 'female'">女</span>
                    <span v-if="record.sex == 'male'">男</span>
                </template>
            </a-table>
        </a-card>
    </a-row>
    <a-modal title="编辑用户" v-model='edit' @cancel='cancelhandle' width='35%' @ok='editUser' cancelText="取消" okText="确定" :maskClosable='false'>
        <a-form :form='form' class="modal">
            <a-form-item label="用户名" v-bind="formlayout">
                <a-input v-decorator="['username',{
                    rules:[{required:true,message:'请输入用户名'},{pattern:/^[0-9a-zA-Z_]+$/,message:'请不要输入特殊符号'}],
                    initialValue:record.username
                }]" placeholder="请输入用户名">
                </a-input>
            </a-form-item>
            <a-form-item label="登录密码" v-bind="formlayout">
                <a-input v-decorator="['password',{
                    rules:[{required:true,message:'请输入用户登录密码'},{pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/,message:'必须包含大小写字母和数字的组合，长度在6-10之间'}],
                    initialValue:record.password
                }]" placeholder="请输入用户登录密码">
                </a-input>
            </a-form-item>
            <a-form-item label="用户类型" v-bind="formlayout">
                <a-select v-decorator="['type',{
                    rules:[{required:true,message:'请选择用户类型'}],
                    initialValue:record.type
                }]" placeholder="请选择用户类型">
                    <a-select-option value="admin">admin</a-select-option>
                    <a-select-option value="normal">normal</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="性别" v-bind="formlayout">
                <a-radio-group v-decorator="['sex',{
                    rules:[{required:true,message:'请选择用户性别'}],initialValue:record.sex
                }]">
                    <a-radio value="female">女</a-radio>
                    <a-radio value="male">男</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="手机号码" v-bind="formlayout">
                <a-input v-decorator="['number',{
                    rules:[{required:true,message:'请输入用户名'},{pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,message:'请输入正确的手机号码'}],
                    initialValue:record.number
                }]" placeholder="请输入用户手机号码">
                </a-input>
            </a-form-item>
            <a-form-item label="邮箱" v-bind="formlayout">
                <a-input v-decorator="['email',{
                    rules: [{type: 'email',message: '请输入正确的邮箱!'}],
                    initialValue:record.email
                        },
                    ]" placeholder="请输入用户邮箱">
                </a-input>
            </a-form-item>
            <a-form-item label="出生日期" v-bind="formlayout" >
                <a-date-picker  format='YYYY-MM-DD' style="width:100%" v-decorator="['birth',{
                    initialValue: moment(new Date(record.birth), 'YYYY-MM-DD')
                }]" />
            </a-form-item>
            
            <a-form-item label="头像" v-bind="formlayout" >
                <a-upload
                    v-decorator="['avatar']"
                    name="file"
                    action="/api/upload"
                    :headers="headers"
                    @change="handleChange"
                    :fileList="fileList"
                    :beforeUpload="beforeUpload"
                    list-type="picture"
                >
                    <a-button> <a-icon type="upload" /> 上传图片 </a-button>
                </a-upload>
            </a-form-item>
        </a-form>
    </a-modal>
    <Cuser :cc='create' @omodal='changemodal'></Cuser>

</a-row>
</template>

<script>
import Cuser from './userpro/createuser'
import moment from 'moment';
export default {
  components: { Cuser },
    data() {
        return {
        headers: {
            authorization: 'authorization-text',
        },
        fileList:[],
        searchText: "",
        searchInput: null,
        loading: false,
        create:false,
        edit:false,
        filters:'',
        record:'',
	    form:this.$form.createForm(this),
        formlayout:{
            labelCol:{span:6},
            wrapperCol:{span:14}
        },
        pagination: {
            defaultPageSize: 5,
            showTotal: total => `共 ${total} 条数据`,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
        },
        userdata:[],
        columns: [
            {
            title: "用户名",
            dataIndex: "username",
            key: "username",
            scopedSlots: {
                filterDropdown: "filterDropdown",
                filterIcon: "filterIcon",
                customRender: "customRender"
            },
            onFilter: (value, record) =>
                record.username
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                setTimeout(() => {
                    this.searchInput.focus();
                }, 0);
                }
            }
            },
            {title:'用户密码',dataIndex:'password',key:'password'},
            {title:'头像',dataIndex:'avatar',key:'avatar',scopedSlots: { customRender: 'avatar' }},
            {title:'性别',dataIndex:'sex',key:'sex',scopedSlots: { customRender: 'sex' },
                filters: [
                    {
                    text: '男',
                    value: 'male',
                    },
                    {
                    text: '女',
                    value: 'female',
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.sex.indexOf(value) === 0,
                sorter: (a, b) => a.sex.length - b.sex.length,
                sortDirections: ['descend', 'ascend'],
            },
            {title:'手机号码',dataIndex:'number',key:'number'},
            {title:'邮箱',dataIndex:'email',key:'email'},
            {title:'出生日期',dataIndex:'birth',key:'birth'},
            {title:'用户类型',dataIndex:'type',key:'type'},
            {title:'粉丝数',dataIndex:'myfans.length',key:'myfans.length'},
            {title:'关注数',dataIndex:'myloves.length',key:'myloves.length'},
            {title: '操作',dataIndex: 'operation',scopedSlots: { customRender: 'operation' }},
        ]
        };
    },
    mounted(){
        this.getData()
    },
    methods: {
        moment,
        getData(){
            this.loading = true
            this.$axios({method:'get',url:'/userList'}).then((res => {
                this.userdata = res.data
                this.loading = false
                console.log(res.data)
            }))
        },
        handleSearch(selectedKeys, confirm) {
            confirm();
            this.searchText = selectedKeys[0];
        },

        handleReset(clearFilters) {
            clearFilters();
            this.searchText = "";
        },
        cancelhandle(){
            this.form.resetFields();
        },
        onChange(selectedRowKeys, selectedRows){
            this.filters = selectedRowKeys
        },
        openmodal(name){
            if(this.filters.length == 1){
                for(let i=0;i<this.userdata.length;i++){
                    if(this.filters == this.userdata[i]._id){
                        this.record = this.userdata[i]
                        if(name=='modify'){
                            this.edit = true
                        }
                    }
                }
            }else if(this.filters.length > 1){
                this.$notification['error']({
                    message: '一次只能编辑一个用户！'
                })
            }else{
                this.$notification['error']({
                    message: '请先选择需要操作的信息！'
                })
            }
        },
        changemodal(val){
            this.create=val
            this.getData()
        },
        editUser(e){ //编辑用户
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
                    values.oldname = this.record.username
                    this.$axios.post('/updateUser',values).then(res =>{
                        if(res.data.flag == 1){
                            this.$notification['error']({
                                message: '修改失败',
                                description:
                                    '用户名重复',
                            });
                        }else{
                            this.getData()
                            this.form.resetFields();
                            this.fileList = []
                            this.edit = false
                            console.log(res.data)
                        }
                        
                    })
                }
            });
        },
        onDelete(key) { //删除用户
            const userdata = [...this.userdata];
            this.$axios.post('/deleteUser',{_id:key}).then(res=>{
                this.userdata = userdata.filter(item => item._id !== key);
            })
        },
        deleteMany(){ //批量删除用户
            var _this = this
            this.$confirm({
                title: '批量删除',
                content: '你确定批量删除选中的用户吗?',
                cancelText: '取消',
                okText: '确定',
                okType:'danger',
                onOk() {
                    var userdata = [..._this.userdata];
                    for(let i=0;i<_this.filters.length;i++){
                        _this.$axios.post('/deleteUser',{_id:_this.filters[i]}).then(res=>{
                            _this.userdata = userdata.filter(item => item._id !== _this.filters[i]);
                            userdata = [..._this.userdata];
                            console.log(res.data)
                        })
                    }
                },
                onCancel() {},
            });
        },
        

        // 上传图片的相关方法
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
            console.log(this.fileList, 'this.fileList');
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
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>