<template>
  <main>
        <!-- <van-tree-select
        :items="items"
        :active-id.sync="activeId"
        :main-active-index.sync="activeIndex"
        @click-nav="nav"
        @click-item="item"
        /> -->
        <p @click="showPicker = true">选择类型</p>
        <van-picker 
        show-toolbar 
        title="标题" 
        :columns="items"
        @cancel="showPicker = false"
        @confirm="onConfirm"
         />
        <!-- <van-picker :columns="columns" @change="onChange" /> -->

  </main>
</template>

<script>
export default {

    data() {
        return {
            items:[],
            showPicker:false,
            value:'',
            activeId: 1,
            activeIndex: 0
        }
    },
    mounted() {
        this.getclassfiy()
    },
    methods: {
        onConfirm(value) {
            this.value = value;
            console.log(value,'value')
            this.showPicker = false;
        },
        getclassfiy(){
            this.$axios.get('/classifyList').then(res=>{
                for(let i=0;i<res.data.length;i++){
                    this.items.push({
                        text : res.data[i].name,
                        children:[]
                    })
                    for(let j=0;j<res.data[i].kinds.length;j++){
                        this.items[i].children.push({
                            text: res.data[i].kinds[j]
                        }) 
                    }
                }
                console.log(this.items,'arr')
            })
        },
        nav(index){
            console.log(index)
        },
        item(data){
            console.log(data)
        }
    },
}
</script>

<style scoped>

</style>