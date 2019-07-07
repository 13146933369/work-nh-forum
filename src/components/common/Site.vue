<template>
  <div class="box">
    <div style="width: 100%;height: 100%;position: absolute;overflow-x: hidden">
      <div class="settingHead">
        <!--页头-->
        <div class="settingHeadLeft" @click="UserBack"></div>
        <div class="settingHeadSettings">添加收货地址</div>
        <div class="settingHeadDown" @click="saveAddress">保存</div>
      </div>
      <div class="settingOwnMsg">
        <!--个人信息-->
        <div class="settingOwnMMsg">
          <input
            type="text"
            class="settingOwnMNInput"
            placeholder="收件人"
            style="padding-top: 10px"
            v-model="receive_name"
          >
        </div>
        <div class="settingOwnLine"></div>
        <div class="settingOwnMMsg">
          <input type="text" class="settingOwnMNInput" placeholder="手机号码" v-model="telephone">
        </div>
        <div class="settingOwnLine"></div>
        <div class="settingOwnMMsg">
          <textarea
            type="text"
            class="settingOwnMNInput"
            placeholder="所在地区"
            v-model="province"
            disabled
            style="height:auto"
          ></textarea>
          <div class="settingOwnARight" @click="showAddressPicker"></div>
        </div>
        <div class="settingOwnLine"></div>
        <div class="settingOwnMMsg">
          <textarea
            class="settingOwnMNInput"
            placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等"
            style="width:100%;"
            v-model="address"
          ></textarea>
        </div>
      </div>
      <div class="settingOwnAddress">
        <!--默认地址-->
        <div style="width: 200px;float: left">设为默认地址</div>
        <cube-switch v-model="value" class="settingOwnARight"></cube-switch>
      </div>
    </div>
  </div>
</template>

<script>
import { replace } from "../../components/js/tree.js";
export default {
  data: function() {
    return {
      value: "",
      receive_name: "",
      telephone: "",
      province: "",
      address: "",
      proId: "",
      citId: "",
      areaid: "",
      isSure: false,
      ukeyId: ""
    };
  },
  methods: {
    UserBack: function() {
      this.$router.push("/userInfo/UserInfoDefaultSettings/UserInfoAddress");
    },
    saveAddress: function() {
      this.$http
        .post("/ShopFront/member/storeAddr", {
          ukey: this.ukeyId,
          receive_name: this.receive_name,
          telephone: this.telephone,
          province_id: this.proId,
          city_id: this.citId,
          district_id: this.areaid,
          address: this.address,
          is_default: this.isSure
        })
        .then(res => {
          if (res.data.status == 0) {
            this.$createDialog({
              type: "alert",
              title: res.data.msg,
              confirmBtn: {
                href: "/userInfo/UserInfoDefaultSettings/UserInfoAddress"
              }
            }).show();
          } else {
            this.$createDialog({
              type: "alert",
              title: res.data.msg
            }).show();
          }
        });
    },
    showAddressPicker() {
      this.addressPicker.show();
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.$createDialog({
        type: "warn",
        content: `Selected Item: <br/> - value: ${selectedVal.join(
          ", "
        )} <br/> - index: ${selectedIndex.join(
          ", "
        )} <br/> - text: ${selectedText.join(" ")}`,
        icon: "cubeic-alert"
      });
      this.province = selectedText.join(" ");
      this.proId = selectedVal[0];
      this.citId = selectedVal[1];
      this.areaid = selectedVal[2];
    },
    cancelHandle() {
      this.$createToast({
        type: "correct",
        txt: "Picker canceled",
        time: 1000
      });
    },
    getRegion: function() {
      this.$http.post("/admin/region/getRegion", { type: 2 }).then(res => {
        var result = res.data.data.regionTree;
        this.addressData = replace(result, [
          { keyLater: "text", keyBefore: "name" },
          { keyLater: "value", keyBefore: "id" }
        ]);
        this.addressPicker = this.$createCascadePicker({
          title: "City Picker",
          data: this.addressData,
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      });
    }
  },
  watch: {
    value: function() {
      //设置默认地址的监听事件
      this.isSure = this.value;
    }
  },
  created() {
    this.ukeyId = this.$store.state.token.ukey;
    this.ukeyId = "111111";
    this.getRegion();
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
    height: 130px;
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
    margin-right: 180px;
  }

  .settingHeadSettings {
    font-size: 36px;
    color: #6c6c6c;
    margin-right: 180px;
  }

  .settingHeadDown {
    font-size: 32px;
    color: #ff4602;
  }

  .settingOwnMsg {
    background-color: #fff;
    width: 100%;
    height: auto;
  }

  .settingOwnMMsg {
    font-size: 30px;
    padding: 15px 0 25px 40px;
    box-sizing: border-box;
  }

  .settingOwnMNInput {
    border: none;
    outline: none;
    background-color: #fff;
    overflow: hidden;
    resize: none;
  }

  .settingOwnLine {
    width: 100%;
    border: 1px solid #eeeeee;
    margin: 10px 0 20px 0px;
  }

  .settingOwnARight {
    float: right;
    margin-right: 30px;
    background: url('./assets/rightGray.png');
    width: 36px;
    height: 36px;
    background-size: cover;
    /* vertical-align: text-top; */
  }

  .settingOwnAddress {
    font-size: 32px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 30px;
    padding: 40px 40px;
    overflow: hidden;
  }
}
</style>