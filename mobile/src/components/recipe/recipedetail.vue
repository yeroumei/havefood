<template>
  <main>
      这是详情页面
  </main>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData(){
            this.$axios.get('/recipeList',{
                params:{
                    _id:this.$route.params.id
                }
            }).then(res=>{
                console.log(res.data,'详情')
            })
            console.log(this.$route.params.id,'取到的ID')
        }
    },
}
</script>

<style>

</style>