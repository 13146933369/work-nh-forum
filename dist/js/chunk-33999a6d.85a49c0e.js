(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33999a6d"],{b6fb:function(t,i,s){"use strict";s.r(i);var o=function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("div",{staticClass:"microFourmDetails"},[t._m(0),o("div",{staticClass:"scroll-list-wrap"},[o("cube-scroll",{ref:"scroll",attrs:{data:t.items,options:t.options},on:{"pulling-up":t.onPullingUp}},t._l(t.items,function(i,s){return o("div",{class:{microFourmStyle1:s%2===0,microFourmStyle2:s%2===1},on:{click:function(s){return t.microFourmFun(i)}}},[o("div",{staticClass:"microFourmDBHead"},[o("div",{staticClass:"microFourmDName"},[t._v(t._s(i.name)+"    "+t._s(i.branch))])]),o("div",{staticClass:"microFourmDOutB"},[o("div",{staticClass:"microFourmDInerB"},[t._v("\n                   "+t._s(i.viewpoint)+"\n                ")])]),o("img",{staticClass:"microFourmDImg",attrs:{src:t.imgUrl+i.pic}})])}),0)],1),o("div",{staticClass:"microFourmButBox"},[o("div",{staticClass:"microShowBut",on:{click:t.microShowMien}},[t._v("展现风采")]),o("div",{staticClass:"microShowBut",on:{click:t.microShowRule}},[t._v("展现规则")])]),o("div",{staticClass:"microClassFoot"},[o("div",{staticClass:"microClassFootBox"},[o("div",{staticClass:"flexBut"},[o("router-link",{attrs:{to:{path:"/microClass/microClassDefault"}}},[o("img",{attrs:{src:s("d966")}}),o("div",{staticClass:"flexFont"},[t._v("微课堂")])])],1),o("div",{staticClass:"flexBut"},[o("router-link",{attrs:{to:{path:"/microShow/microShowDefault"}}},[o("img",{attrs:{src:s("e1e8")}}),o("div",{staticClass:"flexFont"},[t._v("微展示")])])],1),o("div",{staticClass:"flexBut"},[o("router-link",{attrs:{to:{path:"/"}}},[o("img",{attrs:{src:s("0d40")}}),o("div",{staticClass:"flexFont"},[t._v("首页")])])],1),o("div",{staticClass:"flexBut"},[o("router-link",{attrs:{to:{path:"/broadcast/broadcastDefault"}}},[o("img",{attrs:{src:s("2f29")}}),o("div",{staticClass:"flexFont"},[t._v("动态播报")])])],1)])]),t.microFourmShow?o("div",{staticClass:"microFourmLaryer"},[t._m(1),o("img",{staticClass:"microFourmLClose",attrs:{src:s("cd5c")},on:{click:t.microFourmLCloseFun}})]):t._e()])},a=[function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("div",{staticClass:"microFourmDBox"},[o("img",{staticClass:"microFourmDHead",attrs:{src:s("d47e")}}),o("div",{staticClass:"microFourmConter"},[t._v("\n            场景金融就是将金融融入到客户衣食住行等日常生活场景中，并以此为核心向客户提供多样化金融服务。\n        ")])])},function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"microFourmLPic"},[s("div",{staticClass:"microFourmLConten"},[s("p",{staticClass:"microFourmLFont"},[t._v("1、在法律许可范围内，中国农业银行保留相关解释、调整及更改的权利；调整及更改经相关途径（如银行微信公众号）公告后生效。 ")]),s("p",{staticClass:"microFourmLFont"},[t._v("2、为保证活动的公平公正，中国农业银行已健立健全的活动监控机制，具备完善的监控系统；活动期间，如客户通过作弊手段获得奖品，一经中国农业银行技术部门证实，活动组有权取消其活动参与及获奖资格；对于作弊客户身份及手段确认，中国农业银行拥有最终解释权，所有参与活动客户视为自动遵从此条款。")]),s("p",{staticClass:"microFourmLFont"},[t._v("3、鉴于互联网之特殊性质，活动期间若发生黑客攻击、电信部门技术调整导致重大影响、病毒侵袭、网络故障、微信平台、宽带、域名解析故障或其他网络设备或技术提供商的服务延迟、服务障碍或任何其他类似事件，致使活动无法正常进行，中国农业银行不承担相关责任。 ")]),s("p",{staticClass:"microFourmLFont"},[t._v("4、活动如因系统维护或升级将暂停服务。由于暂停服务期间造成的一切不便与损失，中国农业银行均得免责。 ")])])])}],r=s("e814"),c=s.n(r),l=(s("ac6a"),s("3f2a")),e=s("4328"),n=s.n(e),u={data:function(){return{items:[],pullDownRefresh:this.pullDownRefreshObj,pullUpLoad:this.pullUpLoadObj,scrollbar:!0,microFourmShow:!1,pullDownRefreshThreshold:60,pullDownRefreshStop:40,page:1,pageCount:100,lastId:null,pic:"",imgUrl:this.GLOBAL.imgUrl}},created:function(){this.getData()},computed:{options:function(){return{pullDownRefresh:this.pullDownRefreshObj,pullUpLoad:this.pullUpLoadObj,scrollbar:!0}}},methods:{getData:function(){if(this.page<this.pageCount){if(this.items.length>0?this.lastId=this.items[this.items.length-1].id:this.item,this.items>0)this.items;var t="/vote/bbsList";console.log(this.lastId);var i=n.a.stringify({type:1,page:this.page,lastId:this.lastId});Object(l["a"])(t,i,this.getDataBack)}else this.$refs.scroll.forceUpdate()},getDataBack:function(t){var i=this;2034!=t.data.status&&2031!=t.data.status?2030==t.data.status&&(t.data.data.reArr.forEach(function(t){i.items.push(t)}),i.page++,i.pageCount=t.data.data.pageCount):this.$refs.scroll.forceUpdate()},pullUpLoadObj:function(){return!!this.pullUpLoad&&{threshold:c()(this.pullUpLoadThreshold),txt:{more:this.pullUpLoadMoreTxt,noMore:this.pullUpLoadNoMoreTxt}}},onPullingUp:function(){this.scrollbar?this.getData():this.$refs.scroll.forceUpdate()},microShowMien:function(){this.$router.push({path:"/microFourm/microFourmUploading"})},microShowRule:function(){this.microFourmShow=!0},microFourmLCloseFun:function(){this.microFourmShow=!1},microFourmFun:function(t){console.log(t.id),this.$router.push({path:"/microFourm/microFourmDetails",query:{id:t.id}})}}},m=u,d=(s("f550"),s("2877")),h=Object(d["a"])(m,o,a,!1,null,"30b6f6b8",null);i["default"]=h.exports},cd5c:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NDExRkI1Nzk4QkIxMUU5QkM1NEEzQUMxQUE2Q0U0QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NDExRkI1ODk4QkIxMUU5QkM1NEEzQUMxQUE2Q0U0QyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc0MTFGQjU1OThCQjExRTlCQzU0QTNBQzFBQTZDRTRDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc0MTFGQjU2OThCQjExRTlCQzU0QTNBQzFBQTZDRTRDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FedJ1AAAAqNJREFUeNrUmM9qE0EcxzNJaAPxoBSsTURT6KG3lMaC24P4AuITxDcoW/UBUu+y7Uu09FjrC4gXPWjr0ZRaRShGS2+CJqDrd/C7MB2yuzOz3br+4HOY7G9+v+9mdv79RBiGJQebBPPgDvDALTDNZ1/BG/AKvATvwdA2gbAQJsAC6IH7yu/HFHHK9hTFNhWfZ+AJeAfMEkphBiyAw/CvnYJVMAuqCX2q9Flln5Ax2iY50xwmwBaD9sEyEIYvoyLYt89YW4ztJGwaDBjoASg7CNKRMbqMOWAOK2FyCH6wc/McBOk0GVvmaJkKuwaG/NvrOYiKqDPHkDnPPNdn5QT4DCpgFnwv5WuXwEfwC9wAo7hZucnxb+T4T+lcZ87NuKFs06F7gaIiognR1oXJIT0CBwbLwRToWSTtsU/acnJADUIV1qFiz0DUCX0DA1EBfU8MxHn0XVSF7bKzSBEVreChgbhA800TJ+izEwmrsaOf8kZr4XgLDERFlvYJ+PSbVIexZTE0uq0b+JgMfYu+HdlYYaNq+DEnicsiKtr4pa3Ixjb4ZDm94wRkERUhtWyXOE13HNaeIAdRJWrpl3ny/OKwnTwCGwnP1+lja1LL1XLGvS7pNPo7S+Ayz+gzDn0D8DDh+WPw1CGu1PKt0B9/EZcLXzaWCrjALhV1S6oVcRPfLeqxp/NfHBQLe7T+l5eRxrjLSNz1TdrcBV3fPnBrO3N90/fKESs6V8BbUM9RVJ05LjPnyKTao5YIGjkN34C38LlxPnGnC3k7bin1ry7rY1lNMNYx2zfBoUt9TC9DeRnKUN55laH0pUQt3Pnc1yoJfSr08ZUd44hFwNScLqVOWbK8Z1nqfA7WwL5pqdNGmGo1FofvgttgUSsO74HX4AWLwz9tE/wRYACpQC6T0pMGnAAAAABJRU5ErkJggg=="},d135:function(t,i,s){},d47e:function(t,i,s){t.exports=s.p+"img/headPic.76dedee8.png"},f550:function(t,i,s){"use strict";var o=s("d135"),a=s.n(o);a.a}}]);
//# sourceMappingURL=chunk-33999a6d.85a49c0e.js.map