<template>
  <div style="height: 100%;
    display: flex;
    flex-direction: column;">
    <div class="cart-list">
      <div class="commodity" v-for="(item,i) in cartList" :key="i">
        <div class="cart-item">
          <input name="Fruit" type="checkbox" v-model="item.active" class="tui-checkbox">
          <div class="commodity-img-box">
            <img :src="item.modeImg" alt>
          </div>
          <div class="commodity-content-box">
            <div class="commodity-name">
              <!-- <span style="color:#FA788F;">特价</span> &nbsp; -->
              <span>{{item.goods_name}}</span>
            </div>
            <div class="commodity-price">
              <p>¥{{Number(item.goods_price).toFixed(2)}}</p>
              <p style="color:#FA788F;">已降0</p>
              <p class="num-count">
                <button class="count-button" @click="minus(i)">-</button>
                <span>x{{item.goods_num}}</span>
                <button class="count-button" @click="add(i)">+</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 价格计算 -->
      <div class="price-compute">
        <p>优惠活动：-¥0.00</p>
        <p>本仓总计(不含税)：¥{{Number(total_price).toFixed(2)}}</p>
      </div>
    </div>
    <!-- 全选确认结算 -->
    <div v-if="strikeGet" class="settle-accounts">
      <div class="check-all">
        <input
          @click="activeOff"
          name="Fruit"
          v-model="active"
          type="checkbox"
          class="tui-checkbox"
        >
        <p>全选</p>
      </div>
      <div class="settle-price">
        <p>
          总计(不含税)：
          <span>¥{{Number(total_price).toFixed(2)}}</span>
        </p>
        <p>商品税费：0.00</p>
      </div>
      <cube-button @click="buy" class="buy">确认({{num}})</cube-button>
    </div>
    <!-- 删除 -->
    <div v-else class="settle-accounts">
      <div class="check-all">
        <input
          @click="activeOff"
          name="Fruit"
          v-model="active"
          type="checkbox"
          class="tui-checkbox"
        >
        <p>全选</p>
      </div>
      <cube-button @click="remove" class="buy">删除</cube-button>
    </div>
    <!-- <submit-order></submit-order> -->
  </div>
</template>

<script>
import SubmitOrder from "./SubmitOrder.vue";
export default {
  props: ["strike"],
  components: {
    // SubmitOrder
  },
  data() {
    return {
      strikeGet: this.strike,
      cartList: [],
      check_goods: [],
      active: true
    };
  },
  async created() {
    const ret = await this.$http.post("/ShopFront/car/getCarsList", {
      uuid: this.$store.state.token.ukey,
      muid: this.$store.state.token.scene
    });
    for (let i in ret.data.data) {
      this.cartList.push({
        ...ret.data.data[i],
        active: true
      });
    }
  },
  computed: {
    total_price() {
      let num = 0;
      this.cartList.forEach(v => {
        if (v.active) {
          num += v.goods_num * v.goods_price;
        }
      });
      return num;
    },
    num() {
      return this.cartList.length || 0;
    }
  },
  watch: {
    strike(strike) {
      this.strikeGet = strike;
    },
    active(state) {
      if (state) {
        this.cartList.forEach(v => {
          v.active = true;
        });
      }
    },
    total_price(num) {
      this.$store.commit("paymsg/pay", { key: "price", value: num });
    },
    cartList: {
      handler: function(o) {
        console.log(o);
        let state = o.every(v => {
          return v.active === true;
        });
        if (state) {
          this.active = true;
        } else {
          this.active = false;
        }
      },
      deep: true
    }
  },
  methods: {
    activeOff(e) {
      if (!e.target.checked) {
        this.cartList.forEach(v => {
          v.active = false;
        });
      }
    },
    buy() {
      if (!this.cartList.length) {
        console.log("还没有选择商品");
        return;
      }
      let specifications = {};
      let num = 0;
      this.cartList.forEach(v => {
        if (v.active) {
          specifications[v.id] = v.goods_num;
          num += v.goods_num * v.goods_price;
        }
      });
      this.$store.commit("paymsg/pay", { key: "price", value: num });

      if (Object.keys(specifications).length) {
        this.$store.commit("paymsg/pay", {
          key: "types",
          value: JSON.stringify(specifications)
        });

        this.$store.commit("paymsg/popShowSet", true);
        console.log(this.$store.state.paymsg.popshow);
      }
    },
    async minus(i) {
      const num = this.cartList[i].goods_num;
      if (num > 1) {
        const ret = await this.$http.post("/ShopFront/car/addCars", {
          goods_id: this.cartList[i].goods_id,
          id: this.cartList[i].id,
          goods_num: -1,
          uuid: this.$store.state.token.ukey,
          muid: this.$store.state.token.scene,
          goods_name: this.cartList[i].goods_name,
          goods_img: this.cartList[i].modeImg
        });
        if (ret.data.status === 200) {
          this.cartList[i].goods_num -= 1;
        }
      } else {
        alert("不能在少了");
      }
    },
    async add(i) {
      const ret = await this.$http.post("/ShopFront/car/addCars", {
        goods_id: this.cartList[i].goods_id,
        id: this.cartList[i].id,
        goods_num: 1,
        uuid: this.$store.state.token.ukey,
        muid: this.$store.state.token.scene,
        goods_name: this.cartList[i].goods_name,
        goods_img: this.cartList[i].modeImg
      });
      if (ret.data.status === 200) {
        this.cartList[i].goods_num++;
      } else {
        console.log(ret.data.msg);
      }
    },
    remove() {
      let removeArr = [];
      let webRemove = [];
      this.cartList.forEach(v => {
        if (v.active) {
          removeArr.push(v.goods_id + "_" + v.id);
        }
      });
      this.removeHttp(removeArr);
    },
    async removeHttp(removeArr) {
      const ret = await this.$http.post("/ShopFront/car/deleteCars", {
        uuid: this.$store.state.token.ukey,
        muid: this.$store.state.token.scene,
        id: removeArr
      });
      if (ret.data.status === 200) {
        this.remakeCart();
      }
    },
    async remakeCart() {
      const ret = await this.$http.post("/ShopFront/car/getCarsList", {
        uuid: this.$store.state.token.ukey,
        muid: this.$store.state.token.scene
      });
      this.cartList = [];
      for (let i in ret.data.data) {
        this.cartList.push({
          ...ret.data.data[i],
          active: true
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../css/checkbox.css';

.cart-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;

  .cart-item {
    width: 100%;
    height: 150px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 10px;

    .commodity-img-box {
      width: 100px;
      height: 100px;

      & img {
        width: 100%;
        height: 100%;
      }
    }

    .commodity-content-box {
      height: 80%;
      width: 530px;
      margin-left: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .commodity-name {
        height: 100%;
        flex: 0 0 65%;
        font-size: 21px;
        line-height: 28px;
        overflow: hidden;
      }

      .commodity-price {
        height: 100%;
        flex: 0 0 35%;
        display: flex;
        flex-direction: column;
        font-size: 18px;
        text-align: center;

        p {
          width: 100%;
          margin-top: 10px;
        }

        p:nth-of-type(1) {
          font-size: 35px;
          font-weight: bold;
        }

        p:nth-of-type(4) {
          text-align: right;
        }

        p:nth-of-type(4)::after {
          display: inline-block;
          content: ' ';
          height: 15px;
          width: 15px;
          border-width: 0 2px 2px 0;
          border-bottom: 3px;
          border-right: 3px;
          border-style: solid;
          border-color: rgb(179, 179, 179);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform-origin: center;
          transition: transform 0.3s;
          margin-right: 7px;
        }
      }
    }
  }

  .cart-count {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

.price-compute {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-top: 1px solid rgb(242, 242, 242);
  text-align: right;
  font-size: 30px;

  p {
    width: 90%;
    color: #4d4d4d;
  }
}

.settle-accounts {
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;

  .check-all {
    width: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 27px;
    color: #4d4d4d;
  }

  .settle-price {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding-right: 10px;
    line-height: 40px;
    font-size: 25px;
  }

  .buy {
    height: 100%;
    width: 200px;
    font-size: 35px;
    background: rgb(220, 0, 26);
  }
}

.count-button {
  padding: 15px;
  margin: 5px;
  line-height: 10px;
}
</style>