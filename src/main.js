import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'
import TestHeadMenu from "@/components/TestHeadMenu";
import TestUser from "@/components/TestUser";
import TestMenu from "@/components/TestMenu";
import TestSubmenu from "@/components/TestSubmenu";
import router from "@/router";

Vue.use(ElementUI)
Vue.component("TestHeadMenu",TestHeadMenu);
Vue.component("TestUser",TestUser)
Vue.component("TestMenu",TestMenu)
Vue.component("TestSubmenu",TestSubmenu)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router:router,
  beforeCreate() {
    Vue.prototype.$bus=this
  }
}).$mount('#app')
