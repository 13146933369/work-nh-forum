<template>
<div class="microShow">
    <div class="scroll-list-wrap">
        <cube-scroll
                ref="scroll"
                :data="items"
                :options="options"
                @pulling-up="onPullingUp">
                <ul class="microShowUl">
                    <li v-for="microData in items">
                        <div class="microShowBg" @click="microShowFun(microData)">
                            <img src="../../assets/arrows.png" class="microShowArrows">
                            <div class="microShowBor"></div>
                            <img :src="imgUrl+microData.pic" class="microShowImg">
                            <div class="microShowName">{{microData.name}}</div>
                        </div>
                    </li>
                </ul>
        </cube-scroll>
    </div>
<!--展现风采按钮-->
<div class="microShowBut" @click="microShowButFun">展现风采</div>
<!--底部菜单栏-->
<div class="microClassFoot">
    <div class="microClassFootBox">
        <div class="flexBut">
            <router-link :to="{path:'/microClass/microClassDefault'}">
                <img src="../../assets/but_3.png">
                <div class="flexFont">微课堂</div>
            </router-link>
        </div>
        <div class="flexBut">
            <router-link :to="{path:'/microFourm/microFourmDefault'}">
                <img src="../../assets/but_2.png">
                <div class="flexFont">微论坛</div>
            </router-link>
        </div>
        <div class="flexBut">
            <router-link :to="{path:'/'}">
                <img src="../../assets/but_1.png">
                <div class="flexFont">首页</div>
            </router-link>
        </div>
        <div class="flexBut">
            <router-link :to="{path:'/broadcast/broadcastDefault'}">
                <img src="../../assets/but_4.png">
                <div class="flexFont">动态播报</div>
            </router-link>
        </div>
    </div>

</div>
</div>
</template>

<script>
    import {publicRequestPost} from '../../components/requerst/request'
    import qs from 'qs'
    export default {
        data() {
            return {
                items:[],
                pullDownRefresh: this.pullDownRefreshObj,
                pullUpLoad: this.pullUpLoadObj,
                scrollbar: true,
                pullDownRefreshThreshold: 60,
                pullDownRefreshStop: 40,
                page:1,
                pageCount:10,
                imgUrl:this.GLOBAL.imgUrl
            }
        },
        created() {
            this.getData()
        },
        computed: {
            options() {
                return {
                    pullDownRefresh: this.pullDownRefreshObj,
                    pullUpLoad: this.pullUpLoadObj,
                    scrollbar: true
                }
            }
        },

        methods: {
            getData(){
                if (this.page <= this.pageCount) {
                    let url = "/vote/bbsList"
                    let parameter =qs.stringify({
                        type:2,
                        page: this.page,
                        lastId:""
                    })
                    publicRequestPost(url,parameter ,this.getDataBack)
                    this.bus.$emit('loading', true);

                }else{
                    this.$refs.scroll.forceUpdate()
                }
            },
            getDataBack(callBack){
                this.bus.$emit('loading', false);
                let self = this
                if(callBack.data.status == 2034){
                    this.$refs.scroll.forceUpdate()
                    return
                }
                if(callBack.data.status == 2030){
                    callBack.data.data.reArr.forEach(item =>{
                        self.items.push(item)
                    })
                    self.page++
                    self.pageCount = callBack.data.data.pageCount
                    console.log(self.pageCount)

                }

            },
            pullUpLoadObj: function() {
                return this.pullUpLoad ? {
                    threshold: parseInt(this.pullUpLoadThreshold),
                    txt: {
                        more: this.pullUpLoadMoreTxt,
                        noMore: this.pullUpLoadNoMoreTxt
                    }
                } : false
            },
            onPullingUp() {
                if(this.scrollbar){
                    this.getData()
                }else{
                    this.$refs.scroll.forceUpdate()
                }

            },

            microShowFun(obj){
                this.$router.push({
                    path:"/microShow/microShowDetails",
                    query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                        id:obj.id,
                    }
                })
            },
            microShowButFun(){
                this.$router.push({
                    path:"/microShow/microShowUploading"
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
.microShow
 width: 100%
 height 100%
 background-color #fff
 font-family:"微软雅黑";
 .microClassFoot
    position absolute
    left 0
    bottom 0
    width 100%;
    height 120px
    background #ACE9C5
    .microClassFootBox
        width 650px
        height 120px
        margin 0 auto
        display flex
        flex-direction row
        flex-wrap wrap
        .flexBut
            text-align center
            width 120px;
            height 90px
            margin 0 20px
            margin-top 13px
            img
                height 66px
        .flexFont
            font-family:"微软雅黑";
            margin-top 2px
            font-size 24px;
            color #000000
            font-weight bold

 .scroll-list-wrap
     width 100%
     height 800px
     overflow-x hidden
     .microShowUl
       width 700px
       margin 0 auto
       display flex
       flex-direction row
       flex-wrap wrap
       .microShowBg
           position relative
           width 320px
           height 220px
           margin 28px 10px
           margin-bottom 20px
           /*border-radius 5%*/
           /*box-shadow: 2px 8px 10px #bcbcbc;*/
           .microShowArrows
              width 24px
              height 24px
              position absolute
              bottom 15px
              right 20px
              z-index 150
            .microShowBor
               position absolute
               bottom -5px
               width 320px
               height 60px
               border-bottom-right-radius 20px
               border-bottom-left-radius: 20px
               background-color:rgba(61,65,72,0.8)
               z-index 100
            .microShowName
                font-family:"微软雅黑";
                position absolute
                bottom 15px
                left 12px
                font-size 25px
                color #fff
                z-index 150
            .microShowImg{
                border-radius 9px
                width 320px
                height 220px
                position absolute
                left 0 top 0
            }

 .microShowBut
    position absolute
    font-size 28px
    bottom 200px
    width 175px
    height 55px
    text-align center
    color:#fff
    background-color #ace9c5
    border-radius 30px
    left 50%
    transform:translate(-50%,0)
    line-height 58px
    font-weight bold

</style>