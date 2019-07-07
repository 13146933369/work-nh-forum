import Vue from "vue";
import Vuex from "vuex";
import pageState from "./modules/pageState.js"
Vue.use(Vuex);



export default new Vuex.Store({
  modules :{
    pageState
  }
  
});
