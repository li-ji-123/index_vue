<template>
  <el-container >
    <el-aside style=" width: 30%;">
      <!--      <el-radio-group v-model="radio">-->
      <!--        <el-radio label="3" border size="medium" style="display: block;margin-bottom: 40px" v-show="false">备选项</el-radio>-->
      <!--        <el-radio label="5" border size="medium" style="display: block;margin-bottom: 40px">备选项</el-radio>-->
      <!--        <el-radio label="6" border size="medium" style="display: block;margin-bottom: 40px">备选项</el-radio>-->
      <!--        <el-radio label="9" border size="medium" style="display: block;margin-bottom: 40px;margin-right: 30px;">备选项</el-radio>-->
      <!--      </el-radio-group>-->
      <el-table
          highlight-current-row
          :data="systemData"
          max-height="530px"
          @current-change="getSystemConfig"
          border
          style="width: 100%">

        <el-table-column
            type="index"
            label="序号"
            width="50">
        </el-table-column>

        <el-table-column
            prop="systemCode"
            label="系统编码"
            width="80">
        </el-table-column>
        <el-table-column
            prop="systemName"
            label="系统名称">
        </el-table-column>
      </el-table>
      <testPage/>

    </el-aside>
    <el-main>

      <div style="width: 100%;height: calc(90vh)" v-show="systemClick">

        <el-tabs tab-position="left" style="height: calc(70vh);border: none" @tab-click="showConfigMenu">

          <el-tab-pane v-for="mainMenu in mainMenuList"
                       :label="mainMenu"

          >

            <div v-if="isClick"><configMenu/></div>
            <div v-else><empty/></div>
          </el-tab-pane>


<!--          <el-tab-pane label="配置管理">配置管理</el-tab-pane>-->
<!--          <el-tab-pane label="角色管理">角色管理</el-tab-pane>-->
<!--          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>-->
        </el-tabs>
        <el-row>
          <el-button type="info"  size="small" plain  style="margin-right: 20px;float: right">重置设置</el-button>
          <el-button type="primary"  size="small" plain  style="margin-right: 20px;float:right;">提交保存</el-button>
        </el-row>
      </div>

    </el-main>

  </el-container>


</template>

<script>
import testPage from "@/components/TestPage";
import configMenu from "@/pages/ConfigMenu";
import empty from "@/pages/Empty";
import axios from "axios";
export default {
  name: "AdminMenu",
  components:{testPage,configMenu,empty},
  data() {
    return {
      systemData: [],
      tabPosition:'left',
      value1:true,
      isClick:true,
      systemClick:false,
      mainMenuList:[],
      menuConfig:[],
      systemCode:'',
      mainMenuId:'',
    }
  },
  methods:{
    showConfigMenu(mainMenu){
      // this.isClick = true
      // this.$router.push({name:'configMenu'})
      this.mainMenuId = mainMenu.id

    },
    getSystemConfig(system){
      console.log("getSystemConfig");
      this.systemClick = true
      this.systemCode = system.systemCode
    }
  },
  mounted() {
    axios({
      url:'http://localhost:8080/test/all-menu/getMainMenu',
      method:'get',
      params:{

      }
    }).then(
        response =>{
          const res = response.data;
          if (res.code === 200){
            this.mainMenuList = res.data
          }
        },
        error =>{}
    );
    axios({
      url:'http://localhost:8080/test/system/getAllSystemList',
      method:'get',
    }).then(
        response =>{
          const res = response.data;
          if (res.code === 200){
            this.systemData = res.data;
          }
        },
        error =>{}
    );
  }

}
</script>

<style scoped>
.el-aside {
  background-color: whitesmoke;
  color: #333;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: groove;
  height: calc(90vh);

}

.el-main {
  background-color: whitesmoke;
  color: #333;
  text-align: center;
  overflow-y: auto;
  overflow-x: hidden;
  /*height: 27.2em;*/
  padding: 0;
}
</style>