<template>
	<view class="baseView" id="baseView">
		<view class="cellTitleView">
			<text class="cellTitle" v-if="model.docstatus == null || model.docstatus == ''">隐患信息</text>
			<text class="cellTitle" v-if="model.docstatus != null && model.docstatus != ''">隐患信息（当前状态：{{model.docstatus}}）</text>
		</view>
		<view class="cellInfoView">
			<uni-list>
				<uni-list-item title="隐患描述" :note="model.yhms" :show-arrow="pageState == 1 ? true : false" @click="jumpInput('yhms', '请输入隐患描述', model.yhms, 1)"></uni-list-item>
				<uni-list-item title="隐患等级" :subnote="model.yhdj" :show-arrow="pageState == 1 ? true : false" @click="alertSheetShow('yhdj', dangerLevel, 1)"></uni-list-item>
				<uni-list-item title="隐患后果" :subnote="model.yhhg" :show-arrow="pageState == 1 ? true : false" @click="alertSheetShow('yhhg', dangerResult, 1)"></uni-list-item>
				<picker id="yhlx" @change="pickerChange(dangerType, $event, 1)" v-bind:range="dangerType" :disabled="pageState == 1 ? false : true">
					<uni-list-item title="隐患类型" :subnote="model.yhlx" :show-arrow="pageState == 1 ? true : false"></uni-list-item>
				</picker>
				<picker mode="date" :value="model.zgqx" @change="dateChange('zgqx', $event, 1)" :disabled="pageState == 1 ? false : true">
					<uni-list-item title="整改期限" :subnote="model.zgqx" :show-arrow="pageState == 1 ? true : false"></uni-list-item>
				</picker>
				<picker id="yhly" @change="pickerChange(dangerSource, $event, 1)" v-bind:range="dangerSource" :disabled="pageState == 1 ? false : true">
					<uni-list-item title="隐患来源" :subnote="model.yhly" :show-arrow="pageState == 1 ? true : false"></uni-list-item>
				</picker>
				<uni-list-item title="责任部门" :subnote="model.zrbm ? model.zrbm.name : ''" :show-arrow="pageState == 1 ? true : false" @click="jumpOrgChoose('zrbm', 1)"></uni-list-item>
				<uni-list-item title="发起人" :subnote="model.fqrmc" show-arrow="false"></uni-list-item>
			</uni-list>
			<view class='cellImageBaseView'> 
				<view class='cellImageTitleView'> 
				  <text class='leftTextRow'>隐患照片</text>
				  <text class='rightTextRow'>{{createImgList.length}}</text>
				</view>
				<view id='imageView' class='imageView'>
				  <block v-for="(imgObj,idx) in createImgList" :key="idx">
					<view class="littleImageView" v-bind:style="{width:littleImageWidth + 'px', height:littleImageWidth + 'px'}">
					  <image class="littleImage" @click="viewPhoto('createImgList')" :id="idx" :src="imgObj.src" mode="aspectFit"></image>
					  <image class='littleImageDelete' src='../../static/assets/delete.png' v-if="pageState == 1" @click="deleteImage('createImgList', imgObj, idx)" :id='idx' mode="aspectFit"></image>
					</view>
				  </block>
				  <view class="littleImageView" v-if="pageState == 1" @click="addPhoto('createImgList')" v-bind:style="{width:littleImageWidth + 'px', height: littleImageWidth + 'px'}">
					<image class="littleImage" src="../../static/assets/addImage.png"></image>
				  </view>
				</view>
			</view>
		</view>
		<!--整改情况 pageState >= 1-->
		<block>
			<view class="cellTitleView">
				<text class="cellTitle">整改情况</text>
			</view>
			<view class="cellInfoView">
				<uni-list>
					<uni-list-item title="隐患因素" :subnote="model.rwhg" :show-arrow="pageState == 2 ? true : false" @click="alertSheetShow('rwhg', dangerReason, 2)"></uni-list-item>
					<uni-list-item title="原因分析" :note="model.yyfx" :show-arrow="pageState == 2 ? true : false" @click="jumpInput('yyfx', '请输入原因分析', model.yyfx, 2)"></uni-list-item>
					<uni-list-item title="整改情况" :note="model.yhzgqk" :show-arrow="pageState == 2 ? true : false" @click="jumpInput('yhzgqk', '请输入原因分析', model.yhzgqk, 2)"></uni-list-item>
					<picker mode="date" :value="model.zgwcrq" @change="dateChange('zgwcrq', $event, 2)" :disabled="pageState == 2 ? false : true">
						<uni-list-item title="完成日期" :subnote="model.zgwcrq" :show-arrow="pageState == 2 ? true : false"></uni-list-item>
					</picker>
					<uni-list-item title="整改人" :subnote="model.zgrmc" show-arrow="false"></uni-list-item>
				</uni-list>
				<view class='cellImageBaseView'> 
					<view class='cellImageTitleView'> 
					  <text class='leftTextRow'>整改照片</text>
					  <text class='rightTextRow'>{{changeImgList.length}}</text>
					</view>
					<view id='imageView' class='imageView'>
					  <block v-for="(imgObj,idx) in changeImgList" :key="idx">
						<view class="littleImageView" v-bind:style="{width:littleImageWidth + 'px', height:littleImageWidth + 'px'}">
						  <image class="littleImage" @click="viewPhoto('changeImgList')" :id="idx" :src="imgObj.src" mode="aspectFit"></image>
						  <image class='littleImageDelete' src='../../static/assets/delete.png' v-if="pageState == 2" @click="deleteImage('changeImgList', imgObj, idx)" :id='idx' mode="aspectFit"></image>
						</view>
					  </block>
					  <view class="littleImageView" v-if="pageState == 2" @click="addPhoto('changeImgList')" v-bind:style="{width:littleImageWidth + 'px', height: littleImageWidth + 'px'}">
						<image class="littleImage" src="../../static/assets/addImage.png"></image>
					  </view>
					</view>
				</view>
			</view>
		</block>
		<!--整改情况 pageState >= 3-->
		<block>
			<view class="cellTitleView">
				<text class="cellTitle">整改确认</text>
			</view>
			<view class="cellInfoView">
				<uni-list>
					<uni-list-item title="完成情况" :note="model.yzqk" :show-arrow="pageState == 3 ? true : false" @click="jumpInput('yzqk', '请输入完成情况', model.yzqk, 3)"></uni-list-item>
					<uni-list-item title="确认人" :subnote="model.yzrmc" show-arrow="false"></uni-list-item>
					<picker mode="date" :value="model.yzrtxrq" @change="dateChange('yzrtxrq', $event, 3)" :disabled="pageState == 3 ? false : true">
						<uni-list-item title="填报日期" :subnote="model.yzrtxrq" :show-arrow="pageState == 3 ? true : false"></uni-list-item>
					</picker>
				</uni-list>
				<view class='cellImageBaseView'> 
					<view class='cellImageTitleView'> 
					  <text class='leftTextRow'>验证照片</text>
					  <text class='rightTextRow'>{{confirmImgList.length}}</text>
					</view>
					<view id='imageView' class='imageView'>
					  <block v-for="(imgObj,idx) in confirmImgList" :key="idx">
						<view class="littleImageView" v-bind:style="{width:littleImageWidth + 'px', height:littleImageWidth + 'px'}">
						  <image class="littleImage" @click="viewPhoto('confirmImgList')" :id="idx" :src="imgObj.src" mode="aspectFit"></image>
						  <image class='littleImageDelete' src='../../static/assets/delete.png' v-if="pageState == 3" @click="deleteImage('confirmImgList', imgObj, idx)" :id='idx' mode="aspectFit"></image>
						</view>
					  </block>
					  <view class="littleImageView" v-if="pageState == 3" @click="addPhoto('confirmImgList')" v-bind:style="{width:littleImageWidth + 'px', height: littleImageWidth + 'px'}">
						<image class="littleImage" src="../../static/assets/addImage.png"></image>
					  </view>
					</view>
				</view>
			</view>
		</block>
		<view class="cellInfoView">
			<uni-list>
				<uni-list-item title="审批意见" :subnote="model.signature" :show-arrow="true" @click="opinionSheetShow('signature', changeOpinion)" v-if="model.signclass != '' && model.signclass != null"></uni-list-item>
			</uni-list>
		</view>
		
		<view class="btnView" v-if="pageState != 0">
		    <button class="saveBtn" @tap="saveClick">保存</button>
			<block v-for="(btnObj,index) in model.flowbtnchooseflow" :key="index">
				<button class="saveBtn" @tap="roamClick(btnObj)">{{btnObj.operationname}}</button>
			</block>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/list/uni-list/uni-list.vue'
	import uniIcon from '@/components/list/uni-icon/uni-icon.vue'
	import uniListItem from '@/components/list/uni-list-item/uni-list-item.vue'
	import config from '../../util/config.js';
	import dataConfig from '../../util/dataConfig.js';
	import request from '../../util/request.js';
	import service from '../../service.js';
	import photo from '../../util/photoUtil.js';
	
	import {
	    mapState
	} from 'vuex'
	export default {
		computed: mapState(['userInfo']),
		components: {uniList,uniListItem,uniIcon},
		data() {
		    return {
				// 模型对象
				model: {
					instanceid: '',
					recordid: '',
					// 隐患描述
					yhms: '',
					// 隐患等级
					yhdj: '',
					// 隐患后果
					yhhg: '',
					// 隐患类型
					yhlx: '',
					// 整改期限
					zgqx: '',
					// 隐患来源
					yhly: '',
					// 责任部门
					zrbm: null,
				},
				
				// 照片相关
				littleImageWidth: 0,
				createImgList: [],	// 新建隐患照片列表
				changeImgList: [],	// 整改隐患照片列表
				confirmImgList: [],	// 确认整改照片列表
				
				// 状态：1、隐患信息可编辑，2、整改情况可编辑，3、整改确认可编辑，0，已整改，三个都不能编辑
				// 包含start：只能填写隐患信息，包含zzzg：只能填写整改情况，包含zzyz：只能填写整改确认
				pageState: 1,
				
				// 数据源
				dangerLevel: dataConfig.dangerLevel,
				dangerResult: dataConfig.dangerResult,
				dangerType: dataConfig.dangerType,
				dangerSource: dataConfig.dangerSource,
				changeOpinion: dataConfig.changeOpinion,
				
				dangerReason: dataConfig.dangerReason,
				
				// 页面UI相关
				viewTop: null,
			}
		},
		onLoad(option) {
			this.littleImageWidth = (uni.getSystemInfoSync().windowWidth -50) / 4;
			this.model.instanceid = option.instanceid == null ? "" : option.instanceid;
			this.model.recordid = option.recordid == null ? "" : option.recordid;
			if(this.model.instanceid != "" || this.model.recordid != "") {// 非新建
				this.getDangerDetail();
			}else {// 新建，发起人名称为当前userid
				this.model.fqrid = this.userInfo.userid;
				this.model.fqrmc = this.userInfo.username;
			}
		},
		onNavigationBarButtonTap() {
			if (this.model.logList != null) {
				uni.navigateTo({
					url: "dangerLog?logList=" + JSON.stringify(this.model.logList)
				})
			}else {
				uni.showToast({
					icon: 'none',
					title: '暂无日志'
				});
			}
		},
		onUnload() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 2];
			var currentWebview = page.$getAppWebview();
			plus.webview.postMessageToUniNView({
				refreshCode: "REFRESH"
			}, currentWebview.id);
		},
		methods:{
			/*新建隐患相关*/
			// 保存隐患
			saveClick: function(e) {
				var that = this;
				that.model.userid = that.userInfo.userid;
// 				that.model.fqrid = that.userInfo.userid;
// 				that.model.fqrmc = that.userInfo.username;
				that.model.zrbmid = that.model.zrbm == null ? "" : that.model.zrbm.id;
				that.model.zrbmmc = that.model.zrbm == null ? "" : that.model.zrbm.name;
				
				request.requestLoading(config.addDanger, that.model, '保存隐患', 
					function(res){
						that.model = res;
						uni.showToast({
							icon: 'none',
							title: '保存成功'
						});
						that.uploadPhoto(false, function(){
							
						});
// 						let attachtype = that.getAttachtypeAndPhotoList().type;
// 						let photoList = that.getAttachtypeAndPhotoList().photoList;
// 						photo.uploadPhoto(that.userInfo.userid, res.recordid, attachtype, photoList, function(res){
// 							uni.showToast({
// 								icon: 'none',
// 								title: '保存成功'
// 							});
// 						});
					},function(){
						uni.showToast({
							icon: 'none',
							title: '保存失败'
						});
					}, function(){
						
					}
				);
			},
			// 流转隐患
			roamClick: function(btnObj) {
				var that = this;
				
				that.model.userid = that.userInfo.userid;
				that.model.operationname = btnObj.operationname;
				that.model.nextstatusname = btnObj.nextstatusname;
				that.model.prestatusname = btnObj.prestatusname;
				that.model.flowtype = btnObj.flowtype;

				request.requestLoading(config.flowDanger, that.model, '正在流转', 
					function(res){
						if (res.data == null && res.repCode == "200") {
							that.uploadPhoto(true, function(){
								uni.showToast({
									icon: 'none',
									title: res.repMsg
								});
								
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1000);
							});
							
							return;
						}
						let condition = res.data;
						let key = "DANGER_TRANSFER"
						uni.navigateTo({
							url: "../common/personChoose?key=" + key + "&condition=" + condition + "&mltiple=false"
						})
						that.$fire.once(key, person=>{
							that.flowDanger(person, btnObj);
						});
					},function(){
						uni.showToast({
							icon: 'none',
							title: '流转失败'
						});
					}, function(){
						
					}
				);
			},
			// 选完人后流转
			flowDanger: function(person, btnObj) {
				var that = this;
				that.model.receiverid = person.id;
				request.requestLoading(config.flowDangerAfterChooseTarget, that.model, '正在流转', 
					function(res){
						that.uploadPhoto(true, function(){
							uni.showToast({
								icon: 'none',
								title: res.repMsg,
							});
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						});
					},function(){
						uni.showToast({
							icon: 'none',
							title: '流转失败'
						});
					}, function(){
						
					}
				);
			},
			/*隐患详情相关*/
			getDangerDetail: function() {
				var that = this;
				request.requestLoading(config.getDangerDetail, that.model, '正在加载', 
					function(res){
						// console.log('' + JSON.stringify(res));
						that.model = res;
						let zrbm = {
							name: res.zrbmmc,
							id: res.zrbmid
						}
						that.model.zrbm = zrbm;
						that.classifyPhotos(that.model.zplist);
						if (that.model.controlcode == null) {
							that.pageState = 0;
							return;
						}
						if (that.model.controlcode.indexOf("start") != -1) {// 包含start
							that.pageState = 1;
						}else if (that.model.controlcode.indexOf("zzzg") != -1) {// 包含zzzg
							that.pageState = 2;
							that.model.zgrmc = that.userInfo.username;
							that.model.zgrid = that.userInfo.userid;
						}else if (that.model.controlcode.indexOf("yzfj") != -1) {// 包含zzyz
							that.pageState = 3;
							that.model.yzrmc = that.userInfo.username;
							that.model.yzrid = that.userInfo.userid;
						}
						
					},function(){
						uni.showToast({
							icon: 'none',
							title: '加载失败'
						});
					}, function(){
						
					}
				);
			}, 
			
			// 加载完隐患详情后把照片加到对应的List中
			classifyPhotos: function(photoList) {
				if (photoList == null) {
					return;
				}
				for(var i = 0 ; i < photoList.length; i++) {
					let item = photoList[i];
					let photoModel = {
						fileid: item.attid,
						src: config.host + config.loadImage + '&attid=' + item.attid,
						type: 2,
						yhid: item.zpsgrecordid,
						attachtype: item.attachtype
					};
					
					if (photoModel.attachtype == 'fxwt') {// 属于隐患信息的照片
						this.createImgList.push(photoModel);
					}else if (photoModel.attachtype == 'zzwt') {// 属于整改情况的照片
						this.changeImgList.push(photoModel);
					}else if (photoModel.attachtype == 'yzwt') {// 属于整改确认的照片
						this.confirmImgList.push(photoModel);
					}
				}
			},
			
			/*通用方法相关*/
			jumpInput: function(key, placeholder, text, editableState) {
				if(this.pageState != editableState) {
					return
				}
				uni.navigateTo({
					url: "../common/inputPage?key=" + key + "&placeholder=" + placeholder + "&text=" + text
				})
				this.$fire.once(key, result=>{
					this.model[key] = result 
					// console.log('' + JSON.stringify(this.model));
				});
			},
			jumpOrgChoose: function(key, editableState) {
				if(this.pageState != editableState) {
					return
				}
				uni.navigateTo({
					url: "../common/orgChoose?selected=" + JSON.stringify([]) + "&key=" + key + "&mltiple=false"
				})
				this.$fire.once(key, result=>{ 
					console.log('' + JSON.stringify(result))
					this.model[key] = result;
				});
			},
			alertSheetShow: function(key, list, editableState) {
				var that = this;
				if(that.pageState != editableState) {
					return
				}
				uni.showActionSheet({
					itemList: list,
					success: function (res) {
						that.model[key] = list[res.tapIndex];
					},
					fail: function (res) {
						// console.log(res.errMsg);
					}
				});
			},
			pickerChange: function(data, e, editableState) {
				if(this.pageState != editableState) {
					return
				}
				this.model[e.target.id] = data[e.target.value];
			},
			dateChange: function(key, e, editableState) {
				if(this.pageState != editableState) {
					return
				}
				console.log('key:' + key + ",value:" + e.target.value);
				this.model[key] = e.target.value
			},
			// 特殊的pickerChange，审批意见的选择
			opinionSheetShow: function(key, list) {
				var that = this;
				uni.showActionSheet({
					itemList: list,
					success: function (res) {
						if (res.tapIndex != 3) {
							that.model[key] = list[res.tapIndex];
						}else {
							that.jumpInput(key, "请输入审批意见", that.model[key], that.pageState);
						}
					},
					fail: function (res) {
						// console.log(res.errMsg);
					}
				});
			},
			
			// 添加照片
			addPhoto(imgListName) {
				var that = this;
				photo.addPhoto(function(photoList) {
					that[imgListName] = that[imgListName].concat(photoList);
				});
			},
			// 删除照片，需要分两种情况，如是从后台加载的，那需要调用删除接口，如果是直接本地读取还未上传的，不需要调删除接口
			deleteImage(imgListName, imgObj, index) {
				var that = this;
				photo.deletePhoto(that[imgListName], imgObj, index, function(photoList){
					that[imgListName] = photoList;
				});
			},
			// 浏览照片
			viewPhoto(imgListName) {
				photo.viewPhoto(this[imgListName])
			},
			// 上传照片
			uploadPhoto (needBack = false, complete) {
				var that = this;
				let attachtype = that.getAttachtypeAndPhotoList().type;
				let photoList = that.getAttachtypeAndPhotoList().photoList;
				photo.uploadPhoto(that.userInfo.userid, that.model.recordid, attachtype, photoList, function(photoListOnServer){
					if(photoListOnServer.length > 0) {
						uni.showToast({
							icon: 'none',
							title: '照片上传成功',
						});
						that.createImgList = [];
						that.changeImgList = [];
						that.confirmImgList = [];
						that.classifyPhotos(photoListOnServer);
					}
					complete();
				});
			},
			// 获取上传图片用的attachtype和照片列表
			getAttachtypeAndPhotoList() {
				var obj = {};
				if(this.pageState == 1) {
					obj.type = "fxwt";
					obj.photoList = this.createImgList;
				}else if(this.pageState == 2) {
					obj.type = "zzwt";
					obj.photoList = this.changeImgList;
				}else if(this.pageState == 3) {
					obj.type = "yzwt";
					obj.photoList = this.confirmImgList;
				}else {
					obj.type = "";
					obj.photoList = [];
				}
				return obj;
			},
		}
	}
</script>

<style>
	@import url("../../css/common.css");
	.btnView {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
	}
	.saveBtn {
		display: flex;
		align-items: center;
		justify-content: center;
		border-width: 1;
		border-bottom-color: #F1F1F1;
		border-top-color: #F1F1F1;
		border-left-width: 0px;
		border-right-width: 0px;
		width: 100%;
		height: 110upx;
		text-align: center;
		margin-top: 20px;
		margin-left: 5px;
		margin-bottom: 20px;
		margin-right: 5px;
		font-size: 26upx;
	}
</style>
