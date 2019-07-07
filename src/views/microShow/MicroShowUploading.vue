<template>
    <div class="microShowUploading">
       <div class="microShowUpHead"></div>
       <div class="microShowUpOutBox">
            <div class="microShowUpImg">
                <div class="microShowUpBg">
                    <cube-upload
                            ref="upload"
                            :simultaneous-uploads="1"
                            v-model="files"
                            action="#"
                            :max = "1"
                            :auto="false"
                            @files-added="addedHandler"
                            @file-error="errHandler">
                        <div class="clear-fix">
                            <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
                            <cube-upload-btn :multiple="false">
                                <div>
                                    <i>＋</i>
                                    <p style="color:#fff;font-size:14px;margin-top:5px">上传团队照片</p>
                                    <p style="color:#fff;font-size:14px;margin-top:5px">建议尺寸为横板</p>
                                </div>
                            </cube-upload-btn>
                        </div>
                    </cube-upload>
                    <!--<div  class="upLoadingName">上传团队照片</div>-->
                </div>
            </div>
            <div class="microShowUpConten">
                <div class="microShowInputName">
                    <div class="microShowInputLine"></div>
                    <input type="text" maxlength="15" placeholder="突击队名称" class="microShowInputData" v-model="name"/>
                </div>
                <div class="microShowInputName">
                    <div class="microShowInputLine"></div>
                    <input type="text" maxlength="20" placeholder="单位(xx分行xx支行)" class="microShowInputData" v-model="unit"/>
                </div>
                <div class="microShowInputName">
                    <div class="microShowInputLine"></div>
                    <input type="text" maxlength="20" placeholder="口号" class="microShowInputData" v-model="slogan"/>
                </div>
                <div class="manifestoBor">
                    <div class="manifestoLine"></div>
                    <textarea rows="10" cols="30" class="manifestoContent" maxlength="200"  placeholder="宣言" v-model="content"></textarea>
                </div>
                <div class="microShowSubmit" @click="microShowSubmitFun">确定</div>
            </div>
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
    import {publicRequestPost} from '../../components/requerst/request'
    import qs from 'qs'
    export default {
        data(){
            return{
                action: '',
                files: [],
                imgList:"",
                name:"",
                unit:"",
                slogan:"",
                pageLaryer:false,//浮层显示
                layerConten:"", //浮层内容
                content:""
            }
        },
        methods: {
            addedHandler(files) {
                let that = this
                let hasIgnore = false;
                const limitSize = 1 * 1024;
                // 最大5M
                const maxSize = 7* 1024 * 1024;
                for (let i = 0; i< files.length; i++) {
                    const file = files[i];
                    // 如果选择的图片大小最大限制（这里为5M）则弹出提示
                    if (file.size > maxSize) {
                        that.layerConten = "照片不能超过7M"
                        that.pageLaryer = true
                        file.ignore = true;
                        hasIgnore = true;
                         return
                    }else{
                        let reads= new FileReader();
                        reads.readAsDataURL(file);
                        reads.onload = function(e) {
                            var bdata = this.result;
                            that.imgList = bdata
                        }
                        file && this.$refs.upload.removeFile(file)
                    }

                }
            },
            errHandler(file) {
                // const msg = file.response.message
                this.$createToast({
                    type: 'warn',
                    txt: '请重新上传',
                    time: 1000
                }).show()
            },

            layerCloseFun(){
                this.pageLaryer=false
            },
            microShowSubmitFun(){
                let verrify = /^[\u4e00-\u9fa5]+$/;
                if(!this.imgList){
                    this.pageLaryer = true
                    this.layerConten ="请上传团队照片"
                    return
                }

                if(!verrify.test(this.name)){
                    this.pageLaryer = true
                    this.layerConten ="请正确填写突击队名称"
                    return
                }
                if(!this.unit){
                    this.pageLaryer = true
                    this.layerConten ="请正确填写单位"
                    return
                }
                if(!this.slogan){
                    this.pageLaryer = true
                    this.layerConten ="请正确填写口号"
                    return
                }
                if(!this.content){
                    this.pageLaryer = true
                    this.layerConten ="请填写宣言"
                    return
                }
                  this.getData()

            },
            getData(){
                    let url = "/vote/addShows"
                    let imgData = this.imgList.split(",")[1]
                    let parameter =qs.stringify({
                        key:"f94a2ad0-9ec8-11e9-9ca0-525400972e0a",
                        name: this.name,
                        branch:this.unit,
                        slogan:this.slogan,
                        manifesto:this.content,
                        pic:imgData
                    })
                    publicRequestPost(url,parameter ,this.getDataBack)
                    // 显示loading
                    this.bus.$emit('loading', true);
            },
            getDataBack(callBack){
                // 隐藏loading
                this.bus.$emit('loading', false);
                if(callBack.data.status == 2074){
                    this.pageLaryer = true
                    this.layerConten ="提交失败，请重新提交"
                    return
                }
                if(callBack.data.status == 2072){
                    this.pageLaryer = true
                    this.layerConten ="提交失败，请重新提交"
                    return
                }
                if(callBack.data.status == 2071){
                    this.pageLaryer = true
                    this.layerConten ="提交失败，请重新提交"
                    return
                }
                if(callBack.data.status == 2070){
                    this.$router.push({
                        path:"/microShow/microShowDefault"
                    })
                }
            },
        }
    }
</script>

<style lang="stylus" scoped>
.microShowUploading
    width: 100%
    height 100%
    background-color #fff
    font-family:"微软雅黑";
    .microShowUpHead
        position absolutea
        top:0
        left 0
        width 100%
        height 375px
        background-color #ace9c5
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

    .microShowUpOutBox
        position absolute
        top:30px
        left 50%
        transform translate(-50%,50)
        -webkit-transform translate(-50%,0)
        width 695px
        height 1050px
        border 1px solid #e7e7e7
        background-color #fff
        border-radius 2%
        box-shadow:black 0px 0px 8px;
        .microShowUpImg
            width 430px
            height 290px;
            position absolute
            left 50%;
            -webkit-transform translate(-50%,0)
            transform translate(-50%,0)
            top:85px;
            border 1px dashed #ace9c5
            .microShowUpBg
                position absolute
                left 50%;
                top:12px;
                -webkit-transform translate(-50%,0)
                transform translate(-50%,0)
                width:410px
                height 265px
                background-color:#ace9c5
                .microShowUpPic
                    width 88px
                    height 89px
                    position absolute
                    left 50%;
                    top:50%
                    -webkit-transform translate(-50%,-50%)
                    transform translate(-50%,-50%)
                 .upLoadingName
                     position absolute
                     left 50%;
                     -webkit-transform translate(-50%,-50%)
                     transform translate(-50%,-50%)
                     top 200px
                     font-size 28px
                     text-align center
                     color #fff


        .microShowUpConten
            position absolute
            left 50%
            top 380px
            transform translate(-50%,50)
            -webkit-transform translate(-50%,0)
            width 430px
            height 550px
            .microShowInputName
                width 430px
                height 60px
                background-color #f6f6ff
                border-radius 5px
                margin-top 30px
                .microShowInputLine
                    position absolute
                    left 20px
                    width 5px
                    height 50px
                    background-color:#ace9c5
                .microShowInputData
                    position absolute
                    font-family "微软雅黑"
                    left 80px
                    width 350px
                    height 60px
                    /*border 1px solid red*/
                    background-color:transparent
                    outline:none
                    color #000
                    font-size 30px
                input::-webkit-input-placeholder
                     color #929292


            .manifestoBor
                width 430px
                height 250px
                border-radius 5px
                border 2px solid #e7e7e7
                margin-top 30px
                .manifestoLine
                    width 400px
                    height 5px
                    background-color:#ace9c5
                    border-radius 2px
                    margin 0 auto
                    margin-top 20px
                .manifestoText
                    text-align center
                    color #929292
                    font-size 40px
                    margin 0 auto
                    margin-top 20px
                 .manifestoContent
                     width 400px;
                     height 128px
                     background-color:transparent
                     outline:none
                     color #000
                     margin-top 20px
                     margin-left 10px
                     overflow-x  hidden
                     line-height 40px
                     border none
                     font-size 25px
                .manifestoContent::-webkit-input-placeholder {
                    color #a09d9d
                    text-align center
                    line-height 150px
                    font-size 30px

                }

            .microShowSubmit
              width 200px
              height 70px
              border-radius 35px
              background-color:#ace9c5
              margin 0 auto
              margin-top 20px
              color #fff
              font-size 40px
              text-align center
              line-height 70px

.cube-upload
    .cube-upload-file

    .cube-upload-btn
        margin-top 30px
        height: 264px
    .cube-upload-file
        margin: 0
        + .cube-upload-btn
            margin-top: -200px
            opacity: 0
    /deep/.cube-upload-file-def
        height :100%;
        width : 100%;
        background-size contain;
        overflow hidden
        .cubeic-wrong
            display: none
    .cube-upload-btn
        display: flex
        align-items: center
        justify-content: center
        > div
            text-align: center
        i
            display: inline-flex
            align-items: center
            justify-content: center
            width: 70px
            height: 70px
            margin-bottom: 20px
            font-size: 40px
            line-height: 1
            font-style: normal
            color: #ace9c5
            background-color: #fff
            border-radius: 50%
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