<template>
<a-row>
    <a-row style="margin:1rem;background:#fff">
        <a-card title="食谱信息" hoverable>
            <div style="margin:0 0 1em 0 ">
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>创建</span>
                    </template>
                    <a-button type="primary" icon='file-add' @click="add = true"></a-button>
                </a-tooltip>
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>编辑</span>
                    </template>
                    <a-button type="primary" style="margin-left:1em" icon='form' @click="openmodal('modify')"></a-button>
                </a-tooltip>
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>查看详情</span>
                    </template>
                    <a-button type="primary" style="margin-left:1em" icon='ellipsis' @click="openmodal('detail')"></a-button>
                </a-tooltip>
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>批量审核</span>
                    </template>
                    <a-button type="danger" ghost style="margin-left:1em" icon='safety-certificate' @click="sureMany"></a-button>
                </a-tooltip>
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>批量删除</span>
                    </template>
                    <a-button type="danger" style="margin-left:1em" icon='delete' @click="deleteMany"></a-button>
                </a-tooltip>
            </div>
            <a-table
            :dataSource="cookdata"
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
                    >查找</a-button>
                    <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">取消</a-button>
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
                        v-if="record.status == 1"
                        title="Sure to approve?"
                        @confirm="() => onSure(record._id)"
                        >
                        <a href="javascript:;" style="color:#ff4c39;padding:0 0.5em">审核</a>
                    </a-popconfirm>
                    <span v-else style="color:#aaa;padding:0 0.5em">审核</span>
                    /
                    <a-popconfirm
                        v-if="cookdata.length"
                        title="Sure to delete?"
                        @confirm="() => onDelete(record._id)"
                        >
                        <a href="javascript:;" style="color:#ff4c39;padding:0 0.5em">删除</a>
                    </a-popconfirm>
                </template>
                <template slot="status" slot-scope="text, record">
                    <a-tag
                        :color="record.status == 0 ? 'green' : record.status == 1 ? 'red' : record.status == 2 ? 'orange' : ''"
                    >
                    {{record.status == 0 ? '已发布' : record.status == 1 ? '待审核' : record.status == 2 ? '草 稿' : ''}} 
                    </a-tag>
                </template>
            </a-table>
        </a-card>
    </a-row>
    <Create :cc='add' @omodal='changemodal'></Create>
    <Edit :ee='edit' :record = "record" @omodal='changemodal'></Edit>
    <Details :dd='look' :record = "record" @omodal='changemodal'></Details>
</a-row>
</template>

<script>
import moment from 'moment';
import Create from './recipepro/createrecipe'
import Edit from './recipepro/editrecipe'
import Details from './recipepro/detail'
export default {
    components: { Edit, Details, Create },
    data() {
        return {
        searchText: "",
        searchInput: null,
        loading: false,
        add:false,
        edit:false,
        look:false,
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
        cookdata:[],
        columns: [
            {
            title: "食谱标题",
            dataIndex: "title",
            key: "title",
            scopedSlots: {
                filterDropdown: "filterDropdown",
                filterIcon: "filterIcon",
                customRender: "customRender"
            },
            onFilter: (value, record) =>
                record.title
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
            {title:'发布者',dataIndex:'author',key:'author'},
            {title:'发布时间',dataIndex:'time',key:'time'},
            {title:'评论数',dataIndex:'comments',key:'comments'},
            {title:'收藏数',dataIndex:'loves',key:'loves'},
            {title:'浏览数',dataIndex:'visits',key:'visits'},
            {title:'点赞数',dataIndex:'likes',key:'likes'},
            {title:'所属分类',dataIndex:'type',key:'type'},
            // {title:'状态',dataIndex:'status',key:'status',scopedSlots: { customRender: 'status' }},
            {
            title: "状态",
            dataIndex: "status",
            key: "status",
            scopedSlots: { customRender: 'status' },
                filters: [
                    {
                        text: '已发布',
                        value: '0',
                    },
                    {
                        text: '待审核',
                        value: '1',
                    },
                    {
                        text: '草稿',
                        value: '2',
                    }
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.status.indexOf(value) === 0,
                sorter: (a, b) => a.status - b.status,
                sortDirections: ['descend', 'ascend'],
            },
            // {title:'类型',dataIndex:'style',key:'style'},
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
            this.$axios({method:'get',url:'/recipeList'}).then((res => {
                this.cookdata = res.data
                this.loading = false
                // console.log(res.data)
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
            console.log(this.filters)
        },
        openmodal(name){
            console.log(this.filters,'this.filters')
            if(this.filters.length == 1){
                for(let i=0;i<this.cookdata.length;i++){
                    if(this.filters == this.cookdata[i]._id){
                        this.record = this.cookdata[i]
                        if(name=='modify'){
                            this.edit = true
                        }else if(name == 'detail'){
                            this.look = true
                        }
                    }
                }
            }else if(this.filters.length > 1){
                this.$notification['error']({
                    message: '一次只能编辑一条食谱！'
                })
            }else{
                this.$notification['error']({
                    message: '请先选择需要操作的信息！'
                })
            }
        },
        changemodal(val){
            this.add=val
            this.edit=val
            this.look=val
            this.getData()
        },
        onSure(key){ //审核
            this.$axios.post('/updateRecipe',{
                _id: key,
                status: 0,
            }).then(res=>{
                this.$emit('omodal',false)
                this.getData()
                console.log(res.data,'审核通过')
            })
        },
        sureMany(){
            var _this = this
            this.$confirm({
                title: '批量审核',
                content: '你确定批量审核通过选中的食谱吗?',
                cancelText: '取消',
                okText: '确定',
                okType:'danger',
                onOk() {
                    for(let i=0;i<_this.filters.length;i++){
                        _this.$axios.post('/updateRecipe',{
                            _id:_this.filters[i],
                            status: 0,
                            }).then(res=>{
                            // _this.cookdata = cookdata.filter(item => item._id !== _this.filters[i]);
                            // cookdata = [..._this.cookdata];
                            //  _this.filters.pop(_this.filters[i])
                            console.log(res.data,'批量审核成功')
                            _this.getData()
                        })
                    }
                    setTimeout(()=>{ //异步，删除后前端也要去除选中项
                        _this.filters = ''
                    },500)
                },
                onCancel() {},
            });
        },
        onDelete(key) { //删除食谱
            const cookdata = [...this.cookdata];
            this.$axios.post('/deleteRecipe',{_id:key}).then(res=>{
                this.cookdata = cookdata.filter(item => item._id !== key);
                if(this.filters){ //如果删除之前选中过需要将选择的标记删除
                    this.filters.pop(this.filters[0])
                }
            })
        },
        deleteMany(){ //批量删除用户
            var _this = this
            this.$confirm({
                title: '批量删除',
                content: '你确定批量删除选中的食谱吗?',
                cancelText: '取消',
                okText: '确定',
                okType:'danger',
                onOk() {
                    var cookdata = [..._this.cookdata];
                    for(let i=0;i<_this.filters.length;i++){
                        _this.$axios.post('/deleteRecipe',{_id:_this.filters[i]}).then(res=>{
                            _this.cookdata = cookdata.filter(item => item._id !== _this.filters[i]);
                            cookdata = [..._this.cookdata];
                            //  _this.filters.pop(_this.filters[i])
                            console.log(res.data)
                        })
                    }
                    setTimeout(()=>{ //异步，删除后前端也要去除选中项
                        _this.filters = ''
                    },1000)
                },
                onCancel() {},
            });
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