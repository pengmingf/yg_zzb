(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/food/food_menu/detail"],{"5aa3":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{food:void 0,image:void 0}},methods:{getFoodDetail:function(e){var n=this;t.request({url:"https://ygjs.mfmeat.top/index.php/api/food/foodDetail",data:{Id:e},dataType:"json",success:function(t){n.food=t.data,n.image=t.data.image}})}},onLoad:function(t){this.getFoodDetail(t.id)}};e.default=n}).call(this,n("6e42")["default"])},"9b33":function(t,e,n){"use strict";var a=n("c452"),o=n.n(a);o.a},c452:function(t,e,n){},cda9:function(t,e,n){"use strict";(function(t){n("9217"),n("921b");a(n("66fd"));var e=a(n("d057"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},d057:function(t,e,n){"use strict";n.r(e);var a=n("ffba"),o=n("e111");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("9b33");var i=n("2877"),f=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=f.exports},e111:function(t,e,n){"use strict";n.r(e);var a=n("5aa3"),o=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=o.a},ffba:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})}},[["cda9","common/runtime","common/vendor"]]]);