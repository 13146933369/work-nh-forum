<template>
    <div>
        <!-- SOURCE -->
        <div ref="printMe" class="bg" v-if="data1">
            <img src="../../assets/bg.jpg" class="img-bg"/>
            <img src="../../assets/canvasBor.png" class="img-1"/>
            <div class="pic">
                <img :src="imgUrl+data1.pic" class="img-2" id="reqImage" ref="reqImage">
            </div>
            <div class="vname" >{{data1.name}}</div>
            <div class="vyh">{{data1.branch}}</div>
            <div class="microFourDLike" v-if="showLike">
                <img src="../../assets/heart.png" class="microFourDLikeImg" @click="microFourDLikeFun">
                <div class="microFourDLikeText">{{vote}}</div>
            </div>
            <div class="content">
                {{data1.viewpoint}}
            </div>
            <img :src="bgImg3Src" class="code" ref="code">
        </div>

        <div class="microFourmButBox" v-if="showBut">
            <!--<div class="microShowBut" @click="">呼唤朋友</div>-->
            <div class="microShowBut" @click="createImg" ref="drawBtn" v-if="data1&&bgImg3Src">生成图片</div>
        </div>
        <!-- OUTPUT -->
        <img :src="output" class="img-user" ref="imgUser">

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

        <!--浮层开始-->
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
    import html2canvas from 'html2canvas'
    import {publicRequestPost} from '../../components/requerst/request'
    import qs from 'qs'
    import {shareFun} from '../../components/share/share'

    export default {
        created(){

        },
        data() {
            return {
                bgImg3Src : null,
                output: null,
                content:"",
                vote:"",
                imgUrl:this.GLOBAL.imgUrl,
                showBut:true, // 按钮显示
                showLike:true, //点赞显示
                imgTextSrc:"", //链接地址
                showImg:false, //合同图片显示
                pageLaryer:false,//浮层显示
                layerConten:"",
                id:this.$route.query.id,
                data1 : null,
                bgImg1Src:""
            }
        },
        mounted(){
            this.getData()
            this.drawCode();
        },
        methods: {
            createImg() {
                 var html = this.$refs.printMe;
                 var btn = this.$refs.drawBtn;

                 var width = html.offsetWidth;
                 var height = html.offsetHeight;

                 var getPixelRatio = function (context) {
                     var backingStore = context.backingStorePixelRatio ||
                         context.webkitBackingStorePixelRatio ||
                         context.mozBackingStorePixelRatio ||
                         context.msBackingStorePixelRatio ||
                         context.oBackingStorePixelRatio ||
                         context.backingStorePixelRatio || 1;
                     return (window.devicePixelRatio || 1) / backingStore;
                 };
                 var canvas = document.createElement("canvas");
                 var context =canvas.getContext('2d')

                 var scale = getPixelRatio(context);
                 // alert(scale)
                 // alert(width*scale)
                 var opts = {
                     scale : scale,
                     width : width,
                     height : height,
                     useCORS : true
                 }
                 this.$refs.code.style.display = "block"
                 var that = this;
                 html2canvas(html,opts).then(canvas => {
                    html.style.display = "none"
                    btn.style.display = "none"
                     var imgUrl= canvas.toDataURL("png"); // 获取生成的图片的url
                    this.output = imgUrl;
                     var userimg = that.$refs.imgUser
                     userimg.style.display = "block"

                 })
            },
            getData(){
                let url = "/vote/bbsInfo"
                let parameter =qs.stringify({
                    id:this.id
                })
                publicRequestPost(url,parameter ,this.getDataBack)
                // 显示loading
                this.bus.$emit('loading', true);
            },
            getDataBack(callBack){
                // 隐藏loading
                this.bus.$emit('loading', false);
                let self = this
                if(callBack.data.status == 2040){
                    let item = callBack.data.data.info
                    let vote = callBack.data.data.vote
                    self.bgImg1Src = this.imgUrl + item.pic
                    self.vote = vote
                    self.data1 = item;
                    let shartData ={
                        title:"农行详情页",
                        id:this.id,
                        imgageUrl:this.bgImg1Src
                    }
                    console.log(shartData);
                    shareFun(shartData)

                }

            },
            // 画二维码
            drawCode(){
                let url = "/vote/getSpCode"
                let parameter =qs.stringify({
                    id:this.id
                })
                publicRequestPost(url,parameter ,this.drawCodeBack)
            },
            drawCodeBack(callBack){
                if(callBack.data.status == 2150){
                    let item =callBack.data.data.url
                    this.bgImg3Src = this.imgUrl+item
                    console.log(this.bgImg3Src)
                }
            },
            microFourDLikeFun(){
                this.getVote()
            },
            getVote(){
                let url = "/vote/vote"
                let parameter =qs.stringify({
                    id:this.id,
                    key:111111
                })
                publicRequestPost(url,parameter ,this.getVoteBack)
            },
            getVoteBack(callBack){
                if(callBack.data.status == 2100){
                    this.layerConten="投票成功"
                    this.pageLaryer=true
                    return
                }
                if(callBack.data.status == 2103){
                    this.layerConten="没有投票次数"
                    this.pageLaryer=true
                    return
                }
                if(callBack.data.status == 2104){
                    this.layerConten="投票失败"
                    this.pageLaryer=true
                    return
                }
                if(callBack.data.status == 2103){
                    this.layerConten="没有此用户"
                    this.pageLaryer=true
                    return
                }
                if(callBack.data.status == 2103){
                    this.layerConten="参数有误"
                    this.pageLaryer=true
                    return
                }
            },
            layerCloseFun(){
                this.pageLaryer=false
            },
        }
    }
</script>

<style  scoped lang="stylus" type="text/stylus" >


    .bg{
        width : 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
    }
    .bg .img-bg{
        width: 750px;
        height:1334px;
    }
    .bg .img-1{
        width: 750px;
        height:1334px;
        position: absolute;
        top: 0;
        left:0;
    }
        .bg .pic{
            position: absolute;
            top: 97px;
            left:50%;
            margin-left:-230px;
            width : 458px;
            height:310px;
            display : flex;
            justify-content : center;
        }
    .bg .img-2{
       max-width : 100%;
        max-height:100%;
    }

    .microClassFoot{
        position: fixed;
        left: 0;
        bottom: 0;
        width : 750px;
        height :120px ;
        background : #ACE9C5;
    }
    .bg .vname{
        width : 500px;
        font-size: 25px;
        position: absolute;
        left:160px;
        top: 440px;
    }
    .bg .vyh{
        width : 500px;
        font-size: 25px;
        position: absolute;
        left:160px;
        top:492px;
    }
    .microClassFootBox{
        width : 650px;
        height : 120px;
        margin : 0 auto;
        display :flex;
        flex-direction : row;
        flex-wrap: wrap;
    }

    .flexBut{
        text-align : center;
        width : 120px;
        height :90px;
        margin : 0 20px;
        margin-top : 13px;
    }

    .flexBut img{
        height : 66px;
    }

    .flexFont{
        font-family:"微软雅黑";
        margin-top : 2px;
        font-size : 24px;
        color  : #000000;
        font-weight : bold;
    }

    .microFourmButBox{
        position : absolute;
        bottom : 140px;
        left : 50%;
        transform:translate(-50%,0);
        display  : flex;
    }


    .microShowBut{
        font-size : 28px;
        width :  175px;
        height : 55px;
        text-align : center;
        color:#7fdba4;
        background-color : #fff;
        border-radius : 30px;
        line-height : 55px;
        margin : 0 30px;
        border : 1px solid #000;
        box-shadow : 0px 0px 10px #eeeeee;
    }

.img-user{
    width : 750px;
    height:1334px;
    display : none;
}
    .microFourDLike{
        width :180px;
        height: 90px;
        position: absolute;
        top : 425px;
        left : 470px;
    }
    .microFourDLikeImg{
        width : 65px;
        height : 65px;
        position : absolute;
        top : 0;
        left : 0;
    }
    .microFourDLikeText{
        position : absolute;
        top : 15px;
        left : 90px;
        font-size : 28px;
        color : #afeac7;
    }
  .bg  .content
        position absolute;
        font-size : 24px;
        width 460px
        height:320px
        left:150px;
        top:600px;
        word-wrap:break-word;
        overflow-x :hidden;
        overflow scroll;

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



    .code
        position absolute;
        bottom  260px;
        left:50%;
        margin-left  -40px;
        width 80px;
        height:80px;
        display none;


</style>