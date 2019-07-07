<template>
    <div class="microClass">
        <div class="view-wrapper">
            <cube-recycle-list class="list" :size="size" :on-fetch="onFetch" :offset="offset">
                <template slot="item" slot-scope="{ data }">
                    <div :id="data.id" class="item" @click="handleClick(data)">
                        <div class="avatar" :style="{backgroundImage: 'url(' + (data.avatar || '') + ')'}"></div>
                        <div class="bubble">
                            <div class="microClassBox">
                                <div class="microClassCon">
                                    <!--<span class="microClassLLine"></span>-->
                                    <span class="microClassTitle">{{data.title}}</span>
                                    <!--<span class="microClassRLine"></span>-->
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
                    <router-link :to="{path:'/broadcast/broadcastDefault'}">
                        <img src="../../assets/but_4.png">
                        <div class="flexFont">动态播报</div>
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
                    <router-link :to="{path:'/microShow/microShowDefault'}">
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
            size:10,
            offset: 100,
            page: 1,
            total: 50, //判断是否有数据
            picTilte:"",
            pageCount:10000

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
                        type:1,
                        page: this.page,
                    })
                    publicRequestPost(url,parameter , function (callBack) {
                        if (callBack.data.status ==2010) {
                            console.log(callBack.data.data)
                            resolve(callBack.data.data.newsArr)
                            self.pageCount = callBack.data.data.pageCount
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

<style lang="stylus" scoped>
.view-wrapper
    position: fixed
    top:0
    left: 0
    bottom:80px
    width: 100%
 .microClassBox
     width:100%
     height 183px
     background url("../../assets/listBg.jpg") no-repeat center
     margin-bottom 40px
     .microClassCon
        line-height 183px
        text-align center
        .microClassLLine
          display:inline-block
          width 230px
          border-top:4px solid #fff
          vertical-align:middle
        .microClassRLine
          display:inline-block
          width 230px
          border-top:4px solid #fff
          vertical-align:middle
        .microClassTitle
          font-size 30px
          color #fff
          margin 0 30px
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