<template>
  <div v-if="$store.state.paymsg.popshow" class="qq" >
    <top-dialog v-show="showDialog==='topDialog'"></top-dialog>
    <site v-show="showDialog==='site'"></site>
    <site-choose v-show="showDialog==='siteCfhoose'"></site-choose>
    <price v-show="showDialog==='price'"></price>
  </div>
</template>

<script>
import topDialog from "./TopDialog.vue";
import Site from "./Site.vue";
import SiteChoose from "./SiteChoose.vue";
import Price from "./Price.vue";
export default {
  components: {
    topDialog,
    Site,
    SiteChoose,
    Price
  },
  data() {
    return {
      //显示不同的组件dialog
      showDialog:"",
      //显示组件dialog外层盒子
      rgba: 0
    };
  },
  created(){
    document.getElementsByClassName("content")
  },
  computed:{
    siteState(){
      return this.$store.state.paymsg.showState;
    }
  },
  watch: {
    siteState(state){
      this.showDialog = state;
    },
    
  },
  // methods: {
  // }
};
</script>

<style lang="stylus" scoped>
@import '../../components/css/checkbox.css';

.qq {
  width: 100%;
  height: 100%;
  position absolute;
  top: 0;
  z-index: 100;
}
</style>