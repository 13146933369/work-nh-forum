import wx from "weixin-js-sdk";
async function price(_this, priceUuid, ukey) {

  const ret = await _this.$http.post("/api/miniwxpay", {
    o_uuid: priceUuid,
    u_uuid: ukey
  });
  alert(priceUuid+"$$$$"+ukey)
  const { appId, nonceStr, paySign, signType, timeStamp } = ret.data.data;
  if (ret.data.status === 200) {
    const prepay_id = ret.data.data.package.split("=")[1];
    var params =
      "?timestamp=" +
      timeStamp +
      "&nonceStr=" +
      nonceStr +
      "&package=" +
      prepay_id +
      "&signType=" +
      signType +
      "&paySign=" +
      paySign +
      "&priceUuid=" +
      priceUuid;
    //定义path 与小程序的支付页面的路径相对应
    var path = "/pages/wxpay/wxpay" + params;
    //通过JSSDK的api使小程序跳转到指定的小程序页面
    var isWxMini = window.__wxjs_environment === "miniprogram";
    // wx.ready(function(){
    if (isWxMini) {
      wx.miniProgram.navigateTo({ url: path });
    }
  } else {
    this.$store.commit("paymsg/payEmpty", {});
    this.$router.push({ path: "/cart/cartlose" });
  }
}
export { price };
