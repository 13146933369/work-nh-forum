<template>
    <div class="loading" v-show="loading">
        <img src="../../assets/loading.gif" class="loadingImg">
    </div>
</template>
<script>
    export default {
        name: 'loading',
        data() {
            return {
                loading: false
            }
        },
        created() {
            var that = this;
            this.bus.$on('loading', function (data) {
                that.loading = !!data;
            })
        }
    }
</script>
<style  scoped>
    .loading{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        width:100%;
        height:100%;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.8);
    }
    .loadingImg{
        width:100px;
        height:100px;
    }


</style>