<template>
  <div style="height: 544px;">

    <div style="display:inline-block;width: 40%;border-right: 1px solid rgb(192 220 189)">
      <div style="float:left;margin-bottom: 20px">
        <span class="demonstration" style="margin-left: 0px;">主名称:</span>
        <div style="display: inline-block; ">
          <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              style="width: 150px"
          >
          </el-input>
          <el-button
              type="primary"
              :icon="!loading ? 'el-icon-search' : 'el-icon-magic-stick' "
              style="height: 40px;margin-left: 40px"
          >搜索</el-button>
          <el-button type="primary" style="height: 40px;margin-left: 80px;" @click="addNewMenu">新增主菜单</el-button>
        </div>

      </div>
      <el-table
          :data="mainMenuData"
          border
          height="calc(70vh)"
          style="width: 100%">
        <el-table-column
            prop="menuName"
            label="主名称"
            width="180">
        </el-table-column>

        <el-table-column
            prop="disable"
            label="使用情况">
          <template slot-scope="scope">
            <!--            scope.row.'prop' 获取table某行的数据-->
            <el-switch v-model="scope.row.disable===0"
                       active-text="启用"
                       inactive-text="禁用"
                       @change="updateMenu(scope.row)"
                       style="margin-left: 15px"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button size="small" @click="editMainMenu(scope.row)">编辑</el-button>
          </template>
          <el-dialog
              title="主菜单编辑"
              :visible.sync="mainMenuShow"
              width="30%"
              append-to-body
              :close-on-click-modal="false"
              :close-on-press-escape="false"
              :show-close="false"
              @close="saveMenu"
          >

              <el-form :model="form">
                <el-form-item label="主菜单名称" :label-width="formLabelWidth">
                  <el-input v-model="form.menuName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth">
                  <el-input type="number" v-model="form.sort" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码" :label-width="formLabelWidth">
                  <el-input type="password" v-model="form.code" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelMain">取 消</el-button>
                <el-button type="primary" @click="saveMain">保 存</el-button>
              </div>

          </el-dialog>

        </el-table-column>

      </el-table>

    </div>
    <!--    <el-divider  direction="vertical"></el-divider>-->
    <div style="display:inline-block;width: 50%;">
      <div style="float:left;margin-bottom: 20px">
        <span class="demonstration" style="margin-left: 0px;">子名称:</span>
        <div style="display: inline-block; ">
          <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              style="width: 150px"
          >
          </el-input>
          <el-button
              type="primary"
              :icon="!loading ? 'el-icon-search' : 'el-icon-magic-stick' "
              style="height: 40px;margin-left: 40px"
          >搜索</el-button>
          <el-button type="primary" style="height: 40px;margin-left: 80px">新增子菜单</el-button>
        </div>

      </div>
      <el-table
          :data="subMenuData"
          border
          height="calc(70vh)"
          style="width: 100%">
        <el-table-column
            prop="menuName"
            label="子名称"
            width="180">

        </el-table-column>
        <el-table-column
            label="父级菜单"
            width="180"
        >

        </el-table-column>

        <el-table-column
            label="使用情况">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.disable===0"
                       @change="updateMenu(scope.row)"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       active-text="展示"
                       inactive-text="隐藏"
                       style="margin-left: 15px"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button size="small" @click="editSubMenu(scope.row)">编辑</el-button>

            <el-dialog
                title="子菜单编辑"
                :visible.sync="subMenuShow"
                width="30%"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
                @close="saveMenu"
            >
              <div slot="footer">
                <el-form :model="form">
                  <el-form-item label="子菜单名称" :label-width="formLabelWidth">
                    <el-input v-model="form.menuName" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input type="number" v-model="form.sort" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item
                  label="父级菜单" :label-width="formLabelWidth">

                      <el-select v-model="form.parentMenuId" placeholder="请选择" size="medium">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                      </el-select>

                  </el-form-item>
                  <el-form-item label="管理员密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="code" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="cancelSub">取 消</el-button>
                  <el-button type="primary" @click="saveSub">保 存</el-button>
                </div>
              </div>
            </el-dialog>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>


import axios from "axios";

export default {
  name: "UpholdMenu",

  data(){
    return{
      //主菜单列表
      mainMenuData: [{
        menuName:'',
        sort:null,
        disable:null,
      },
      ],
      //子菜单列表
      subMenuData:[{
        menuName:'',
        sort:null,
        disable:null,
      },
      ],
      loading:false,//搜索加载中
      mainMenuShow: false,//弹框是否展示
      subMenuShow:false,
      isSend:false,
      formLabelWidth: '120px',
      form: {},
      code:'',

      options:[{
        value: 0,
        label: '黄金糕'
      }, {
        value: 1,
        label: '双皮奶'
      }],
      value: '',

    }
  },
  methods:{
    editMainMenu(value){
      this.mainMenuShow = true;
      console.log("editMainMenu")
      this.form = value
    },
    //弹框-->进行修改主菜单保存
    saveMenu(){
      console.log("saveMainMenu----"+this.form)
      if (this.isSend){
      axios({
        url:'http://localhost:8080/test/all-menu/updateMenu',
        method:'post',
        data:this.form,
      }).then(
          response =>{
           this.form={};
            const res = response.data;
            if (res.code === 200){
              this.mainMenuShow = false;
              this.subMenuShow = false;
              console.log("updateMenu")
              this.$message({
                type:'success',
                message:'修改成功',
                duration:800,
              })
            }else {
              this.$message({
                type:'error',
                message:'修改错误',
                duration:800,
              })
            }
            this.isSend = false;
          },
          error =>{
            console.log("请求失败")},
      )
      }else {
        console.log("取消")
      }
      this.form = {};
      this.isSend = false;


    },
    //主/子 菜单列表--->编辑'使用情况'
    updateMenu(value){
      value.disable= value.disable===0?1:0

      axios({
        url:'http://localhost:8080/test/all-menu/updateMenu',
        method:'post',
        data:value,
      }).then(
          response =>{
            const res = response.data;
            if (res.code === 200){
              this.mainMenuShow = false;
              console.log("updateMenu")
              this.$notify({
                type:'success',
                message:'设置成功',
                duration:800,
              })
            }else {
              this.$message.error("修改错误")
            }
          },
          error =>{
            console.log("请求失败")},
      )
    },
    editSubMenu(value){
      this.subMenuShow = true;
      console.log("editSubMenu")
      this.form= value
    },
    addNewMenu(){
      console.log("addNewMenu")
      this.$router.push({
        name:'addNewMenu',

      })
    },
    cancelMain(){
      this.mainMenuShow = false;
      this.isSend = false;
    },
    saveMain(){
      this.mainMenuShow = false;
      this.isSend = true;
    },

    //弹框-->进行修改子菜单保存
    saveSubMenu(){
      console.log("saveSubMenu----"+this.subForm)
      if (this.isSend){
        axios({
          url:'http://localhost:8080/test/all-menu/updateMenu',
          method:'post',
          data:this.subForm,
        }).then(
            response =>{
              const res = response.data;
              this.subForm = '';
              if (res.code === 200){
                this.mainMenuShow = false;
                console.log("updateMenu")
                this.$message({
                  type:'success',
                  message:'修改成功',
                  duration:800,
                })
              }else {
                this.$message({
                  type:'error',
                  message:'修改错误',
                  duration:800,
                })
              }
              this.isSend = false;

            },
            error =>{
              console.log("请求失败")},
        )
      }else {
        console.log("取消")
      }


    },

    cancelSub(){
      this.subMenuShow = false;
      this.isSend = false;
    },
    saveSub(){
      this.subMenuShow = false;
      this.isSend = true;
    }
  },
  mounted() {
    this.$bus.$on('getAllMenuList',(data)=>{
      console.log("getAllMenuList")
      this.mainMenuData = data.mainMenu;
      this.subMenuData = data.subMenu;
    })
  }
}
</script>

<style scoped>
/*.el-divider{*/
/*  height: 500px;*/
/*}*/
.el-select{
  width: 100%;
}
</style>