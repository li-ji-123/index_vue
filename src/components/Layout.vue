<template>
  <div>
    <el-button @click="show = !show" style="width: 200px">
      <span v-if="show" class="el-icon-arrow-down">收起</span>
      <span v-else class="el-icon-arrow-up">展开</span>
    </el-button>

    <div style="display: flex;height: 40px;"  v-for="name in menu">

<!--      <transition name="el-fade-in-linear">-->
<!--        <div v-show="show" class="transition-box">.el-fade-in-linear</div>-->
<!--      </transition>-->
<!--      <transition name="el-fade-in">-->
<!--        <div v-show="show" class="transition-box">.el-fade-in</div>-->
<!--      </transition>-->
      <transition name="el-zoom-in-top" style="display: flex;height: 40px;width: 200px;">
        <div v-show="show" class="transition-box" >{{ name }}</div>
      </transition>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data: () => ({
    show: true,
    menu:["菜单一","菜单二","菜单三"]
  })
}
</script>

<style scoped>
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 40px;
  border-radius: 4px;
  background-color: #409EFF;
  text-align: center;
  color: #fff;
  /*padding: 40px 20px;*/
  box-sizing: border-box;
  /*margin-right: 20px;*/
}
</style>