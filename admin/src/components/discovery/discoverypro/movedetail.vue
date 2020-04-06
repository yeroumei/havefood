<template>
    <a-modal title="动态详情" v-model='look' @cancel='cancelhandle' style="top:5%" width='65%' @ok='checkAll' cancelText="取消" okText="确定" :maskClosable='false'>
        <a-form :form="form" class="modal">
            <a-row>
                <a-col :span="8">
                    
                    <a-form-item label="动态描述" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <!-- <a-form-item label="动态描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }"> -->
                        {{record.content}}
                    </a-form-item>
                    <a-form-item label="发布者" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        {{record.author}}
                    </a-form-item>
                    <a-form-item label="发布时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        {{new Date(record.time).toLocaleString()}}
                    </a-form-item>
                    <a-form-item label="评论数" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        {{record.comments}}
                    </a-form-item>
                    <a-form-item label="点赞数" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        {{record.likes}}
                    </a-form-item>
                </a-col>
                <a-col :span="16">
                    <a-form-item label="动态素材" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                        <div v-if="record.media ? record.media.type == 'image' : ''" v-for="(item,index) in record.media ? record.media.matter : ''"  style="width:29%;display: inline-block;overflow:hidden;margin-right:1em">  
                            <a-modal :visible="ImgVisible" :footer="null" @cancel="handleCancel">
                                <img alt="avatar" style="width: 100%" :src="item" />
                            </a-modal>
                            <!-- <video v-if="record.type == 'video'" :src="item" width="100%" height="100%" controls="controls" /> -->
                            <img width="100%" @click="ImgVisible = true" :src="item" alt="avatar" />
                        </div>
                        <div v-if="record.media ? record.media.type == 'video' : ''"  style="width:100%;display: inline-block;overflow:hidden;margin-right:1em">  
                            <video :src="record.media.matter" width="100%" height="100%" controls="controls" />
                        </div>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script>
export default {
    props:['dd','record'],
    data() {
        return {
            form: this.$form.createForm(this, { name: 'coordinated' }),
            look:false,
            ImgVisible:false
        }
    },
    watch: {
        dd(val){
            console.log(val)
            this.look=val
        },
        record(val){
            console.log(val,'详情')
        }
    },
    methods: {
        cancelhandle(){
            this.$emit('omodal',false)
        },
        checkAll(){
            console.log('详情')
            this.$emit('omodal',false)
        },
        //封面图
        handleCancel() {
            this.ImgVisible = false
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