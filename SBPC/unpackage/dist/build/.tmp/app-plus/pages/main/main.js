(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/main"],{"0abe":function(t,e,s){},1029:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"baseView"},[s("view",{staticClass:"topView_pc",attrs:{eventid:"00cb397a-0"},on:{tap:function(e){t.getPoints()}}},[s("view",{staticClass:"topItemView"},[s("text",{staticClass:"topTextTitle"},[t._v("隐患总数")]),s("text",{staticClass:"topTextNum"},[t._v(t._s(t.pointModel.yhzsl))])]),s("view",{staticClass:"topItemView"},[s("text",{staticClass:"topTextTitle"},[t._v("整改中")]),s("text",{staticClass:"topTextNum"},[t._v(t._s(t.pointModel.zgzyhsl))])]),s("view",{staticClass:"topItemView"},[s("text",{staticClass:"topTextTitle"},[t._v("超期未整改")]),s("text",{staticClass:"topTextNum"},[t._v(t._s(t.pointModel.cqwgz))])])]),s("view",{staticClass:"menuBlockView"},[s("view",{staticClass:"dangerView",attrs:{eventid:"00cb397a-1"},on:{tap:function(e){t.jumpPage("../check/checkList")}}},[s("image",{staticClass:"dangerIcon",attrs:{src:"../../static/assets/jc.png",mode:"widthFix"}}),t._m(0)]),s("view",{staticClass:"dangerView",attrs:{eventid:"00cb397a-2"},on:{tap:function(e){t.jumpPage("../danger/dangerList")}}},[s("image",{staticClass:"dangerIcon",attrs:{src:"../../static/assets/yh.png",mode:"widthFix"}}),t._m(1)]),s("view",{staticClass:"dangerView",attrs:{eventid:"00cb397a-3"},on:{tap:function(e){t.jumpPage("../charts/chartsTypeList")}}},[s("image",{staticClass:"dangerIcon",attrs:{src:"../../static/assets/tj.png",mode:"widthFix"}}),t._m(2)]),s("view",{staticClass:"dangerView",attrs:{eventid:"00cb397a-4"},on:{tap:function(e){t.jumpPage("../peixun/peixunList")}}},[s("image",{staticClass:"dangerIcon",attrs:{src:"../../static/assets/pxkc.png",mode:"widthFix"}}),t._m(3)]),s("view",{staticClass:"dangerView",attrs:{eventid:"00cb397a-5"},on:{tap:function(e){t.jumpPage("../other/gonggaoList")}}},[s("image",{staticClass:"dangerIcon",attrs:{src:"../../static/assets/gg.png",mode:"widthFix"}}),t._m(4)]),s("view",{staticClass:"dangerView",attrs:{eventid:"00cb397a-6"},on:{tap:function(e){t.jumpPage("../other/newsList")}}},[s("image",{staticClass:"dangerIcon",attrs:{src:"../../static/assets/xw.png",mode:"widthFix"}}),t._m(5)]),s("view",{staticClass:"dangerView",attrs:{eventid:"00cb397a-7"},on:{tap:function(e){t.jumpPage("../other/pointRank")}}},[s("image",{staticClass:"dangerIcon",attrs:{src:"../../static/assets/cn.png",mode:"widthFix"}}),t._m(6)]),s("view",{staticClass:"dangerView"}),s("view",{staticClass:"dangerView"})])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"subView"},[s("text",{staticClass:"dangerText"},[t._v("检查")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"subView"},[s("text",{staticClass:"dangerText"},[t._v("隐患")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"subView"},[s("text",{staticClass:"dangerText"},[t._v("统计")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"subView"},[s("text",{staticClass:"dangerText"},[t._v("培训")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"subView"},[s("text",{staticClass:"dangerText"},[t._v("通知公告")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"subView"},[s("text",{staticClass:"dangerText"},[t._v("公司新闻")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"subView"},[s("text",{staticClass:"dangerText"},[t._v("积分排名")])])}];s.d(e,"a",function(){return a}),s.d(e,"b",function(){return n})},"18a5":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(s("9fbc")),n=o(s("fa28")),i=o(s("736d")),c=s("2f62");function o(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{},a=Object.keys(s);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(s).filter(function(t){return Object.getOwnPropertyDescriptor(s,t).enumerable}))),a.forEach(function(e){u(t,e,s[e])})}return t}function u(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var l={computed:r({},(0,c.mapState)(["hasLogin","forcedLogin","userType","userInfo"])),components:{},data:function(){return{pointModel:{xyjf:0,zdjf:0,gdjf:0,jfpm:"0/0",zf:0}}},onLoad:function(){},onShow:function(){var e=this;this.login(n.default.getUsers()),this.hasLogin?this.getPoints():t.showModal({title:"未登录",content:"您未登录，需要登录后才能继续",showCancel:!this.forcedLogin,success:function(s){s.confirm&&(e.forcedLogin?t.reLaunch({url:"../login/login"}):t.navigateTo({url:"../login/login"}))}})},methods:r({},(0,c.mapMutations)(["login","setPoints"]),{jumpPage:function(e){""!=e?t.navigateTo({url:e}):t.showToast({icon:"none",title:"敬请期待～"})},getPoints:function(){var e=this,s={userid:e.userInfo.userid};i.default.requestLoading(a.default.getPoints,s,"",function(t){e.pointModel=t,e.pointModel.zf=parseInt(t.zdjf)+parseInt(t.gdjf),e.setPoints(e.pointModel)},function(){t.showToast({icon:"none",title:"网络异常，请重试"})},function(){})}})};e.default=l}).call(this,s("6e42")["default"])},"3eb5":function(t,e,s){"use strict";s("c6c1");var a=i(s("b0ce")),n=i(s("9930"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(n.default))},8499:function(t,e,s){"use strict";var a=s("0abe"),n=s.n(a);n.a},9930:function(t,e,s){"use strict";s.r(e);var a=s("1029"),n=s("b495");for(var i in n)"default"!==i&&function(t){s.d(e,t,function(){return n[t]})}(i);s("8499");var c=s("2877"),o=Object(c["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=o.exports},b495:function(t,e,s){"use strict";s.r(e);var a=s("18a5"),n=s.n(a);for(var i in a)"default"!==i&&function(t){s.d(e,t,function(){return a[t]})}(i);e["default"]=n.a}},[["3eb5","common/runtime","common/vendor"]]]);