<template>
    <div class="header-box">
        <div class="header-container">
            <span class="icon" @click="goBack"><i  class="cubeic-back"></i></span>
            <span class="header" v-text="title"></span>
        </div>
    </div>
</template>

<script>
export default {
    props : ["title"],
    methods : {
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="stylus" scoped>
.header-box
    width 100%
    height 80px
    line-height 80px
    text-align center
    font-size 30px
    background #f8f8f8
    position relative
    border-bottom 1px solid #ddd
    .header
        font-weight 400
        color #101010
        font-style normal
    .icon
        width 80px
        height 80px
        position absolute
        top 0px
        left 10px
        

</style>

