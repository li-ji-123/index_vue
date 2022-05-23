<template>
  <div id="app">
    <el-container>
      <el-header style="padding: 0">
        <span style="width: 10em;float: left;background-color: #42b983">LOGO</span>
        <!--主菜单-->
        <TestHeadMenu :headMenuList="headMenuList" @selectMenu="selectMenu"/>
        <!--用户头像-->
        <TestUser/>

      </el-header>
      <el-container>
        <!--子菜单-->
        <el-aside  width="10em" style="overflow-x: hidden;overflow-y: auto">
          <TestMenu :subMenuList="submenuList" ref="addSubMenu"/>

        </el-aside>
        <!--内容-->
        <el-main style="padding: 0">
          <TestSubmenu/>

        </el-main>

      </el-container>

      <el-footer><button @click="getData">测试</button></el-footer>

    </el-container>
  </div>
</template>

<script>
import router from './router';
import axios from 'axios'



export default {
  name: 'App',
  router:router,
  data(){
    return{
      headMenuList:[{
        mainMenuId:0,
        mainMenuName:'xxx',
        subMenuList:[{
          menuName:'xxx',
          menuId:0,
        }],
      }],
      submenuList:[{menuName:'',menuId:0}],

    }
  },

  methods:{
    getData(){
      axios.get(`http://localhost:8080/test/getData?value=${this.id}`).then(
          response => {
            console.log("访问成功",response.data)
            console.log(this.headMenuList[0].subMenuList)
          },
          error =>{
            console.log("访问失败")
          },
      )
    },

    selectMenu(sub){
      this.submenuList=sub;
    },
  },
  mounted() {
    axios.get(`http://localhost:8080/test/main-menu/getMenu`).then(
        response =>{
          const res = response.data
          this.headMenuList = res.data
          // this.$nextTick(function (){
            this.submenuList = res.data[0].subMenuList
            // focus()
          // })
        },
        error =>{

        }
    );

  }
}
</script>

<style >
#app{
  overflow: hidden;
}
.el-header, .el-footer {
  background-color: rgb(52 142 123);
  color: #333;
  text-align: center;
  line-height: 3em;
}

.el-aside {
  background-color: #6da89c;
  color: #333;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh);

}

.el-main {
  background-color: whitesmoke;
  color: #333;
  text-align: center;
  padding: 0;
}

body > .el-container {
  margin-bottom: 2em;
}

body {
  /*overflow: auto;*/
  margin: 0;
}
</style>
