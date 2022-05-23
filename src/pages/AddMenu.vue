<template>
  <div style="height: calc(90vh)">
    <div >
    <el-page-header @back="goBack" content="新增菜单页面" style="margin-bottom: 0.75em"></el-page-header></div>
    <div style="margin-top: 2em;margin-left: 14em;width: 20em;">
    <el-form label-width="5em" :model="menuData">
      <el-form-item label="菜单名称">
        <el-input v-model="menuData.menuName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="等级序号">
        <el-input v-model="menuData.sort" placeholder="请输入数字 如:99"></el-input>
      </el-form-item>
      <el-form-item label="密钥验证">
        <el-input v-model="code" type="password"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型">
        <div style="float:left; margin-left: 1.5em">
        <el-radio-group v-model="typeName" size="medium" @change="isMenuType">
          <el-radio-button  label="主菜单"></el-radio-button >
          <el-radio-button  label="子菜单"></el-radio-button >
        </el-radio-group>
        </div>
      </el-form-item>

      <el-form-item label="使用情况">
        <div style="float:left;margin-left: 1.5em">
        <el-switch
            active-text="启用"
            inactive-text="禁用"
            @change="isDisable"
            v-model="menuData.disable === 0"></el-switch></div>
      </el-form-item>

      <el-form-item size="large">
        <div style="float: left;margin-left: 1.5em">
        <el-button type="primary" @click="onSubmit()" :plain="true">立即保存</el-button>
        <el-button @click="goBack">返 回</el-button>
        </div>
      </el-form-item>

    </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddMenu",
  data(){
    return{
      menuData:{
        menuName:'',
        menuType:2,
        disable:0,
        sort:null,
      },
      code:'',
    }
  },
  computed:{
    //计算属性  值会变化时,需要get set方法
    typeName:{
      get(){return this.menuData.menuType===1? '主菜单':'子菜单'},
      set(value){this.menuData.menuType = value==='主菜单'? 1:2}

    }
  },
  methods:{
    goBack() {
      console.log("goBack")
      this.$router.back()
      this.$nextTick(function (){
        axios({
          url:'http://localhost:8080/test/all-menu/getAllMenuList',
          method:'get',
        }).then(
            response =>{
              const res = response.data;
              if (res.code === 200){
                this.$bus.$emit('getAllMenuList',res.data)
              }
            },
            error =>{
              console.log("请求失败")}
        )
      })
    },
    onSubmit() {
      let that =this
      console.log("onSubmit")
      axios({
        url:'http://localhost:8080/test/all-menu/addNewMenu',
        method:'post',
        data:this.menuData,
      }).then(
          response =>{
            const res =response.data;
            if (res.code === 200){
              this.$message.success("添加成功")
              this.goBack();
            }else {
              this.$message.info("添加失败")
            }
          },
          error =>{
            console.log("请求失败")
          }
      )

    },
    isDisable(){
      this.menuData.disable = this.menuData.disable ===1 ? 0 : 1
      console.log(this.menuData.disable)
    },
    isMenuType(value){
      this.menuData.menuType = value==='主菜单'? 1:2
      console.log(this.menuData.menuType)
    }
  },
}
</script>

<style scoped>

</style>