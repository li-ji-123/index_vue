import VueRouter from "vue-router";
import Vue from "vue";
import testTable from "@/pages/TestTable";
import testUpdate from "@/pages/TestUpdate";
import empty from "@/pages/Empty";
import adminMenu from "@/pages/AdminMenu";
import upholdMenu from "@/pages/UpholdMenu";
import addMenu from "@/pages/AddMenu";
import configMenu from "@/pages/ConfigMenu";
import demo from "@/pages/Demo";

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default new VueRouter({
    routes:[
        {
            name:'updateTable',
            path:'/updateTable',
            component:testTable,
        },
        {
            name:'update',
            path:'/updateOne',
            component:testUpdate
        },
        {
            name:'empty',
            path:'/empty',
            component:empty
        },
        {
            name:'adminMenu',
            path:'/adminMenu',
            component:adminMenu
        },
        {
            name:'upholdMenu',
            path:'/upholdMenu',
            component:upholdMenu,
        },
        {
            name:'addNewMenu',
            path:'/addNewMenu',
            component:addMenu,
        },
        {
            name:'configMenu',
            path:'/configMenu',
            component:configMenu,
        },
        {
            name:'demo',
            path:'/demo',
            component:demo,
        },
    ]
})