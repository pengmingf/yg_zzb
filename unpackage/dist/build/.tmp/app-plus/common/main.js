(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0701":function(e,t,n){"use strict";var o=n("47c2"),u=n.n(o);u.a},"47c2":function(e,t,n){},"62e8":function(e,t,n){"use strict";(function(e){n("9217"),n("921b");var t=a(n("66fd")),o=a(n("9c2c")),u=a(n("10b1"));function a(e){return e&&e.__esModule?e:{default:e}}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){l(e,t,n[t])})}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.default.config.productionTip=!1,t.default.prototype.$store=u.default,o.default.mpType="app";var r=new t.default(c({store:u.default},o.default));e(r).$mount()}).call(this,n("6e42")["createApp"])},"9c2c":function(e,t,n){"use strict";n.r(t);var o=n("d566");for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);n("0701");var a,c,l=n("2877"),r=Object(l["a"])(o["default"],a,c,!1,null,null,null);t["default"]=r.exports},c2bb:function(e,t,n){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={onLaunch:function(){var t=plus.runtime.version;e.request({url:"https://ygjs.mfmeat.top/index.php/api/main/checkUpdateUser",method:"POST",dataType:"json",success:function(o){if(t<o.data.version){var u=o.data.wgeturl;e.showModal({title:"版本更新",content:"有新的版本发布，是否立即进行新版本下载？",confirmText:"立即更新",showCancel:!1,success:function(t){if(t.confirm){e.showToast({icon:"none",mask:!0,title:"有新的版本发布，程序已启动自动更新。新版本下载完成后将自动弹出安装程序",duration:5e3});var a=u,c=plus.downloader.createDownload(a,{},function(t,o){200==o?(console.log(n("success:"," at App.vue:39")),console.log(n(c," at App.vue:40")),plus.runtime.install(plus.io.convertLocalFileSystemURL(t.filename),{},function(){e.showToast({title:"安装成功",duration:1500})},function(t){e.showToast({title:"安装失败",icon:"none",duration:1500})})):(console.log(n("fail:"," at App.vue:54")),console.log(n(c," at App.vue:55")),e.showToast({title:"更新失败",duration:1500}))});c.start()}else o.cancel&&console.log(n("稍后更新"," at App.vue:64"))}})}}})},onShow:function(){console.log(n("App Show"," at App.vue:74"))},onHide:function(){console.log(n("App Hide"," at App.vue:77"))}};t.default=o}).call(this,n("6e42")["default"],n("0de9")["default"])},d566:function(e,t,n){"use strict";n.r(t);var o=n("c2bb"),u=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=u.a}},[["62e8","common/runtime","common/vendor"]]]);