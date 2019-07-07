<template>
  <div class="box">
    <div style="width: 100%;height: 100%;position: relative;overflow-x: hidden">
      <div class="settingHead">
        <!--页头-->
        <div class="settingHeadLeft" @click="UserBack"></div>
        <div class="settingHeadSettings">我的收货地址</div>
        <div class="settingHeadDown" @click="addAddress">添加新地址</div>
      </div>
      <div
        class="settingAddress"
        v-for="(val,i) in personInfo"
        :key="i"
        @click.stop="settingClick(val.id)"
      >
        <!--地址列表-->
        <div class="settingAddressPic">
          <div class="settingAPLeft">{{val.receive_name}}</div>
        </div>
        <div class="settingAddressContent">
          <div style="margin-bottom: 8px">
            <span>{{val.receive_name}}</span>
            <span style="color:#c6c6c6;margin-left: 20px">{{val.telephone}}</span>
          </div>
          <div style="word-wrap: break-word">
            <span class="AddressSure" v-if="val.is_default">默认</span>
            <span>{{val.province_id+' '+val.city_id+' '+val.district_id+' '+val.address}}</span>
          </div>
        </div>
        <!-- <div class="settingAddressUpdate" @click.stop="compileSite(val)">编辑</div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      personInfo: [],
      AddressId: "111111",
      id: ""
    };
  },
  methods: {
    UserBack: function() {
      this.$router.push("/userInfo/UserInfoDefaultSettings");
    },
    addAddress: function() {
      var ukey = this.AddressId;
      this.$store.state.site.siteState = "site";
    },
    settingClick(particular) {
      this.$store.commit("paymsg/pay", {key:'siteId',value:particular});
      this.$store.state.paymsg.showState = "topDialog";
    }
  },
  mounted() {
    this.$http
      .post("/ShopFront/member/getAddrList", { ukey: this.AddressId })
      .then(res => {
        if (res.status == 200) {
          var result = res.data.data.memAddrList;
          this.personInfo = result;
        }
      });
  }
};
</script>

<style lang="stylus" scoped>
.box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  .settingHead {
    width: 100%;
    height: 100px;
    background: #f9f9f9;
    padding: 20px 20px 20px 15px;
    box-sizing: border-box;
  }

  .settingHead>div {
    display: inline-block;
    line-height: 60px;
  }

  .settingHeadLeft {
    background: url('./assets/left.png');
    width: 66px;
    height: 66px;
    background-size: cover;
    float: left;
    margin-right: 172px;
  }

  .settingHeadSettings {
    font-size: 36px;
    color: #6c6c6c;
    margin-right: 97px;
  }

  .settingHeadDown {
    font-size: 32px;
    color: #6c6c6c;
  }

  .settingAddress {
    width: 100%;
    background-color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .settingAddress>div {
  }

  .settingAddress>div:nth-of-type(1) {
    flex-grow: 1;
  }

  .settingAddress>div:nth-of-type(2) {
    flex-grow: 8;
  }

  .settingAddress>div:nth-of-type(3) {
    flex-grow: 1;
  }

  .settingAddressPic {
  }

  .settingAPLeft {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: #b7b9bb;
    color: #fff;
    text-align: center;
    font-size: 38px;
    line-height: 80px;
  }

  .settingAddressContent {
    font-size: 30px;
    margin: 0 20px;
    width: 280px;
  }

  .settingAddressUpdate {
    font-size: 30px;
    border-left: 1px solid #c6c6c6;
    padding-left: 20px;
    height: 50px;
    line-height: 60px;
  }

  .AddressSure {
    display: inline-block;
    background-color: #fff1eb;
    color: #ff5000;
    font-size: 26px;
    padding: 15px 10px;
    margin-right: 10px;
    letter-spacing: 5px;
  }
}
</style>