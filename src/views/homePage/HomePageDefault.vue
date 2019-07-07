<template>
    <div class="homePage">
        <!--轮播图开始-->
        <div class="indexSlideshow">
            <cube-slide ref="slide" :data="items" @change="changePage" class="indexSlide" style="background-color:#fff">
                <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
                <a href="#">
                    <img :src="item.pic_url">
                </a>
                </cube-slide-item>
                <template slot="dots" slot-scope="props">
                        <span class="my-dot" :class="{active: props.current === index}"
                              v-for="(item, index) in props.dots">{{index + 1}}</span>
                </template>
            </cube-slide>
        </div>
        <!--参与人开始-->
        <div class="participant">
            <img src="../../assets/trumpet.png" class="participantImg"/>
            <span class="peopleFont">目前已有{{peopleNumber}}人参加</span>
        </div>
        <!--按钮开始-->
        <div class="menuBorder">
            <div class="flexBut">
                <router-link :to="{path:'/microClass/microClassDefault'}">
                    <img src="../../assets/but_1.png">
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
                <router-link :to="{path:'/microShow/microShowDefault'}">
                    <img src="../../assets/but_3.png">
                    <div class="flexFont">微展示</div>
                </router-link>
            </div>
            <router-link :to="{path:'/broadcast/broadcastDefault'}">
                <div class="flexBut">
                    <img src="../../assets/but_4.png">
                    <div class="flexFont">动态播报</div>
                </div>
            </router-link>
        </div>
        <!--二维码开始-->
        <div class="homeCode">
            <img src="../../assets/homeCode.png"  class="homeCodeImg"/>
            <div class="homeCodeFont">农行微青春</div>
        </div>
       <!--底部开始 -->
        <div class="homeFoot">
            <router-link :to="{path:'/'}">
            <div class="homeFootBut" @click="homeFootClick">
                <img src="../../assets/but_5.png" class="homeFootButImg">
                <div class="homeFootFont">首页</div>
            </div>
            </router-link>
        </div>
        <!--浮层开始-->
        <div class="homePageLaryer" v-if="showLaryer">
            <img src="../../assets/signIn.png" class="signInImg" @click="signInImgClick">
        </div>
        <!--浮层弹窗-->
        <div class="pageLaryer" v-if="pageLaryer">
            <div class="paglaryerBox">
                <img src="../../assets/layerBor.png" class="layerImg" >
                <div class="layerText">{{layerConten}}</div>
                <img class="layerClose" src="../../assets/layerClose.png" @click="layerCloseFun">
            </div>
        </div>

    </div>
</template>
<script>
    import {publicRequestPost} from '../../components/requerst/request'
    import qs from 'qs'
    import {shareFun} from '../../components/share/share'
    export default {
        data() {
            return {
                //轮播图数据
                items: [
                    {pic_url:require("../../assets/slideShow1.png")},
                    {pic_url:require("../../assets/slideShow2.png")}
                ],
                peopleNumber:"",
                showLaryer:"",
                key:"",
                pageLaryer:false,//浮层显示
                layerConten:"", //浮层内容
                peopleNuState:""//来访人状态判断
            }
        },
        created() {
            var signIn = this.$store.state.pageState.isSignin
            this.key = this.$store.state.pageState.key
            this.peopleNuState = this.$store.state.pageState.peopleNuState
            console.log(this.peopleNuState)
            if(signIn == "false"){
                this.showLaryer = true
            }else{
                this.showLaryer = false
            }

            if(this.peopleNuState){
                this.getvisit()
            }else{
                this.peopleNumber = this.$store.state.pageState.peopleNumber
            }
        },
        mounted(){
            let shartData ={
                title:this.GLOBAL.sharTitle,
                id:" ",
                imgageUrl:this.GLOBAL.imgageUrl
            }
            shareFun(shartData)
        },
        methods: {
            changePage(current) {
                // console.log('当前轮播图序号为:' + current)
            },
            homeFootClick(){
                this.$router.push({
                    path:"/"
                })
            },
            signInImgClick(){
                this.getSignin()
               this.showLaryer = false
            },
            layerCloseFun(){
                this.pageLaryer=false
            },
//            签到接口
            getSignin(){
                let url = "/vote/signIn"
                let parameter =qs.stringify({
                    key:this.key
                })
                publicRequestPost(url,parameter ,this.getSigninBack)
            },
            getSigninBack(callBack){
                if(callBack.data.status==2141){
                    this.pageLaryer=true
                    this.showLaryer =false
                    this.layerConten="签到失败,没有此用户"
                    return
                }
                if(callBack.data.status==2142){
                    this.pageLaryer=true
                    this.showLaryer =false
                    this.layerConten="签到失败"
                    return
                }
                if(callBack.data.status==2143){
                    this.pageLaryer=true
                    this.showLaryer =false
                    this.layerConten="当天已签到"
                    return
                }
                if(callBack.data.status==2144){
                    this.pageLaryer=true
                    this.layerConten="签到失败"
                    this.showLaryer =false
                    return
                }
                if(callBack.data.status==2140){
//                    this.pageLaryer=true
//                    this.layerConten="签到成功"
                    this.showLaryer =false
                }
            },
//            来访接口
            getvisit(){
                let url = "/vote/visit"
                let parameter =qs.stringify({
                    key:this.key
                })
                publicRequestPost(url,parameter ,this.getvisitBack)
            },
            getvisitBack(callBack){
                if(callBack.data.status==2130){
                    this.peopleNumber = callBack.data.data.count
                    this.$store.commit("pageState/setPeopleNuState",false)
                    this.$store.commit("pageState/setPeopleNumber",callBack.data.data.count)

                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
.homePage
    width: 100%
    height 100%
    background-color #fff
    font-family:"微软雅黑";
    .indexSlide
        width: 100%
        height 375px
        background-color #fff
    .participant
        font-family:"微软雅黑";
        font-size 20px
        color:#000000
        margin-left 48px
        margin-top 35px
    .peopleFont
        display:inline-block;
        vertical-align:middle
        margin-left 8px
    .participantImg
        width 30px;
        height 30px
        display:inline-block;
        vertical-align:middle

    .menuBorder
        width 699px
        height 200px;
        box-shadow: 2px 8px 30px #eaeaea;
        border-radius 5%
        margin 0 auto
        margin-top 45px
        display flex
        flex-direction row
        flex-wrap wrap
        .flexBut
            text-align center
            width 120px;
            height 90px
            margin 0 26px
            margin-top 45px
            img
              width 76px
              height 72px
        .flexFont
            font-family:"微软雅黑";
            margin-top 18px
            font-size 29px;
            color #000000
            font-weight bold

    .homeCode
        width 250px
        height 300px
        margin 0 auto
        text-align center
        margin-top 60px
        .homeCodeImg
            width 250px
            height 250px
        .homeCodeFont
            font-size 35px
            color:#000000
    .homeFoot
        width 100%
        height 130px
        position absolute
        bottom 0
        background-color #ace9c5
        text-align center
        .homeFootButImg
          width:72px
          height 72px
          margin-top 10px
        .homeFootFont
          font-size 24px
          color:#000000
          margin-top 8px

    .homePageLaryer
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      background-color rgba(76,76,76,0.8)
      .signInImg
        width 571px
        height 294px
        position absolute
        left 50%
        top 50%
        -webkit-transform translate(-48%,-60%)
        transform translate(-48%,-60%)


    .pageLaryer
        position absolute
        left 0
        top 0
        width 100%
        height 100%
        background-color rgba(76,76,76,0.8)
        .paglaryerBox
            width 424px
            height 130px
            position absolute
            left 50%
            top 50%
            -webkit-transform translate(-50%,-50%)
            transform translate(-50%,-50%)
            .layerImg
                position absolute
                width 424px
                height 130px
                text-align center
            .layerText
                width 300px
                height 100px
                position absolute
                top 30px
                text-align:center
                left 50%
                -webkit-transform translate(-50%,0)
                transform translate(-50%,0)
                font-size 30px
                color:#000
            .layerClose
                width 38px
                height 38px
                position absolute
                top 150px
                left 50%
                -webkit-transform translate(-50%,0)
                transform translate(-50%,0)

.my-dot
    display inline-block
    width 20px
    height 20px
    background #a0a0a0
    border-radius 50%
    margin-right 20px;
    opacity 0.8
    position relative
    top -10px
.active
    background #ace9c5 !important
</style>