<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :default-active='activeValue'
      background-color="rgb(52 142 123)"
      text-color="#fff"
      active-text-color="black">
    <el-menu-item
        v-for="(headMenu,i) in headMenuList"
        :index="i+''"
        :key="headMenu.mainMenuId"
        @click="showMenu(headMenu.subMenuList)"
    >{{headMenu.mainMenuName}}</el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: "TestHeadMenu",
  props:['headMenuList'],
  data(){
    return{
      activeValue:'0',
    }
  },
  methods:{
    showMenu(subMenuList){
      this.$emit('selectMenu',subMenuList);
    }
  }
}
</script>

<style scoped>
.el-menu-demo{
  float: left;
}
.test-hover{
  background-color: #42b983;
}
</style>