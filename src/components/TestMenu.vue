<template>
  <el-row class="tac">
    <el-col :span="12" style="width: 10.5em">
      <el-menu
          class="el-menu-vertical-demo"
          background-color="#6da89c"
          text-color="#fff"
          active-text-color="black"
      >
        <el-menu-item
            v-for="(subMenu,i) in subMenuList"
            :index="i+''"
            :key="subMenu.menuId"
            active-class="active"
            @click="addMenu(subMenu)"
            v-show="subMenu.menuId !== null" >
          <!--null时不显示 -->
         <i class="el-icon-caret-right"></i>
          <span slot="title">{{ subMenu.menuName }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "TestMenu",
  data() {
    return {
      show:false,
    }
  },
  props:["subMenuList"],
  methods:{
    //添加子菜单,并获取内容数据
    addMenu(subMenu){
      // const m =
      // this.$emit('addSubMenu',m)
      this.$bus.$emit('addSubMenu',{menuName:subMenu.menuName,menuId:subMenu.menuId+''})
    },
  }

}
</script>

<style scoped>

</style>