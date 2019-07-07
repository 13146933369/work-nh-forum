<template>
  <div class="box">
    <div class="price_box">
      <div class="price_title">
        <p>请选择支付方式</p>
        <p @click="close">X</p>
      </div>
      <div class="price_mode" v-for="(item,i) in mode" :key="i">
        <div>
          <img :src="item.img" alt>
          <p>{{item.name}}</p>
        </div>
        <div>
          <input
            name="Fruit"
            @click="priceMode(item.id)"
            v-model="item.active"
            type="checkbox"
            class="tui-checkbox"
          >
        </div>
      </div>
      <cube-button @click="priceSubmit">结算商品</cube-button>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import { price } from "../js/price.js";
export default {
  data() {
    return {
      mode: [
        {
          id: 2,
          img: require("../../assets/weixin.jpg"),
          name: "微信支付",
          active: true
        },
        {
          id: 1,
          img: require("../../assets/weixin.jpg"),
          name: "货到付款",
          active: false
        }
      ]
    };
  },
  created() {},
  methods: {
    priceSubmit() {
      this.mode.forEach(v => {
        if (v.active) {
          if (v.id === 2) {
            this.$store.commit("paymsg/pay", {
              key: "pay_path",
              value: 2
            });
            this.addOrder();
          } else if (v.id === 1) {
            this.$store.commit("paymsg/pay", {
              key: "pay_path",
              value: 1
            });
            this.addOrder();
          }
        }
      });
    },
    //创建订单
    async addOrder() {
      let payInfo = this.$store.state.paymsg.pay;
      // if(payInfo.u_uuid.split("#/")[1]){
      //   this.$store.commit("paymsg/pay", { key: "u_uuid", value: payInfo.u_uuid.split("#/")[0] });
      // }

      const ret = await this.$http.post("/shopfront/Order/addOrder", {
        apitolen: payInfo.apitolen,
        m_uuid: payInfo.m_uuid,
        u_uuid: payInfo.u_uuid,
        distribution_mode: payInfo.distribution_mode,
        pay_path: payInfo.pay_path,
        types: payInfo.types,
        address_id: payInfo.address_id
      });
      if (ret.data.status === 200) {
        this.$store.commit("paymsg/pay", {
          key: "priceUuid",
          value: ret.data.data
        });
        let id = "";
        this.mode.forEach(v => {
          if (v.active) {
            if (v.id === 2) {
              this.priceHttp();
            } else {
              this.$store.commit("paymsg/payEmpty", {});
              this.$router.push({ path: "/cart/cartfinish" });
              this.$store.commit("paymsg/showState", false);
              this.$store.commit("paymsg/popShowSet", false);
            }
          }
        });
      }
    },
    //发起支付
    priceHttp() {
      let priceUuid = this.$store.state.paymsg.pay.priceUuid;
      let ukey = this.$store.state.token.ukey;
      price(this, priceUuid, ukey);
    },
    close() {
      this.$store.commit("paymsg/payEmpty", {});
      this.$store.commit("paymsg/showState", false);
      this.$store.commit("paymsg/popShowSet", false);
    },
    priceMode(id) {
      this.mode.forEach(v => {
        if (v.id === id) {
          v.active = true;
        } else {
          v.active = false;
        }
      });
    }
  }
};
function UrlSearch() {
  var name, value;
  var str = window.location.href; //取得整个地址栏
  var num = str.indexOf("?");
  str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

  var arr = str.split("&"); //各个参数放到数组里
  for (var i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      this[name] = value;
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../css/checkbox.css';

.box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  .price_box {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;

    .price_title {
      width: 100%;
      height: 100px;
      background: #fff;
      font-size: 35px;
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #ddd;

      p {
        height: 100%;
        line-height: 100px;
      }

      p:nth-of-type(1) {
        flex: 0 0 85%;
        text-align: center;
        padding-left: 30px;
      }

      p:nth-of-type(2) {
        flex: 0 0 10%;
        text-align: center;
      }
    }

    .price_mode {
      width: 100%;
      height: 100px;
      background: #fff;
      font-size: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;

      div {
        display: flex;
        flex-direction: row;
        width: 240px;

        img {
          width: 70px;
          height: 70px;
          margin-right: 20px;
          margin-left: 20px;
        }
      }

      div:nth-of-type(1) {
        height: 100%;
        align-items: center;
      }

      div:nth-of-type(2) {
        width: 100px;
        height: 100%;
        align-items: center;
      }
    }

    .cube-btn {
      height: 120px;
      background: #dc001a;
    }
  }
}
</style>