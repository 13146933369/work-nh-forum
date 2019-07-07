import wx from "weixin-js-sdk"
export const shareFun = (shareData) =>{
    wx.miniProgram.postMessage({ data: JSON.stringify(shareData) })

}
