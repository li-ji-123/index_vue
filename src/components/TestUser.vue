<template>
  <div class="demo-type">
      <el-dropdown :hide-on-click="false" trigger="click" style="height: 1.75em">
        <el-avatar style="margin-right: 1.1em"> user </el-avatar>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item>用户设置</el-dropdown-item>
          <el-dropdown-item>关于</el-dropdown-item>
          <el-dropdown-item>客服</el-dropdown-item>
          <el-dropdown-item disabled>消息</el-dropdown-item>
          <el-dropdown-item divided>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "TestUser"
}
</script>

<style scoped>
.demo-type{
  float: right;
  margin: 0.5em;
  cursor: pointer;
  height: 2em;

}

</style>