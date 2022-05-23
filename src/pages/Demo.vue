<template>
  <el-container >
    <el-aside style=" width: 30%;">
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
    <el-main v-show="systemClick">

      <div style="width: 25%;display: inline-block;float: left;border-right: 1px dashed #b1aaaa">
        <el-divider style="margin-top: 0"></el-divider>
        <template style="list-style: none;float:left;padding-left: 10px;">

          <div class="ttt" style="margin-bottom: 20px;width: 100%"
               @mouseover="item.over = !item.over"
               @mouseout="item.over =!item.over"
               v-for="(item,i) in mainMenuList"
               @click="des(i)"
               :id="index===i?'tttClick':''"
          >
            <i v-show="item.over || index===i"  class="el-icon-caret-right" style="float: left;margin:8.5px 5px 0 0;"></i>
            <el-switch
                :value="item.disable === 0"
                @change="isOpened"
            ></el-switch>
            <el-tag
                closable
                :style="item.disable === 0?'width: 100px;color:black;':'width: 100px;'"
                :effect="item.disable === 0?'dark':'light'"
                :color="item.disable === 0?'#409eff':'rgb(213 219 226)'"
                :type="item.disable === 0?'':'info'"
            >{{ item.mainMenuName }}</el-tag>
          </div>
        </template>
        <el-divider></el-divider>
        <el-button
            style="display: inline-block;width: 100px;margin-left: 20px;"
            size="small"
            round
            :icon="isShow?'el-icon-circle-close':'el-icon-circle-plus-outline'"
            @click="editTags"
            :type="isShow?'warning':'success'"
        >{{ butTitle }}</el-button>
        <el-button
            v-show="isShow"
            style="display: inline-block;width: 100px;"
            size="small"
            round
            icon="el-icon-circle-plus-outline"
            type="success"
            @click="editTags"
        >添加</el-button>
        <el-select
            v-show="isShow"
            value=""
            size="small"
            style="margin-top: 15px">
          <el-option value="">请选择</el-option>
        </el-select>

        <el-row>
          <el-button type="info"  size="small" plain  style="margin-top: 240px;margin-right: 20px;float: right">重置设置</el-button>
          <el-button type="primary"  size="small" plain  style="margin-top:240px;margin-right: 20px;float:right;">提交保存</el-button>
        </el-row>
      </div>
      <div>xxx</div>

    </el-main>

  </el-container>

</template>

<script>

import axios from "axios";

export default {
  name: "demo",


  data(){
    return{
      onOff:false,
      systemData:[],
      isShow:false,
      butTitle:'添加',
      systemCode:'',
      systemClick:false,
      mainMenuList:[],
      index:null,
    }
  },

  methods:{
    isOpened(){
      //进行禁用主菜单时
      this.onOff = !this.onOff
    },
    deleteMenu(){
      //进行删除主菜单时
      console.log("deleteMenu")
    },
    editTags(){
      this.isShow = !this.isShow;
      this.butTitle = this.isShow?'取消':'添加';
    },
    des(i){
      this.index=i;
    },

    showConfigMenu(mainMenu){
      // this.isClick = true
      // this.$router.push({name:'configMenu'})
      this.mainMenuId = mainMenu.id

    },
    getSystemConfig(system) {
      console.log("getSystemConfig");
      this.systemClick = true
      this.systemCode = system.systemCode

      axios({
        url: 'http://localhost:8080/test/main-menu/getMainMenu',
        method: 'get',
        params: {
          systemCode: this.systemCode
        },
      }).then(
          response => {
            const res = response.data;
            if (res.code === 200) {
              this.mainMenuList = res.data
              console.log(this.mainMenuList)
            }
          },
          error => {
          }
      );
    },
  },

  mounted() {

    axios({
      url: 'http://localhost:8080/test/system/getAllSystemList',
      method: 'get',
    }).then(
        response => {
          const res = response.data;
          if (res.code === 200) {
            this.systemData = res.data;
          }
        },
        error => {
        }
    );
  },


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
  /*height: 544px;*/
  padding: 0;
}
.el-switch{
  margin-right: 10px;
}

.ttt:hover{
  background-color: rgb(196 203 210);
}
#tttClick{
  background-color: rgb(148 193 239);
}
</style>