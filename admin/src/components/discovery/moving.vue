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
                v-if="movedata.length"
                title="Sure to delete?"
                @confirm="() => onDelete(record._id)"
                >
                <a href="javascript:;" style="color:#ff4c39">Delete</a>
                </a-popconfirm>
            </template>
            </a-table>
        </a-card>
    </a-row>
</a-row>
</template>

<script>

export default {
    data() {
        return {
        searchText: "",
        searchInput: null,
        filters:'',
        loading: false,
        pagination: {
            defaultPageSize: 10,
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
            {title:'素材',dataIndex:'media',key:'media'},
            {title:'描述内容',dataIndex:'content',key:'content'},
            {title:'发布时间',dataIndex:'time',key:'time'},
            {title:'评论数',dataIndex:'comments',key:'comments'},
            {title:'点赞数',dataIndex:'loves',key:'loves'},
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
        onDelete(key) { //删除日志
            const movedata = [...this.movedata];
            this.$axios.post('/deleteLog',{_id:key}).then(res=>{
                this.movedata = movedata.filter(item => item._id !== key);
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
                    var movedata = [..._this.movedata];
                    for(let i=0;i<_this.filters.length;i++){
                        _this.$axios.post('/deleteLog',{_id:_this.filters[i]}).then(res=>{
                            _this.movedata = movedata.filter(item => item._id !== _this.filters[i]);
                            movedata = [..._this.movedata];
                            console.log(res.data)
                        })
                    }
                },
                onCancel() {},
            });
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