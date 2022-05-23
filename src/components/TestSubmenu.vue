<template>
  <div>
    <el-tabs v-model="tabList.tabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
      <el-tab-pane
          v-for="(item, index) in tabList.tableTabs"
          :key="item.menuId"
          :label="item.menuName"
          :name="item.menuName"
      >
      </el-tab-pane>
    </el-tabs>
    <div v-show="show"><router-view></router-view></div>



  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "TestSubmenu",
  data(){
    return{
      tabList:{tableTabs: [],tabsValue:0},
      show:false,
    }
  },
  mounted() {
    this.$bus.$on('addSubMenu',(menu)=>{
      //添加子菜单操作
      this.addSubMenu(menu)
      //切换内容页面和获取数据
      this.switchHtml(menu.menuName)
    });
    console.log(document.getElementsByClassName("el-tabs__header"))


  },
  methods: {
    //移除子菜单
    removeTab(targetName) {
      console.log("removeTab----"+targetName)
      let tabs = this.tabList.tableTabs;
      let activeName = this.tabList.tabsValue;

      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.menuName === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {activeName = nextTab.menuName;}
            else {activeName = '';}
            //关闭内容页面
            this.show=false
          }
        });
      }

      this.tabList.tabsValue = activeName;
      this.switchHtml(activeName);
      this.tabList.tableTabs = tabs.filter(tab => tab.menuName !== targetName);
    },
    //点击子菜单
    clickTab(value){
      console.log("clickTab----"+value.label,value.name)
      this.switchHtml(value.label)
    },
    //添加子菜单
    addSubMenu(menu){
      this.tabList.tabsValue=menu.menuName;
      const tabs = this.tabList.tableTabs;
      console.log("addSubMenu")
      if (tabs.length <1){
        this.tabList.tableTabs.push(menu);
      }else {
        let con = false;
        tabs.forEach(tab=>{
          if (tab.menuName === this.tabList.tabsValue){
            con = true;
          }
        })
        if (!con){
          this.tabList.tableTabs.push(menu)
        }
      }
    },
    //内容页面切换
    switchHtml(value){
      console.log("switchHtml----"+value)
      switch (value) {
        case '用户管理':
          this.show = true
          this.$router.push({name: 'updateTable'})
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

          return;
        case '子其他':
          this.show = true
          this.$router.push({name: 'empty'})


          return;
        case '模块管理':
          this.show = true
          this.$router.push({name: 'adminMenu'})


          return;
        case '测试':
          this.show = true
          this.$router.push({name: 'demo'})


          return;
        case '菜单维护':
          this.show = true
          this.$router.push({name: 'upholdMenu'})
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


          return;

        default:
          console.log(100)
          this.show = false
      }
    },

  },
}
</script>

<style scoped>
el-main {
  padding: 0;
}

.el-tabs__header{
  margin: 0;
}
</style>