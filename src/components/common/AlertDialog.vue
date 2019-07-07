<template>
    <div class="alert-dialog" ref="dialog">
        <div class="mask"></div>
        <div class="content">
            <div class="title">{{title}}</div>
            <div class="detal">{{content}}</div>
            <div @click="closeBtn" class="btn">确定</div>
        </div>
    </div>
</template>
<script>
export default {
    props : ['isShow' , 'title' , 'content' ],
    mounted (){
        this.dialog = this.$refs["dialog"]
        this.showDive()
    },
    data(){
        return {
            dialog : null,
        }
    },
    watch : {
        isShow(){
            this.showDive()
        }
    },
    methods : {
        showDive(){
            if(this.isShow){
                this.dialog.style.display = "block"
            }else{
                this.dialog.style.display = "none"
            }
        },
        closeBtn(){
            this.$emit('closeBtn');
        }
    }
}
</script>
<style lang="stylus" scoped>
.alert-dialog {
    display  block;
}
.alert-dialog .mask{
    position fixed;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    background : rgba(0 , 0, 0, 0.6)
    z-index : 666
}
.alert-dialog .content{
    position fixed;
    top 30%;
    left 50%;
    margin-left : -200px;
    width 400px;
    height 300px;
    background #ffffff;
    z-index 667;
    border-radius  5px;
    text-align center; 
}
.alert-dialog .content .title{
    width 100%;
    font-size : 28px;
    padding-top 40px;
}

.alert-dialog .content .detal{
    width 100%;
    font-size : 26px;
    padding-top 40px;
    line-height  1.4
}

.alert-dialog .content .btn{
    position absolute;
    bottom 0;
    left 0;
    width 100%;
    height 80px;
    line-height  80px;
    background : #f44;
    font-size 28px;
    color #ffffff;
    border-bottom-left-radius  5px;
    border-bottom-right-radius 5px;
}
</style>
