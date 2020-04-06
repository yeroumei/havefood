<template>
    <a-modal title="食谱详情" v-model='look' @cancel='cancelhandle' style="top:5%" width='80%' @ok='checkAll' cancelText="取消" okText="确定" :maskClosable='false'>
        <a-form :form="form" @submit="handleSubmit" class="modal">
            <a-row>
                <a-col :span="12">
                    <a-form-item label="食谱封面" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <div style="width:21rem;height:10rem;overflow:hidden">  
                            <a-modal :visible="ImgVisible" :footer="null" @cancel="handleCancel">
                                <img alt="avatar" v-if="record.style == 'image'" style="width: 100%" :src="record.cover_pic" />
                            </a-modal>
                            <video v-if="record.style == 'video'" :src="record.cover_pic" width="100%" height="100%" controls="controls" />
                            <img width="100%" @click="ImgVisible = true" v-if="record.style == 'image'" :src="record.cover_pic" alt="avatar" />
                        </div>
                    </a-form-item>
                    <a-form-item label="发布者" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        {{record.author}}
                    </a-form-item>
                    <a-form-item label="发布时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        {{record.time}}
                    </a-form-item>
                    <a-form-item label="所属类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        {{record.type}}
                    </a-form-item>
                    <a-form-item label="发布状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        {{record.status == 0 ? '已发布' : record.status == 1 ? '待审核' : record.status == 2 ? '草 稿' : ''}}
                    </a-form-item>
                    <a-form-item label="评论数" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        {{record.comments}}
                    </a-form-item>
                    <a-form-item label="收藏数" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        {{record.loves}}
                    </a-form-item>
                    <a-form-item label="点赞数" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        {{record.likes}}
                    </a-form-item>
                    <a-form-item label="浏览数" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        {{record.visits}}
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        {{record.title}}
                    </a-form-item>
                    <a-form-item label="食谱描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        {{record.des}}
                    </a-form-item>
                    <a-form-item label="食材" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                        <div v-for="(item,index) in record.menu">
                            {{item.list}} —— {{item.size}}
                        </div>
                    </a-form-item>
                    </a-col>
                    <a-col :span="20">
                    <a-form-item label="步 骤" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
                        <div v-for="(item,index) in record.step">
                            <div style="width:21rem;height:10rem;overflow:hidden">  
                                <img alt="example" @click="previewVisible =true" style="width: 100%" :src="item.img" />
                            </div>
                            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                <img alt="example" style="width: 100%" :src="item.img" />
                            </a-modal>
                            <br/>
                            <p>描述{{index+1}}： {{item.temp}}</p>
                        </div>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script>

export default {
    name: 'cookbook',
    props:['dd','record'],
    data() {
        return {
            form: this.$form.createForm(this, { name: 'coordinated' }),
            ImgVisible:false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
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
        },
        record(val){
            console.log(val,'详情')
        }
    },
    methods: {
        gg(){
            alert('kkk')
        },
        //封面图
        handleCancel() {
            this.previewVisible = false;
            this.ImgVisible = false
        },
        // handlePreview(file) {
        //     this.previewImage = file.url || file.thumbUrl;
        //     this.previewVisible = true;
        // },
        // handleChange({ fileList }) {
        //     this.fileList = fileList;
        // },
        //食材
        // handleSize(value) {
        //     console.log(typeof(value),'va')
        //     this.edata = !value || value.indexOf(' ') >= 0 ? [] : [
        //         `${value} 个`,
        //         `${value} 克`,
        //         `${value} 只`,
        //         `${value} 条`,
        //         `${value} 毫升`,
        //         `${value} 块`,
        //         `${value} 颗`,
        //         `${value} 勺`,
        //     ];
        // },

        cancelhandle(){
            this.$emit('omodal',false)
        },
        checkAll(){
            console.log('详情')
            this.$emit('omodal',false)
        },
        // handleSelect(){
        //     console.log('选择发布者')
        // },
        handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
            console.log('Received values of form: ', values);
            }
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