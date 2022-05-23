<template>
  <div>
    <div class="block" style="margin-bottom: 8px;float: left;margin-left: 8em">
      <span class="demonstration" style="margin-left: 20px;">用户名:</span>
      <div style="display: inline-block; ">

        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            style="width: 150px"
        >
        </el-input>
      </div>

      <span class="demonstration" style="margin-left: 20px;">电话:</span>
      <div style="display: inline-block;">

        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            style="width: 150px"
        >
        </el-input>
      </div>

      <span class="demonstration" style="margin-left: 20px;">日期:</span>
      <div style="display: inline-block">
      <el-date-picker
          v-model="dateTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
      </div>

      <el-button
          type="primary"
          :icon="!loading ? 'el-icon-search' : 'el-icon-magic-stick' "
          style="height: 40px;margin-left: 20px"
      >搜索</el-button>

    </div>
    <el-table
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgb(179 188 199 / 80%)"

        :data="personList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%;background-color: #f5f3f3;">
      <el-table-column
          align="center"
          label="日期"
          sortable
          column-key="date"
          width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="left"
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          align="left"
          prop="phone"
          label="电话"
          width="180">
      </el-table-column>
      <el-table-column
          align="left"
          prop="address"
          label="地址"
          width="320"
          :formatter="formatter">
      </el-table-column>
      <el-table-column
          align="left"
          prop="tag"
          label="标签"
          width="100"
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          align="right" width="300">
        <template slot="header" slot-scope="scope">
          <el-input
              style="width: 200px;"
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">

          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-button
              size="mini"
              type="danger"
              @click="open">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TestTable",
  data() {
    return {
      personList:[],
      search: '',
      dateTime:'',
      loading:false,
    }
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    open() {
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (1==1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleEdit(index,value){
      this.$router.push({
        name:'update',
        query:{
          user:value
        }
      })
    },

  },
  mounted() {
    this.$bus.$on('setPersonList',(data)=>{
      this.personList = data
    });


  },


}
</script>

<style scoped>

</style>