<template>
<a-row>
    <!-- <a-row class="mytitle">
      用户信息
    </a-row> -->
    <a-row style="margin:1rem;background:#fff">
        <a-card title="动态分享" hoverable>
            <div style="margin:0 0 1em 0 ">
                <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>查看详情</span>
                    </template>
                    <a-button type="primary" icon='ellipsis' @click="openmodal('detail')"></a-button>
                </a-tooltip>
                <!-- <a-tooltip placement='top'>
                    <template slot='title'>
                        <span>编辑</span>
                    </template>
                    <a-button type="primary" style="margin-left:1em" icon='form' @click="openmodal('modify')"></a-button>
                </a-tooltip> -->
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
            :dataSource="movedata"
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
                    v-if="record.status == 1"
                    title="Sure to approve?"
                    @confirm="() => onSure(record._id)"
                    >
                    <a href="javascript:;" style="color:#ff4c39;padding:0 0.5em">审核</a>
                </a-popconfirm>
                <span v-else style="color:#aaa;padding:0 0.5em">审核</span>
                /
                <a-popconfirm
                v-if="movedata.length"
                title="Sure to delete?"
                @confirm="() => onDelete(record._id)"
                >
                <a href="javascript:;" style="color:#ff4c39">删除</a>
                </a-popconfirm>
            </template>
            <template slot="status" slot-scope="text, record">
                <a-tag
                    :color="record.status == 0 ? 'green' : record.status == 1 ? 'red' : record.status == 2 ? 'orange' : ''"
                >
                {{record.status == 0 ? '已发布' : record.status == 1 ? '待审核' : record.status == 2 ? '草稿' : ''}} 
                </a-tag>
            </template>
            <span slot="media" slot-scope="media">
                <a-tag
                    :color="media.type == 'video' ? 'orange' :'#f50'"
                >
                {{media.type == 'video' ? '视频' :'图文'}} 
                </a-tag>
            </span>
            </a-table>
        </a-card>
    </a-row>
    <Details :dd='look' :record = "record" @omodal='changemodal'></Details>
</a-row>
</template>
<script>
import Details from './discoverypro/movedetail'
export default {
    components: { Details },
    data() {
        return {
        searchText: "",
        searchInput: null,
        filters:'',
        loading: false,
        look:false,
        record:'',
        pagination: {
            defaultPageSize: 5,
            showTotal: total => `共 ${total} 条数据`,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
        },
        movedata:[],
        columns: [
            {
            title: "发布者",
            dataIndex: "author",
            key: "author",
            scopedSlots: {
                filterDropdown: "filterDropdown",
                filterIcon: "filterIcon",
                customRender: "customRender"
            },
            onFilter: (value, record) =>
                record.author
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
            {title:'描述',dataIndex:'content',key:'content', 
                ellipsis: true,
                sorter: (a, b) => a.content.length - b.content.length,
                sortDirections: ['descend', 'ascend'],},
            {title:'素材',dataIndex:'media',key:'media',scopedSlots: { customRender: 'media' },
                filters: [
                    {
                    text: '视频',
                    value: 'video',
                    },
                    {
                    text: '图文',
                    value: 'image',
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.media.type == value,
                sortDirections: ['descend', 'ascend']},
            {title:'发布时间',dataIndex:'time',key:'time',
                ellipsis: true,
                sorter: (a, b) => Date.parse(a.time) - Date.parse(b.time),
                sortDirections: ['descend', 'ascend'],
                scopedSlots: {
                    filterDropdown: "filterDropdown",
                    filterIcon: "filterIcon",
                    customRender: "customRender",
                    customRender: 'time'
                },
                onFilter: (value, record) =>
                    record.time
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
            {title:'评论数',dataIndex:'comments',key:'comments'},
            {title:'点赞数',dataIndex:'loves',key:'loves'},
            {title:'状态',dataIndex:'status',key:'status',
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
            this.$axios({method:'get',url:'/moveList'}).then((res => {
                this.movedata = res.data
                this.loading = false
                console.log(res.data)
            }))
        },
        onDelete(key) { //删除
            console.log(key,'这是删除的 ')
            const movedata = [...this.movedata];
            this.$axios.post('/deleteMoves',{_id:key}).then(res=>{
                console.log(res.data)
                this.movedata = movedata.filter(item => item._id !== key);
            })
        },
        onSure(key){
            this.$axios.post('/sureMoves',{
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
                content: '你确定批量审核通过选中的动态吗?',
                cancelText: '取消',
                okText: '确定',
                okType:'danger',
                onOk() {
                    for(let i=0;i<_this.filters.length;i++){
                        _this.$axios.post('/sureMoves',{
                            _id:_this.filters[i],
                            status: 0,
                            }).then(res=>{
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
        // 用户名查询
        handleSearch(selectedKeys, confirm) {
            confirm();
            this.searchText = selectedKeys[0];
        },
        handleReset(clearFilters) {
            clearFilters();
            this.searchText = "";
        },
        // 批量删除
        deleteMany(){
            var _this = this
            this.$confirm({
                title: '批量删除',
                content: '你确定批量删除选中的信息吗?',
                cancelText: '取消',
                okText: '确定',
                okType:'danger',
                onOk() {
                    var movedata = [..._this.movedata];
                    for(let i=0;i<_this.filters.length;i++){
                        _this.$axios.post('/deleteMoves',{_id:_this.filters[i]}).then(res=>{
                            _this.movedata = movedata.filter(item => item._id !== _this.filters[i]);
                            movedata = [..._this.movedata];
                            console.log(res.data)
                        })
                    }
                    setTimeout(()=>{ //异步，删除后前端也要去除选中项
                        this.filters = ''
                    },1000)
                },
                onCancel() {},
            });
        },
        onChange(selectedRowKeys, selectedRows){
            this.filters = selectedRowKeys
        },
        openmodal(name){
            console.log(this.filters,'this.filters')
            if(this.filters.length == 1){
                for(let i=0;i<this.movedata.length;i++){
                    if(this.filters == this.movedata[i]._id){
                        this.record = this.movedata[i]
                        console.log(this.record,'this.record')
                        if(name == 'detail'){
                            this.look = true
                        }
                    }
                }
            }else if(this.filters.length > 1){
                this.$notification['error']({
                    message: '一次只能编辑一条信息！'
                })
            }else{
                this.$notification['error']({
                    message: '请先选择需要操作的信息！'
                })
            }
        },
        changemodal(val){
            this.look=val
            this.getData()
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