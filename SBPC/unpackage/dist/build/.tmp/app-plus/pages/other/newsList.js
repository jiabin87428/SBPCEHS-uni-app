(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/other/newsList"],{"29d0":function(t,e,n){"use strict";n.r(e);var i=n("cdc6"),u=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=u.a},"2aa0":function(t,e,n){},"49b5":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"baseView"},[n("view",{staticClass:"cellInfoView"},[n("uni-list",{attrs:{mpcomid:"c4edb036-1"}},t._l(t.ggList,function(e,i){return n("block",{key:i},[n("uni-list-item",{attrs:{title:e.title,note:e.source,"show-arrow":!0,eventid:"c4edb036-0-"+i,mpcomid:"c4edb036-0-"+i},on:{click:function(n){t.getDetail(e)}}})],1)}))],1)])},u=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return u})},8029:function(t,e,n){"use strict";n("c6c1");var i=a(n("b0ce")),u=a(n("993d"));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(u.default))},"993d":function(t,e,n){"use strict";n.r(e);var i=n("49b5"),u=n("29d0");for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);n("f159");var o=n("2877"),c=Object(o["a"])(u["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},cdc6:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(n("8959")),u=s(n("09d6")),a=s(n("d36e")),o=s(n("9fbc")),c=(s(n("40bc")),s(n("736d"))),r=(s(n("fa28")),n("2f62"));function s(t){return t&&t.__esModule?t:{default:t}}var f={computed:(0,r.mapState)(["userInfo"]),components:{uniList:i.default,uniListItem:a.default,uniIcon:u.default},data:function(){return{ggList:[]}},onLoad:function(){this.getGgList()},onNavigationBarButtonTap:function(){},methods:{getGgList:function(e){var n=this,i={userid:n.userInfo.userid};c.default.requestLoading(o.default.getNewsList,i,"正在获取新闻",function(t){n.formatData(t.data)},function(){t.showToast({icon:"none",title:"获取失败"})},function(){})},getDetail:function(e){t.navigateTo({url:"../common/webView?src="+o.default.host+e.src})},formatData:function(t){this.ggList=[];for(var e=0;e<t.length;e++){var n={},i=t[e];n["title"]=i.notesubject,n["source"]=i.createtime,n["datetime"]="",n["instanceid"]=i.instanceid,n["recordid"]=i.recordid,n["article_type"]=0,n["comment_count"]="",n["src"]=i.src,this.ggList.push(n)}}}};e.default=f}).call(this,n("6e42")["default"])},f159:function(t,e,n){"use strict";var i=n("2aa0"),u=n.n(i);u.a}},[["8029","common/runtime","common/vendor"]]]);