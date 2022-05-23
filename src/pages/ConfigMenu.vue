<template>
  <div>
  <div style="float: left; margin-left: 2em;">
    <el-tag  effect="dark" :type="value1?'':'info'" size="medium" >用户管理</el-tag>
    <el-switch v-model="value1" style="margin-left: 0.75em" @change="sendMsg"></el-switch>
  </div>
  <div style="float: left;margin-left: 2em;">
    <el-tag  effect="dark" :type="value1?'':'info'" size="medium" >用户管理</el-tag>
    <el-switch v-model="value1" style="margin-left: 0.75em" @change="sendMsg"></el-switch>
  </div>
  </div>
</template>

<script>
export default {
  name: "configMenu",
  data(){
    return{
      value1:true,
    }
  },
  methods:{
    sendMsg(){
      console.log("ddd")
      if (this.value1){
        this.$notify({
          type:'success',
          message:'开启成功',
          duration:800
        })
      }else {
        this.$notify({
          type:'info',
          message:'关闭配置',
          duration:800
        })
      }
    }
  },
}
</script>

<style scoped>

</style>