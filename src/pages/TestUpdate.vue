<template>
  <div style="width: 500px">
    <el-page-header @back="goBack" content="修改页面" style="margin-bottom: 15px"></el-page-header>
    <el-form label-width="80px" :model="userData">
      <el-form-item label="姓名">
        <el-input v-model="userData.name"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="userData.roleName" placeholder="请选择" style="width: 420px">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="一般用户" value="user"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="电话">
        <el-input v-model="userData.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="userData.address"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-col>
          <el-date-picker type="date" placeholder="选择日期" v-model="userData.date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="标签">
        <el-radio-group v-model="userData.tag" size="medium">
          <el-radio border label="家"></el-radio>
          <el-radio border label="公司"></el-radio>
          <el-radio border label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit()" :plain="true">立即保存</el-button>
        <el-button @click="goBack">取消修改</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TestUpdate",
  data(){
    return{
      userData:{
        name:this.$route.query.user.name,
        date:this.$route.query.user.date,
        address:this.$route.query.user.address,
        phone:this.$route.query.user.phone,
        tag:this.$route.query.user.tag,
        roleName:'admin',
      }
    }
  },
  methods:{
    goBack(){
      console.log(this.$router)
      this.$router.back()
      this.$nextTick(function (){
        axios({
          url:'http://localhost:8080/test/getPersonList',
          method:'post',
          data: {},
        }).then(
            res =>{
              //传递数据到内容页面中
              this.$bus.$emit('setPersonList',res.data)
            },
            error =>{
              console.log("失败")
            }
        )
      })
    },
    onSubmit(){
      console.log(this.userData)
      axios({
        url:'',
        method:'post',
        data:this.userData,
      }).then(
          res =>{this.$message.success('保存成功');},
          error =>{this.$message.error('保存失败');}
      )

    }
  }
}
</script>

<style scoped>

</style>