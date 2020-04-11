<template>
  <a-modal title="文章详情" v-model='look' @cancel='cancelhandle' style="top:5%" width='65%' @ok='checkAll' cancelText="取消" okText="确定" :maskClosable='false'>
        <div class="modal">
            <a-descriptions title="" :column="4">
                <a-descriptions-item label="发布者">{{record.author}}</a-descriptions-item>
                <a-descriptions-item label="收藏数">{{record.collects ? record.collects.length : ''}}</a-descriptions-item>
                <a-descriptions-item label="点赞数">{{record.loves ? record.loves.length : ''}}</a-descriptions-item>
                <a-descriptions-item label="时间">{{new Date(record.time).toLocaleString()}}</a-descriptions-item>
            </a-descriptions>
            <a-descriptions title="" :column="1">
                <a-descriptions-item label="">
                   <h2> {{record.title}} </h2>
                </a-descriptions-item>
                <a-descriptions-item label="" v-for="item in record.media">
                    <h3 v-if="item.sub">{{item.sub}}</h3>
                    <p style="padding-bottom:1em" v-if="item.text">{{item.text}}</p>
                    <img style="padding-bottom:1em"  width="75%" v-for="i in item.img" :src="i" alt />
                </a-descriptions-item>
            </a-descriptions>
        </div>
    </a-modal>
</template>

<script>
export default {
    props:['dd','record'],
    data() {
        return {
            form: this.$form.createForm(this, { name: 'coordinated' }),
            look:false,
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
    },
}
</script>

<style scoped>
.modal{
    height: 435px;
    overflow-y: scroll;
}
</style>