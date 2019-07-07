<template>
    <div class="microFourmDetails">
        <div class="microFourmDBox">
            <img src="../../assets/headPic.png" class="microFourmDHead">
            <div class="microFourmConter">
                场景金融就是将金融融入到客户衣食住行等日常生活场景中，并以此为核心向客户提供多样化金融服务。
            </div>
        </div>
        <!--列表开始-->
        <div class="scroll-list-wrap">
            <cube-scroll
                    ref="scroll"
                    :data="items"
                    :options="options"
                    @pulling-up="onPullingUp">
             <div :class="{microFourmStyle1:index%2===0,microFourmStyle2:index%2===1}"v-for="(itmesData,index) in items" @click="microFourmFun(itmesData)">
                 <div class="microFourmDBHead">
                     <div class="microFourmDName">{{itmesData.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{itmesData.branch}}</div>
                     <!--<div class="microFourmDUnit">{{itmesData.branch}}</div>-->
                 </div>
                 <div class="microFourmDOutB">
                    <div class="microFourmDInerB">
                       {{itmesData.viewpoint}}
                    </div>
                </div>
                <img :src="imgUrl+itmesData.pic" class="microFourmDImg">

             </div>


            </cube-scroll>
        </div>
        <!--列表结束-->
         <div class="microFourmButBox">
             <div class="microShowBut" @click="microShowMien ">展现风采</div>
             <div class="microShowBut" @click="microShowRule">展现规则</div>
         </div>
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
                    <router-link :to="{path:'/microShow/microShowDefault'}">
                        <img src="../../assets/but_2.png">
                        <div class="flexFont">微展示</div>
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
        <!--展现规则浮层-->
        <div class="microFourmLaryer" v-if="microFourmShow">
            <div class="microFourmLPic">
                <div class="microFourmLConten">
                    <p class="microFourmLFont">1、在法律许可范围内，中国农业银行保留相关解释、调整及更改的权利；调整及更改经相关途径（如银行微信公众号）公告后生效。 </p>
                    <p class="microFourmLFont">2、为保证活动的公平公正，中国农业银行已健立健全的活动监控机制，具备完善的监控系统；活动期间，如客户通过作弊手段获得奖品，一经中国农业银行技术部门证实，活动组有权取消其活动参与及获奖资格；对于作弊客户身份及手段确认，中国农业银行拥有最终解释权，所有参与活动客户视为自动遵从此条款。</p>
                    <p class="microFourmLFont">3、鉴于互联网之特殊性质，活动期间若发生黑客攻击、电信部门技术调整导致重大影响、病毒侵袭、网络故障、微信平台、宽带、域名解析故障或其他网络设备或技术提供商的服务延迟、服务障碍或任何其他类似事件，致使活动无法正常进行，中国农业银行不承担相关责任。 </p>
                    <p class="microFourmLFont">4、活动如因系统维护或升级将暂停服务。由于暂停服务期间造成的一切不便与损失，中国农业银行均得免责。 </p>
                </div>
            </div>
            <img src="../../assets/close.png" class="microFourmLClose" @click="microFourmLCloseFun">
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
                microFourmShow:false,
                pullDownRefreshThreshold: 60,
                pullDownRefreshStop: 40,
                page:1,
                pageCount:100,
                lastId:null,
                pic:"",
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
                if (this.page < this.pageCount) {
                    this.items.length > 0 ? this.lastId =  this.items[this.items.length-1].id : this.item
                    if(this.items >0){
                        var lastId = this.items
                    }
                    let url = "/vote/bbsList"

                    console.log(this.lastId)
                    let parameter =qs.stringify({
                        type:1,
                        page: this.page,
                        lastId:this.lastId
                    })
                    publicRequestPost(url,parameter ,this.getDataBack)

                }else{
                    this.$refs.scroll.forceUpdate()
                }
            },
            getDataBack(callBack){
                let self = this
                if(callBack.data.status == 2034){
                    this.$refs.scroll.forceUpdate()
                    return
                }
                if(callBack.data.status == 2031){
                    this.$refs.scroll.forceUpdate()
                    return
                }
                if(callBack.data.status == 2030){
                    callBack.data.data.reArr.forEach(item =>{
                        self.items.push(item)
                    })
                    self.page++
                    self.pageCount = callBack.data.data.pageCount
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
            microShowMien(){
                this.$router.push({
                    path:"/microFourm/microFourmUploading"

                })
            },
            microShowRule(){
                this.microFourmShow=true
            },
            microFourmLCloseFun(){
                this.microFourmShow=false
            },
            microFourmFun(obj){
                console.log(obj.id)
                this.$router.push({
                    path:"/microFourm/microFourmDetails",
                    query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                        id:obj.id
                    }

                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
.microFourmDetails
    position absolute
    width: 100%
    height 100%
    background url("../../assets/bg.jpg") no-repeat
    font-family:"微软雅黑"
    .microFourmDBox
        position relative
        .microFourmDHead
            position absolute
            top 45px
            left 50%
            transform translate(-50%,0)
            -webkit-ransform translate(-50%,0)
            width 656px
            height 248px
        .microFourmConter
            position absolute
            left 50%
            top 155px
            transform translate(-50%,0)
            -webkit-ransform translate(-50%,0)
            width 520px
            height 115px
            overflow-x hidden
            line-height 40px
            color #000000
            font-size 25px
            text-indent:2em
            overflow-x hidden
    .scroll-list-wrap
          width 100%
          height 630px
          margin-top 315px
          overflow-x hidden
          .microFourmStyle1
            width 640px
            height 130px
            position relative
            left 50%
            -webkit-transform translate(-50%,0)
            transform translate(-50%,0)
            margin-bottom 20px
            .microFourmDOutB
                position absolute
                top 50px
                width 640px
                height 85px
                background-color #fff
                border-radius 10px
                .microFourmDInerB
                    font-family "微软雅黑"
                    width 620px
                    height 65px
                    border 2px dashed #7fdba4
                    margin-left 9px
                    margin-top 10px
                    text-indent:2em
                    color #000000
                    font-size 25px
                    overflow-x hidden
                    line-height 35px
            .microFourmDBHead
                position absolute
                left 50px
                top 2px
                width 300px
                height 50px
                overflow hidden
                /*min-width 200px*/
                /*max-width 600px*/
                background-color #fff
                border-top-left-radius: 20px;
                border-bottom-left-radius: 10px;
                border-top-right-radius: 48px;
                border-bottpm-right-radius: 20px;
                color #000000
                font-size 25px
                .microFourmDName
                  width 260px;
                  height 25px;
                  overflow hidden
                  margin-top 15px
                  margin-left 20px
                  margin-right 25px
                  line-height:28px

                .microFourmDUnit
                  margin-top 6px
                  margin-left 10px
                  margin-right 25px  


            .microFourmDImg
               position absolute
               left -12px
               top:-3px
               width 70px
               height 70px
               border-radius 50%
               z-index 200



          .microFourmStyle2
              width 640px
              height 130px
              position relative
              left 50%
              -webkit-transform translate(-50%,0)
              transform translate(-50%,0)
              margin-bottom 20px
              .microFourmDOutB
                  position absolute
                  top 50px
                  width 640px
                  height 85px
                  background-color #fff
                  border-radius 10px
                  .microFourmDInerB
                      font-family "微软雅黑"
                      width 620px
                      height 65px
                      border 2px dashed #7fdba4
                      margin-left 9px
                      margin-top 10px
                      text-indent:2em
                      color #000000
                      font-size 25px
                      overflow-x hidden
                      line-height 35px
              .microFourmDBHead
                  position absolute
                  right  50px
                  top 2px
                  min-width 200px
                  max-width 600px
                  height 50px
                  background-color #fff
                  border-top-right-radius: 20px;
                  border-bottom-right-radius: 10px;
                  border-top-left-radius: 48px;
                  border-bottpm-left-radius: 20px;
                  color #000000
                  font-size 25px
                  .microFourmDName
                      width 260px;
                      height 25px;
                      overflow hidden
                      margin-top 15px
                      margin-right 20px
                      margin-left 25px
                      line-height:28px



                  .microFourmDUnit
                      margin-top 6px
                      margin-right 10px
                      margin-left 25px
              .microFourmDImg
                  position absolute
                  right -5px
                  top:-5px
                  width 70px
                  height 70px
                  border-radius 50%
                  z-index 200



    .microFourmButBox
        position absolute
        bottom 180px
        left 50%
        transform:translate(-50%,0)
        display flex
        .microShowBut
            font-size 28px
            width 175px
            height 55px
            text-align center
            color:#fff
            background-color #ace9c5
            border-radius 30px
            line-height 58px
            margin 0 30px
            font-weight bold
    .microFourmLaryer
          position absolute
          left 0
          top 0
          width 100%
          height 100%
          z-index 500
          background-color rgba(76,76,76,0.8)
          .microFourmLPic
            width:524px
            height 755px
            background url("../../assets/rule.png") no-repeat
            background-size 100% 100%
            position absolute
            left 50%
            top:150px
            -webkit-transform translate(-50%,0)
            transform translate(-50%,0)
            .microFourmLConten
                position absolute
                left 50%
                top 160px
                -webkit-transform translate(-50%,0)
                transform translate(-50%,0)
                width 350px
                height 465px
                overflow-x hidden
                .microFourmLFont
                    font-size 25px;
                    color: #000000
                    font-family "微软雅黑"
                    margin-bottom 15px
                    line-height 30px
          .microFourmLClose
            width 38px
            height 38px
            position absolute
            left 50%
            top:840px
            z-index 800
            -webkit-transform translate(-50%,-0)
            transform translate(-50%,0)







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


</style>