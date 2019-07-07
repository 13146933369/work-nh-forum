<template>
    <div class="broadcast">
        <div class="view-wrapper">
            <cube-recycle-list class="list" :size="size" :on-fetch="onFetch" :offset="offset">
                <template slot="item" slot-scope="{ data }">
                    <div :id="data.id" class="item" @click="handleClick(data)">
                        <div class="avatar" :style="{backgroundImage: 'url(' + (data.avatar || '') + ')'}"></div>
                        <div class="bubble">
                            <div class="broadcastBox">
                                <div class="broadcastBoxBor">
                                    <img :src="imgUrl+data.pic" class="broadcastImg">
                                    <img src="../../assets/boradcastStart.png" class="broadcastStar">
                                    <div class="broadcastMainTitle">{{data.title}}</div>
                                    <div class="broadcasTitle">{{data.title_s}}</div>
                                    <img src="../../assets/boradcastEnter.png" class="broadcasEnter">
                                </div>

                            </div>
                        </div>
                    </div>
                </template>
            </cube-recycle-list>
        </div>
        <!--底部菜单栏-->
        <div class="microClassFoot">
            <div class="microClassFootBox">
                <div class="flexBut">
                    <router-link :to="{path:'/microClass/microClassDefault'}">
                        <img src="../../assets/but_4.png">
                        <div class="flexFont">微课堂</div>
                    </router-link>
                </div>
                <div class="flexBut">
                    <router-link :to="{path:'/microClass/microClassDefault'}">
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
                    <router-link :to="{path:'/microClass/microClassDefault'}">
                        <img src="../../assets/but_3.png">
                        <div class="flexFont">微展示</div>
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
                size: 10,
                offset: 100,
                page: 1,
                total: 50, //判断是否有数据
                imgUrl:this.GLOBAL.imgUrl,
                pageCount:"10000"
            }
        },
        methods: {
            onFetch() {
                var self = this
                return new Promise((resolve) => {
                    // 模拟请求 50 条数据，因为 size 设置为 50
                    if (self.page <= self.pageCount) {
                        let url = "/vote/newsList"
                        let parameter =qs.stringify({
                            type:2,
                            page: this.page,
                        })
                        publicRequestPost(url,parameter , function (callBack) {
                            if (callBack.data.status ==2010) {
                                console.log(callBack.data.data)
                                resolve(callBack.data.data.newsArr)
                                self.pageCount = callBack.data.data.pageCount
                                console.log(self.pageCount)
                                self.page++
                            } else {
                                self.searchTextState = true
                                resolve(false)
                            }
                        })
                    } else {
                        resolve(false)
                    }
                })
            },
            handleClick(data) {
                window.location.href = data.link
            }
        }
    }
</script>

<style lang="stylus"scoped>
    .view-wrapper
        position: fixed
        top:0
        left: 0
        bottom:120px
        width: 100%
      .broadcastBox
        position relative
        width 660px;
        height 180px;
        margin 0 auto
        margin-top 40px
        .broadcastBoxBor
          width 600px
          height 180px
          margin 0 auto
          box-shadow: 0 0 4px #eaeaea;
          border 1px solid #f1f1f1
          border-radius 20px
          .broadcastImg
            width 146px
            height 141px
            position absolute
            top:20px;
            left 0
          .broadcastStar
            position absolute
            top:128px
            left 175px;
            width 167px
            height 25px
          .broadcastMainTitle
             position absolute
             top:45px
             left 176px
             font-size 30px
             color:#232323
             font-weight bold
          .broadcasTitle
              position absolute
              top:92px
              left 176px
              font-size 25px
              color:#535353
           .broadcasEnter
               position absolute
               right 0
               top:130px
               width 130px;
               height 45px
               line-height 40px
               background-color:#ace9c5
               font-size 20px
               text-align center
               color:#fff
               border-radius 10%





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