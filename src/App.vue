<template>
  <div id="app">
    <router-view/>
    <loading></loading>
  </div>
</template>
<script>
import loading from '@/components/common/loading'
export default {
    name: 'App',
    components:{loading},
    created(){
//        wx.miniProgram.getEnv(res => {
//
//        })
    }
}
</script>

<style lang="stylus" >

</style>
