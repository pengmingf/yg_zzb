(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/food/food_menu/index"],{2842:function(t,n,o){"use strict";(function(t,e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){return o.e("components/uni-segmented-control/uni-segmented-control").then(o.bind(null,"6739"))},c={components:{uniSegmentedControl:a},data:function(){return{items:["早餐","正餐","明日特供"],styleType:"button",activeColor:"#007aff",current:0,productList:[],foodList:[],breakfast_list:[],renderImage:!1,tuser_id:t.getStorageSync("tuser_id")}},methods:{onClickItem:function(t){this.current!==t&&(this.current=t)},yuding:function(n){var o=this;t.showModal({content:"预订此餐，明日会有管家为您送上。确定要预订吗？",confirmColor:"#FF3333",confirmText:"预订",success:function(e){e.confirm?t.request({url:"https://ygjs.mfmeat.top/index.php/api/food/yuding",data:{tuser:o.tuser_id,foodId:n.Id},method:"POST",dataType:"json",success:function(n){t.showLoading({mask:!0,title:"预定中..."}),1==n.data.code?t.showModal({content:"预订成功",showCancel:!1}):2==n.data.code?t.showModal({content:"您已预订该餐品,请勿重复预定",showCancel:!1}):3==n.data.code?t.showModal({content:"该商品已下架",showCancel:!1}):t.showModal({content:"预订失败",showCancel:!1})},complete:function(n){t.hideLoading()}}):e.cancel&&t.showToast({icon:"none",title:"您已取消预订"})}})},loadData:function(){var n=this,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"add";t.request({url:"https://ygjs.mfmeat.top/index.php/api/food/menu",dataType:"json",success:function(t){console.log(e(t.data," at pages\\food\\food_menu\\index.vue:161")),t.data.productList.forEach(function(t){n.productList.push(t)}),t.data.foodList.forEach(function(t){n.foodList.push(t)}),t.data.breakfastList.forEach(function(t){n.breakfast_list.push(t)})}}),"refresh"===o&&(this.productList=[])},foodDetail:function(n){t.navigateTo({url:"detail?id="+n.Id})},qx_yuding:function(n){var o=this;t.showModal({content:"如果餐品已经做出，此刻您取消也是无效的，你确定要取消预定吗?",success:function(e){e.confirm&&t.request({url:"https://ygjs.mfmeat.top/index.php/api/food/qxyuding",data:{tuser:o.tuser_id,foodId:n.Id},method:"POST",dataType:"json",success:function(n){1!=n.data.code?t.showModal({content:n.data.message,showCancel:!1}):t.showToast({title:"取消预订成功",icon:"none"})}})}})}},onLoad:function(){var t=this;this.loadData(),setTimeout(function(){t.renderImage=!0},300)}};n.default=c}).call(this,o("6e42")["default"],o("0de9")["default"])},"377e":function(t,n,o){"use strict";(function(t){o("9217"),o("921b");e(o("66fd"));var n=e(o("fcaa"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("6e42")["createPage"])},"8a5d":function(t,n,o){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},a=[];o.d(n,"a",function(){return e}),o.d(n,"b",function(){return a})},c0c7:function(t,n,o){"use strict";var e=o("ff04"),a=o.n(e);a.a},c274:function(t,n,o){"use strict";o.r(n);var e=o("2842"),a=o.n(e);for(var c in e)"default"!==c&&function(t){o.d(n,t,function(){return e[t]})}(c);n["default"]=a.a},fcaa:function(t,n,o){"use strict";o.r(n);var e=o("8a5d"),a=o("c274");for(var c in a)"default"!==c&&function(t){o.d(n,t,function(){return a[t]})}(c);o("c0c7");var s=o("2877"),u=Object(s["a"])(a["default"],e["a"],e["b"],!1,null,null,null);n["default"]=u.exports},ff04:function(t,n,o){}},[["377e","common/runtime","common/vendor"]]]);