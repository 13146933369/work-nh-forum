<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
  import wx from "weixin-js-sdk";
export default {
  created() {
      // true代表在小程序里
      wx.miniProgram.getEnv(res => {
         if(res.miniprogram){
           var res = new UrlSearch()
           var id = res["id"]
           var isSignin =res["isSignin"]
           var key = res["key"]
           this.$store.commit("pageState/setId",id)
           this.$store.commit("pageState/setIsSignin",isSignin)
           this.$store.commit("pageState/setKey",key)
          //  if(id == "undefined"){
          //    this.$router.push({
          //      path:"/"
          //    })
          //      return
          //  }
          // if(id){
          //   this.$router.push({
          //     path:"/microFourm/microFourmDetails?id="+id
          //   })
          // }


         }
      })

  },
  data() {
    return {

    }
  },
  methods: {

  }

}
  function UrlSearch() {
      var name, value;
      var str = window.location.href; //取得整个地址栏
//       var str = "https://nhtiny.mtadservice.com/wxsp/index.html#/?id=&isSignin=false&key=f94a2ad0-9ec8-11e9-9ca0-525400972e0a"; //取得整个地址栏
      var num = str.indexOf("?");
      str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
      var arr = str.split("&"); //各个参数放到数组里
      for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf("=");
          if (num > 0) {
              name = arr[i].substring(0, num);
              value = arr[i].substr(num + 1);
              this[name] = value;
          }
      }
  }

</script>

<style lang="stylus" scoped>

</style>