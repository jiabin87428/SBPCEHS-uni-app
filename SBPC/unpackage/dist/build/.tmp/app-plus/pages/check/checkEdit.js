(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/check/checkEdit"],{"5d63":function(t,e,i){"use strict";i.r(e);var o=i("9f1b"),l=i.n(o);for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);e["default"]=l.a},"9f1b":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(i("8959")),l=u(i("09d6")),s=u(i("d36e")),n=u(i("d869")),c=u(i("9fbc")),d=(u(i("40bc")),u(i("736d"))),a=(u(i("fa28")),u(i("bc96"))),r=i("2f62");function u(t){return t&&t.__esModule?t:{default:t}}var f={computed:(0,r.mapState)(["userInfo"]),components:{uniList:o.default,uniListItem:s.default,uniIcon:l.default,prompt:n.default},data:function(){return{model:{recordid:"",userid:"",jcdzt:"1",jclx:"",llrid:"",llrmc:"",jcrq:"",qtcyid:"",qtcy:"",mb:"",jcjlList:[]},currentModule:null,checkTypes:[],selectedPersons:[],selectedModule:[],editable:!0,promptVisible:!1,normal:{color:"#24BE41",size:"22",type:"checkbox-filled"},undetected:{color:"#FFDE52",size:"22",type:"info-filled"},abnormal:{color:"#C11E1E",size:"22",type:"clear"},zplists:[]}},onLoad:function(t){var e=null==t.recordid?"":t.recordid;""==e?(this.model.llrid=this.userInfo.userid,this.model.llrmc=this.userInfo.username):(this.model.recordid=e,this.getDetail()),this.getCheckTypes(),this.getCheckModule()},onNavigationBarButtonTap:function(){var e=this;t.showModal({content:"选择[一键正常]将要清除所有问题描述、检查方式、检查照片，是否确认？",success:function(t){t.confirm&&e.setAllOk()}})},onUnload:function(){},methods:{setAllOk:function(t){for(var e=0;e<this.model.jcjlList.length;e++)this.model.jcjlList[e].wtms="",this.model.jcjlList[e].zgqk="",this.model.jcjlList[e].zplist=[],this.model.jcjlList[e].ifwt="1"},getCheckTypes:function(e){var i=this,o={userid:i.userInfo.userid};d.default.requestLoading(c.default.getCheckTypes,o,"正在获取检查类型",function(t){i.checkTypes=t.data},function(){t.showToast({icon:"none",title:"获取失败"})},function(){})},getCheckModule:function(e){var i=this,o={userid:i.userInfo.userid};d.default.requestLoading(c.default.getCheckModule,o,"正在获取检查模板",function(t){i.selectedModule=t.data},function(){t.showToast({icon:"none",title:"获取失败"})},function(){})},getDetail:function(e){var i=this,o={userid:i.userInfo.userid,recordid:i.model.recordid};d.default.requestLoading(c.default.getCheckDetail,o,"正在获取检查详情",function(t){i.model=t,"5"==i.model.jcdzt&&(editable=!1);for(var e=[],o=0;o<t.jcjlList.length;o++)e=e.concat(t.jcjlList[o].zplist);i.classifyPhotos(e)},function(){t.showToast({icon:"none",title:"获取失败"})},function(){})},saveClick:function(t){this.doSave(1)},completeClick:function(t){this.doSave(5)},doSave:function(e){var i=this;i.zplists=[],i.model.userid=i.userInfo.userid,i.model.jcdzt=e;for(var o=i.model,l=0;l<i.model.jcjlList.length;l++){var s=i.model.jcjlList[l];i.zplists.push(s.zplist)}d.default.requestLoading(c.default.saveCheck,o,"正在保存检查",function(e){i.model=e;for(var o=0;o<i.model.jcjlList.length;o++){var l=i.model.jcjlList[o];l.zplist=i.zplists[o]}i.uploadPhoto(!1,function(){t.showToast({icon:"none",title:"保存成功"})})},function(){t.showToast({icon:"none",title:"保存失败"})},function(){})},uploadPhoto:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];for(var e=arguments.length>1?arguments[1]:void 0,i=this,o=0;o<i.model.jcjlList.length;o++){var l=i.model.jcjlList[o];console.log("item:"+JSON.stringify(l));var s=l.jcjlrecordid,n=l.zplist;a.default.uploadPhoto(i.userInfo.userid,s,"",n,function(o){o.length>0&&(t.showToast({icon:"none",title:"照片上传成功"}),i.classifyPhotos(o)),e()})}},classifyPhotos:function(t){if(null!=t){for(var e=0;e<this.model.jcjlList.length;e++)this.model.jcjlList[e].zplist=[];for(e=0;e<t.length;e++)for(var i=t[e],o={fileid:i.attid,src:c.default.host+c.default.loadImage+"&attid="+i.attid,type:2,yhid:i.zpsgrecordid,attachtype:i.attachtype},l=0;l<this.model.jcjlList.length;l++){var s=this.model.jcjlList[l];s.jcjlrecordid==i.zpsgrecordid&&this.model.jcjlList[l].zplist.push(o)}}},typePickerChange:function(t,e){this.model[e.target.id]=t[e.target.value].dvalue,this.model["jclxbm"]=t[e.target.value].dvalue},dateChange:function(t,e){this.model[t]=e.target.value},jumpPersonChoose:function(e){var i=this,o="CHECK_PERSONS";t.navigateTo({url:"../common/personChoose?key="+o+"&mltiple=true&selected="+JSON.stringify(this.selectedPersons)}),i.$fire.once(o,function(t){i.selectedPersons=t,i.formatPersons()})},mbChange:function(t,e){this.currentModule=t[e.target.value],this.model[e.target.id]=t[e.target.value].mbmc,this.getCheckInfoByMb()},getCheckInfoByMb:function(){var e=this,i={userid:e.userInfo.userid,mbid:e.currentModule.mbid};d.default.requestLoading(c.default.getCheckInfo,i,"正在获取检查项",function(t){e.model.jcjlList=t.data},function(){t.showToast({icon:"none",title:"获取失败"})},function(){})},jumpEdit:function(e,i){var o=this;0!=o.editable&&t.setStorage({key:"LOCAL_ITEM",data:e,success:function(){var e="INFO_EDIT";t.navigateTo({url:"checkInfoEdit?index="+i+"&key="+e}),o.$fire.once(e,function(t){o.model.jcjlList.splice(t.index,1,t.item)})}})},addCheck:function(t){this.promptVisible=!0},clickPromptConfirm:function(e){if(""!=e){var i={bzlx:"",idx:"",ifwt:"",jcbz:e,jcbzid:"",jcjlrecordid:"",precordid:"",wtms:"",xmhfl:"",xmhflid:"",zgqk:"",zgtzdid:"",zgtzdmoduleid:"",zgzt:"",zplist:[]};this.model.jcjlList.push(i),this.promptVisible=!1}else t.showToast({icon:"none",title:"请输入检查标题内容"})},clickCancel:function(t){this.promptVisible=!1},formatPersons:function(){for(var t="",e="",i=0;i<this.selectedPersons.length;i++){var o=this.selectedPersons[i];t=o.id+";"+t,e=o.name+";"+e}this.model.qtcy=e,this.model.qtcyid=t},getIcon:function(t){return"1"==t.ifwt?this.normal:"3"==t.ifwt?this.abnormal:this.undetected}}};e.default=f}).call(this,i("6e42")["default"])},ad76:function(t,e,i){"use strict";i("c6c1");var o=s(i("b0ce")),l=s(i("cd38"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,o.default)(l.default))},b6e5:function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"baseView"},[i("scroll-view",{staticClass:"scrollView",attrs:{"scroll-y":"true"}},[i("view",{staticClass:"cellTitleView"},[i("text",{staticClass:"cellTitle"},[t._v("基础信息")])]),i("view",{staticClass:"cellInfoView"},[i("uni-list",{attrs:{mpcomid:"609973d6-5"}},[i("picker",{attrs:{id:"jclx",range:t.checkTypes,"range-key":"dvalue",disabled:!t.editable,eventid:"609973d6-0"},on:{change:function(e){t.typePickerChange(t.checkTypes,e)}}},[i("uni-list-item",{attrs:{title:"检查类型",subnote:t.model.jclx,"show-arrow":t.editable,mpcomid:"609973d6-0"}})],1),i("uni-list-item",{attrs:{title:"检查人",subnote:t.model.llrmc,"show-arrow":"false",mpcomid:"609973d6-1"}}),i("picker",{attrs:{mode:"date",value:t.model.jcrq,disabled:!t.editable,eventid:"609973d6-1"},on:{change:function(e){t.dateChange("jcrq",e)}}},[i("uni-list-item",{attrs:{title:"检查日期",subnote:t.model.jcrq,"show-arrow":t.editable,mpcomid:"609973d6-2"}})],1),i("uni-list-item",{attrs:{title:"检查组成员",subnote:t.model.qtcy,"show-arrow":t.editable,eventid:"609973d6-2",mpcomid:"609973d6-3"},on:{click:t.jumpPersonChoose}}),i("picker",{attrs:{id:"mb",range:t.selectedModule,"range-key":"mbmc",disabled:!t.editable,eventid:"609973d6-3"},on:{change:function(e){t.mbChange(t.selectedModule,e)}}},[i("uni-list-item",{attrs:{title:"检查模板",subnote:t.model.mb,"show-arrow":t.editable,mpcomid:"609973d6-4"}})],1)],1)],1),t.model.jcjlList.length>0?i("block",[i("view",{staticClass:"cellTitleView"},[i("text",{staticClass:"cellTitle"},[t._v("检查内容")]),i("text",{staticClass:"cellTitle"},[t._v("正常-")]),i("uni-icon",{attrs:{type:"checkbox-filled",size:"22",color:"#24BE41",mpcomid:"609973d6-6"}}),i("text",{staticClass:"cellTitle"},[t._v("未检-")]),i("uni-icon",{attrs:{type:"info-filled",size:"22",color:"#FFDE52",mpcomid:"609973d6-7"}}),i("text",{staticClass:"cellTitle"},[t._v("异常-")]),i("uni-icon",{attrs:{type:"clear",size:"22",color:"#C11E1E",mpcomid:"609973d6-8"}})],1),i("view",{staticClass:"cellInfoView"},[i("uni-list",{attrs:{mpcomid:"609973d6-10"}},t._l(t.model.jcjlList,function(e,o){return i("uni-list-item",{key:o,attrs:{title:e.jcbz,note:e.wtms,"show-extra-icon":"true","show-arrow":t.editable,"extra-icon":t.getIcon(e),eventid:"609973d6-4-"+o,mpcomid:"609973d6-9-"+o},on:{click:function(i){t.jumpEdit(e,o)}}})}))],1),i("image",{staticClass:"addCheck",attrs:{mode:"aspectFit",src:"../../static/assets/addCheck.png",eventid:"609973d6-5"},on:{click:t.addCheck}})]):t._e()],1),i("view",{staticClass:"bottomView"},[i("view",{staticClass:"buttonStyle",attrs:{eventid:"609973d6-6"},on:{click:t.saveClick}},[t._v("保存")]),i("view",{staticClass:"buttonStyle",attrs:{eventid:"609973d6-7"},on:{click:t.completeClick}},[t._v("完成检查")])]),t.promptVisible?i("prompt",{attrs:{title:"添加检查内容",placeholder:"请输入检查标题",defaultValue:"",mainColor:"#3296FA",eventid:"609973d6-8",mpcomid:"609973d6-11"},on:{cancel:t.clickCancel,confirm:t.clickPromptConfirm}}):t._e()],1)},l=[];i.d(e,"a",function(){return o}),i.d(e,"b",function(){return l})},c5fc:function(t,e,i){},cd38:function(t,e,i){"use strict";i.r(e);var o=i("b6e5"),l=i("5d63");for(var s in l)"default"!==s&&function(t){i.d(e,t,function(){return l[t]})}(s);i("d490");var n=i("2877"),c=Object(n["a"])(l["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports},d490:function(t,e,i){"use strict";var o=i("c5fc"),l=i.n(o);l.a}},[["ad76","common/runtime","common/vendor"]]]);