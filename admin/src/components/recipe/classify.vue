<template>
<a-row>
    <!-- <a-row class="mytitle">
      用户信息
    </a-row> -->
    <a-row style="margin:1rem;background:#fff">
        <a-card title="分类信息" hoverable>
            <div style="margin:0 0 1em 0 ">
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>创建</span>
                    </template>
                    <a-button type="primary" icon='file-add' @click="create = true"></a-button>
                </a-tooltip>
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>重命名</span>
                    </template>
                    <a-button type="primary" style="margin-left:1em" icon='form' @click="openmodal('rename')"></a-button>
                </a-tooltip>
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>添加种类</span>
                    </template>
                    <a-button type="primary" style="margin-left:1em" icon='plus-circle' @click="openmodal('addkinds')"></a-button>
                </a-tooltip>
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>删除种类</span>
                    </template>
                    <a-button type="primary" style="margin-left:1em" icon='minus-circle' @click="openmodal('delkinds')"></a-button>
                </a-tooltip>
                
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>批量删除</span>
                    </template>
                    <a-button type="danger" style="margin-left:1em" icon='delete' @click="deleteMany"></a-button>
                </a-tooltip>
            </div>
            <a-table
            :dataSource="classifydata"
            :columns="columns"
            size="small"
            :rowSelection="{onChange:onChange}"
            :pagination="pagination"
            rowKey='_id'
            bordered
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
                v-if="classifydata.length"
                title="Sure to delete?"
                @confirm="() => onDelete(record._id)"
                >
                <a href="javascript:;" style="color:#ff4c39">Delete</a>
                </a-popconfirm>
            </template>
            </a-table>
        </a-card>
    </a-row>
    <a-modal title="创建分类" v-model='create' @cancel='cancelhandle' width='35%' @ok='createClassify' cancelText="取消" okText="确定" :maskClosable='false'>
        <a-form :form='form1' class="modal">
            <a-form-item label="类别名" v-bind="formlayout">
                <a-input v-decorator="['name',{
                    rules:[{required:true,message:'请输入类别名'}]
                }]" placeholder="请输入类别名">
                </a-input>
            </a-form-item>
            <a-form-item label="分类图标" v-bind="formlayout" >
                <a-upload
                    v-decorator="['icon']"
                    name="file"
                    action="/api/upload"
                    :headers="headers"
                    @change="handleChange"
                    :fileList="fileList"
                    :beforeUpload="beforeUpload"
                    list-type="picture"
                >
                    <a-button> <a-icon type="upload" /> 上传图标 </a-button>
                </a-upload>
            </a-form-item>
            <a-form-item label="种类名" v-bind="formlayout">
                <a-input v-for="item in num" v-decorator="[`kinds[${item-1}]`,{
                    rules:[{required:true,message:'请输入种类名'}]
                }]" placeholder="请输入种类名">
                </a-input>
            </a-form-item>
            <a-row>
                <a-col :span="6" :offset="6">
                <a-button type="dashed" style="width: 100%" @click="()=> num++">
                    <a-icon type="plus" /> Add field
                </a-button>
                </a-col>
                <a-col :span="8" >
                <a-button type="dashed" style="width: 100%" @click="()=> num--">
                    <a-icon type="plus" /> Delete field
                </a-button>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
    <a-modal title="重命名" v-model='rename' @cancel='cancelhandle' width='35%' @ok='renameClassify' cancelText="取消" okText="确定" :maskClosable='false'>
        <a-form :form='form2' class="modal">
            <a-form-item label="原类别名" v-bind="formlayout">
                <a-input v-decorator="['name',{
                    rules:[{required:true,message:'请输入类别名'}],initialValue:record.name
                }]">
                </a-input>
            </a-form-item>
            <!-- <a-form-item label="新类别名" v-bind="formlayout">
                <a-input v-decorator="['name',{
                    rules:[{required:true,message:'请输入类别名'}]
                }]" placeholder="请输入类别名">
                </a-input>
            </a-form-item> -->
            <a-form-item label="分类图标" v-bind="formlayout" >
                <a-upload
                    v-decorator="['icon']"
                    name="file"
                    action="/api/upload"
                    :headers="headers"
                    @change="handleChange"
                    :fileList="fileList"
                    :beforeUpload="beforeUpload"
                    list-type="picture"
                >
                    <a-button> <a-icon type="upload" /> 上传图标 </a-button>
                </a-upload>
            </a-form-item>
        </a-form>
    </a-modal>
    <a-modal title="添加种类" v-model='addkinds' @cancel='cancelhandle' width='35%' @ok='addKinds' cancelText="取消" okText="确定" :maskClosable='false'>
        <a-form :form='form3' class="modal">
            <a-form-item label="种类名" v-bind="formlayout">
                <a-input v-for="item in num" v-decorator="[`kinds[${item-1}]`,{
                    rules:[{required:true,message:'请输入种类名'}]
                }]" placeholder="请输入种类名">
                </a-input>
            </a-form-item>
            <a-row>
                <a-col :span="6" :offset="6">
                <a-button type="dashed" style="width: 100%" @click="()=> num++">
                    <a-icon type="plus" /> Add field
                </a-button>
                </a-col>
                <a-col :span="6" :offset="2">
                <a-button type="dashed" style="width: 100%" @click="()=> num--">
                    <a-icon type="plus" /> Delete field
                </a-button>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
    <a-modal title="删除种类" v-model='delkinds' @cancel='cancelhandle' width='35%' @ok='delKinds' cancelText="取消" okText="确定" :maskClosable='false'>
        <a-form :form='form4' class="modal">
            <a-form-item label="种类名" v-bind="formlayout">
                <a-select v-decorator="['kinds',{
                    rules:[{required:true,message:'请选择要删除的种类名'}]
                }]" placeholder="请选择要删除的种类名">
                    <a-select-option v-for="item in record.kinds"  :value="item">{{item}}</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>
</a-row>
</template>

<script>

export default {
    data() {
        return {
            headers: {
                authorization: 'authorization-text',
            },
            fileList:[],
            form1:this.$form.createForm(this),
            form2:this.$form.createForm(this),
            form3:this.$form.createForm(this),
            form4:this.$form.createForm(this),
            searchText: "",
            searchInput: null,
            filters:'',
            loading: false,
            record:'',
            create: false,
            rename: false,
            addkinds: false,
            delkinds: false,
            num:1,
            pagination: {
                defaultPageSize: 10,
                showTotal: total => `共 ${total} 条数据`,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15", "20"],
                onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
            },
            formlayout:{
                labelCol:{span:6},
                wrapperCol:{span:14}
            },
            classifydata:[],
            columns: [
                {
                title: "类别名",
                dataIndex: "name",
                key: "name",
                scopedSlots: {
                    filterDropdown: "filterDropdown",
                    filterIcon: "filterIcon",
                    customRender: "customRender"
                },
                onFilter: (value, record) =>
                    record.name
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
                {title:'种类',dataIndex:'kinds',key:'kinds',customRender:(arr) => {return arr.join(' \\ ')}},
                {title: '操作',dataIndex: 'operation',scopedSlots: { customRender: 'operation' }},
            ]
        };
    },
    mounted(){
        this.getData()
    },
    methods: {
        getData(){
            this.loading = true
            this.$axios({method:'get',url:'/classifyList'}).then((res => {
                this.classifydata = res.data
                this.loading = false
                console.log(res.data)
            }))
        },
        onDelete(key) { //删除
            const classifydata = [...this.classifydata];
            this.$axios.post('/deleteClassify',{_id:key}).then(res=>{
                this.classifydata = classifydata.filter(item => item._id !== key);
            })
        },
        handleSearch(selectedKeys, confirm) {
            confirm();
            this.searchText = selectedKeys[0];
        },

        handleReset(clearFilters) {
            clearFilters();
            this.searchText = "";
        },
        deleteMany(){
            var _this = this
            this.$confirm({
                title: '批量删除',
                content: '你确定批量删除选中的信息吗?',
                cancelText: '取消',
                okText: '确定',
                okType:'danger',
                onOk() {
                    var classifydata = [..._this.classifydata];
                    for(let i=0;i<_this.filters.length;i++){
                        _this.$axios.post('/deleteManyclassify',{_id:_this.filters[i]}).then(res=>{
                            _this.classifydata = classifydata.filter(item => item._id !== _this.filters[i]);
                            classifydata = [..._this.classifydata];
                            console.log(res.data)
                        })
                    }
                },
                onCancel() {},
            });
        },
        openmodal(name){
            if(this.filters.length == 1){
                for(let i=0;i<this.classifydata.length;i++){
                    if(this.filters == this.classifydata[i]._id){
                        this.record = this.classifydata[i]
                        if(name=='rename'){
                            this.rename = true
                        }else if(name == 'addkinds'){
                            this.addkinds = true
                        }else if(name == 'delkinds'){
                            this.delkinds = true
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
        createClassify(e){ //添加
            e.preventDefault();
            this.form1.validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    if(values.icon){
                        values.icon = values.icon.file.response.result.url //获取服务器返回的图片地址
                    }
                    this.$axios.post('/addClassify',values).then(res =>{
                        this.getData()
                        this.form1.resetFields();
                        this.fileList = []
                        this.num = 1 //种类的输入框
                        this.create = false
                        console.log(res.data)
                    })
                }
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
        renameClassify(e){ //改名
            e.preventDefault();
            this.form2.validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    values._id = this.record._id
                    // values.oldname = this.record.name
                    if(values.icon){
                        values.icon = values.icon.file.response.result.url //获取服务器返回的图片地址
                    }
                    this.$axios.post('/updateClassify',values).then(res =>{
                        this.getData()
                        this.form2.resetFields();
                        this.fileList = []
                        this.rename = false
                        console.log(res.data)
                    })
                }
            });
        },
        addKinds(e){ //添加种类（更新种类）
            e.preventDefault();
            this.form3.validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    this.record.kinds = this.record.kinds.concat(values.kinds)
                    // values._id = this.record._id
                    console.log(this.record.kinds)
                    this.$axios.post('/updateClassify',this.record).then(res =>{
                        this.getData()
                        this.form4.resetFields();
                        this.num = 1 //种类的输入框
                        this.addkinds = false
                        console.log(res.data)
                    })
                }
            });
        },
        delKinds(e){ //删除种类（更新种类）
            e.preventDefault();
            this.form4.validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    for(let i=0;i<this.record.kinds.length;i++){
                        if(this.record.kinds[i] == values.kinds){
                            console.log(i,'iiiiiiiiii')
                            this.record.kinds.splice(i, 1);
                        }
                    }
                    // values._id = this.record._id
                    console.log(this.record)
                    this.$axios.post('/updateClassify',this.record).then(res =>{
                        this.getData()
                        this.form4.resetFields();
                        this.delkinds = false
                        console.log(res.data)
                    })
                }
            });
        },
        cancelhandle(){
            this.form1.resetFields();
            this.form2.resetFields();
            this.form3.resetFields();
            this.num = 1 //种类的输入框
        },
        onChange(selectedRowKeys, selectedRows){
            this.filters = selectedRowKeys
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