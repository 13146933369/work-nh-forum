<template>
  <div class="box">
    <div class="pop-up">
      <div class="price_title">
        <p>录入支付信息</p>
        <p @click="close">X</p>
      </div>
      <div class="pop-select">
        <p>收货地址</p>
        <div v-if="deliverySite" @click="siteChoose" style="color:#EC8793;">{{showSite}}</div>
        <div v-else @click="siteState" style="color:#EC8793;margin-right: 25px;">请添加收货地址</div>
      </div>
      <div class="pop-select" v-for="(item,index) in select" :key="index">
        <p>{{item.title}}</p>
        <div>
          <cube-select
            v-model="item.value"
            :auto-pop="item.autoPop"
            :disabled="item.disabled"
            :placeholder="item.placeholder"
            :options="item.options"
          ></cube-select>
        </div>
      </div>
      <div class="pop-select">
        <p>应付金额</p>
        <div style="color:#e51c23;">
          ¥{{$store.state.paymsg.pay.price}}
          <span style="color:#B3B3B3;">(含税费¥0.00)</span>
        </div>
      </div>
      <div class="pop-select">
        <p class="pop-select-box">
          <input name="Fruit" v-model="deal" type="checkbox" class="tui-checkbox">
          <span class="agreement">本人同意并接受以下协议</span>
        </p>
        <div class="total-price">¥{{$store.state.paymsg.pay.price}}</div>
      </div>
      <cube-button @click="submitIndent">确认信息</cube-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deliverySite: false, //地址显示
      deal: false, //协议是否勾选
      showSite: "",
      select: [
        {
          options: ["快递"],
          value: "快递",
          title: "配送",
          placeholder: "请选择配送方式",
          autoPop: false,
          disabled: false
        }
      ]
    };
  },
  created() {
    this.$store.commit("paymsg/showState", "topDialog");
  },
  computed: {
    TopDialog() {
      return this.$store.state.paymsg.showState;
    }
  },
  watch: {
    TopDialog(v) {
      if (v === "topDialog") this.siteList();
    }
  },
  methods: {
    //提交订单获取数据
    submitIndent() {
      console.log(this.$store.state.token);
      if (this.deal && this.deliverySite) {
        this.submitInfo([
          { key: "apitolen", value: 1 },
          { key: "m_uuid", value: this.$store.state.token.scene },
          { key: "u_uuid", value: this.$store.state.token.ukey },
          { key: "distribution_mode", value: 1 },
          { key: "types", value: this.$store.state.paymsg.pay.types },
          { key: "address_id", value: this.$store.state.paymsg.pay.siteId }
        ]);
      } else {
        if (!this.deal) {
          alert("请勾选协议");
        }
        if (!this.deliverySite) {
          alert("请填写收货地址");
        }
      }
    },
    //提交订单接口
    async submitInfo(obj) {
      obj.forEach(v => {
        this.$store.commit("paymsg/pay", v);
      });
      this.$store.commit("paymsg/showState", "price");
    },
    //获取地址列表
    async siteList() {
      if (this.$store.state.paymsg.pay.siteId) {
        this.siteInfo(this.$store.state.paymsg.pay.siteId);
        return;
      }
      const ret = await this.$http.post("/ShopFront/member/getAddrList", {
        ukey: "111111"
      });
      const { memAddrList } = ret.data.data;

      if (memAddrList) {
        this.deliverySite = true;
        let id = memAddrList.filter(v => {
          return v.is_default === 1;
        });
        if (id) {
          this.siteInfo(id[0].id);
        } else {
        }
      }
    },
    //vuex中取出id获得地址
    async siteInfo(id) {
      this.$store.commit("paymsg/pay", { key: "siteId", value: id });
      const ret = await this.$http.post("/ShopFront/member/getAddrInfo", {
        addr_id: this.$store.state.paymsg.pay.siteId
      });
      const {
        province_id,
        city_id,
        district_id,
        address
      } = ret.data.data.memAddrInfo;
      this.showSite =
        province_id.name +
        " " +
        city_id.name +
        " " +
        district_id.name +
        " " +
        address;
      this.deliverySite = true;
    },
    siteState() {
      this.$store.commit("paymsg/showState", "site");
    },
    siteChoose() {
      this.$store.commit("paymsg/showState", "siteCfhoose");
    },
    close() {
      this.$store.commit("paymsg/payEmpty", {});
      this.$store.commit("paymsg/showState", false);
      this.$store.commit("paymsg/popShowSet", false);
    }
  }
};
</script>

<style lang="stylus" scoped>
.box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  .pop-up {
    width: 100%;
    height: auto;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    background: #fff;

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

    .pop-select {
      font-size: 30px;
      height: 100px;
      display: flex;
      flex-direction: row;
      padding: 10px 20px 10px 20px;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      border-bottom: 1px solid rgb(232, 232, 232);

      /deep/ .cube-select {
        padding-right: 70px;
        font-size: 28px;
      }

      .cube-select::after {
        border: 0;
      }

      /deep/.cube-select-icon {
        border-width: 0.153333rem 0.153333rem 0 0.153333rem;
      }

      p {
        width: 200px;
      }

      .agreement {
        color: #858585;
        font-size: 12px;
      }

      .pop-select-box {
        display: flex;
        flex-direction: row;
        width: 400px;
        align-items: center;

        span {
          font-size: 28px;
        }
      }

      .total-price {
        margin-right: 20px;
      }
    }

    .cube-btn {
      height: 120px;
      font-size: 35px;
      background: #dc001a;
    }
  }
}
</style>  