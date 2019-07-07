import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'amfe-flexible'
import axios from 'axios'
import './components/css/common.css'
import './assets/icon/iconfont.css'
import global_ from './components/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
// axios.defaults.baseURL = '/apis/';
Vue.prototype.bus = new Vue;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
