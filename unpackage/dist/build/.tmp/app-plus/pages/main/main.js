(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/main"],{"0fdc":function(t,e,i){"use strict";(function(t){i("9217"),i("921b");n(i("66fd"));var e=n(i("9579"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("6e42")["createPage"])},"1c6e":function(t,e,i){"use strict";i.r(e);var n=i("e96f"),a=i("9a72");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("a0a2");var r=i("2877"),u=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,null,null);e["default"]=u.exports},"25b6":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,a=r(i("2ffb")),o=r(i("1c6e"));function r(t){return t&&t.__esModule?t:{default:t}}function u(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var s={},c={components:{uniChartsBody:o.default},data:function(){return{cWidth:"",cHeight:"",tips:"",pixelRatio:1,serverData:"",itemCount:30,sliderMax:50}},onLoad:function(){n=this,t.getStorageSync("tuser_id")||t.showModal({title:"未登录",content:"您未登录，需要登录后才能继续",showCancel:!1,success:function(e){t.reLaunch({url:"../login/login"})}}),this.tuser_id=t.getStorageSync("tuser_id"),this.body_id=1,this.cWidth=t.upx2px(750),this.cHeight=t.upx2px(500)},onReady:function(){this.getServerData()},onNavigationBarButtonTap:function(e){var i=this;t.showLoading({title:"跳转中，请稍后"}),t.navigateTo({url:"../msg/msg",success:function(){i.setStyle(e.index,!1,"")},complete:function(){t.hideLoading()}})},methods:{getServerData:function(){t.showLoading({title:"正在加载数据..."}),t.request({url:"https://ygjs.mfmeat.top/index.php/api/main/data",data:{tuser_id:n.tuser_id,body_id:n.body_id},method:"post",dataType:"json",success:function(t){n.fillData(t.data)},fail:function(){n.tips="网络错误，请稍后重试"},complete:function(){t.hideLoading()}})},fillData:function(t){this.serverData=t,this.tips=t.tips;var e={categories:[],series:[]};e.categories=t.LineA.categories,e.series=t.LineA.series,this.showLineA("canvasLineA",e)},showLineA:function(t,e){var i;s[t]=new a.default((i={$this:n,canvasId:t,type:"line",fontSize:11,padding:[15,15,0,15],legend:{show:!0,padding:5,lineHeight:11,margin:5},dataLabel:!1,dataPointShape:!1,background:"#FFFFFF",pixelRatio:n.pixelRatio,categories:e.categories,series:e.series,animation:!1,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:4,scrollShow:!0,scrollAlign:"left",scrollColor:"#DEE7F7"},yAxis:{gridType:"dash",splitNumber:5,min:80,max:150,format:function(t){return t+"斤"}},width:n.cWidth*n.pixelRatio,height:n.cHeight*n.pixelRatio},u(i,"dataLabel",!0),u(i,"dataPointShape",!0),u(i,"extra",{lineStyle:"straight"}),i))},touchLineA:function(t){s["canvasLineA"].scrollStart(t)},moveLineA:function(t){s["canvasLineA"].scroll(t)},touchEndLineA:function(t){s["canvasLineA"].scrollEnd(t),s["canvasLineA"].showToolTip(t,{format:function(t,e){return e+" "+t.name+":"+t.data}})},setStyle:function(t,e,i){var n=getCurrentPages(),a=n[n.length-1],o=a.$getAppWebview();e?(o.showTitleNViewButtonRedDot({index:t,text:i}),o.setTitleNViewButtonBadge({index:t,text:i})):(o.hideTitleNViewButtonRedDot({index:t}),o.removeTitleNViewButtonBadge({index:t}))}}};e.default=c}).call(this,i("6e42")["default"])},"31b6":function(t,e,i){},"48b0":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"4e49":function(t,e,i){"use strict";var n=i("31b6"),a=i.n(n);a.a},9579:function(t,e,i){"use strict";i.r(e);var n=i("48b0"),a=i("eec3");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("4e49");var r=i("2877"),u=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,null,null);e["default"]=u.exports},"9a72":function(t,e,i){"use strict";i.r(e);var n=i("de82"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},a0a2:function(t,e,i){"use strict";var n=i("d8a0"),a=i.n(n);a.a},d8a0:function(t,e,i){},de82:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,a=o(i("2ffb"));function o(t){return t&&t.__esModule?t:{default:t}}var r=null,u={data:function(){return{cWidth:"",cHeight:"",pixelRatio:1,serverData:"",tuser_id:t.getStorageSync("tuser_id")}},mounted:function(){n=this,this.cWidth=t.upx2px(750),this.cHeight=t.upx2px(500),this.getServerData()},methods:{getServerData:function(){t.request({url:"https://ygjs.mfmeat.top/index.php/api/main/getBodyDate",data:{tuser_id:this.tuser_id},method:"POST",dataType:"json",success:function(t){n.serverData=t.data.data;var e={categories:[],series:[]};e.categories=t.data.data.Column.categories,e.series=t.data.data.Column.series,n.showColumn("canvasColumn",e)},fail:function(){n.tips="网络错误，小程序端请检查合法域名"}})},showColumn:function(t,e){r=new a.default({$this:n,canvasId:t,type:"column",legend:{show:!0},fontSize:11,background:"#FFFFFF",pixelRatio:n.pixelRatio,animation:!0,categories:e.categories,series:e.series,xAxis:{disableGrid:!0},yAxis:{},dataLabel:!0,width:n.cWidth*n.pixelRatio,height:n.cHeight*n.pixelRatio,extra:{column:{type:"group",width:n.cWidth*n.pixelRatio*.45/e.categories.length}}})},touchColumn:function(t){r.showToolTip(t,{format:function(t,e){return"object"===typeof t.data?e+" "+t.name+":"+t.data.value:e+" "+t.name+":"+t.data}})}}};e.default=u}).call(this,i("6e42")["default"])},e96f:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},eec3:function(t,e,i){"use strict";i.r(e);var n=i("25b6"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a}},[["0fdc","common/runtime","common/vendor"]]]);