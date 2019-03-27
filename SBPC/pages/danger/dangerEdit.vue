<template>
	<view class="baseView">
		<view class="cellTitleView">
			<text class="cellTitle">基础信息</text>
		</view>
		<view class="cellInfoView">
			<uni-list>
				<uni-list-item title="隐患描述" :note="yhms" show-arrow="true" @click="jumpInput('yhms', '请输入隐患描述', yhms)"></uni-list-item>
				<uni-list-item title="隐患等级" :subnote="yhdj" show-arrow="true" @click="alertSheetShow('yhdj', dangerLevel)"></uni-list-item>
				<uni-list-item title="隐患后果" :subnote="yhhg" show-arrow="true" @click="alertSheetShow('yhhg', dangerResult)"></uni-list-item>
				<picker id="yhlx" @change="pickerChange(dangerType, $event)" v-bind:range="dangerType">
					<uni-list-item title="隐患类型" :subnote="yhlx" show-arrow="true"></uni-list-item>
				</picker>
				<picker mode="date" :value="zgqx" @change="dateChange('zgqx', $event)">
					<uni-list-item title="整改期限" :subnote="zgqx" show-arrow="true"></uni-list-item>
				</picker>
				<picker id="yhly" @change="pickerChange(dangerSource, $event)" v-bind:range="dangerSource">
					<uni-list-item title="隐患来源" :subnote="yhly" show-arrow="true"></uni-list-item>
				</picker>
				<uni-list-item title="责任部门" :subnote="zrbm ? zrbm.name : ''" show-arrow="true" @click="jumpOrgChoose('zrbm')"></uni-list-item>
				<uni-list-item title="发起人" :subnote="this.userInfo.username" show-arrow="false"></uni-list-item>
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
					  <image class='littleImageDelete' src='../../static/assets/delete.png' @click="deleteImage('createImgList', imgObj, idx)" :id='idx' mode="aspectFit"></image>
					</view>
				  </block>
				  <view class="littleImageView" @click="addPhoto('createImgList')" v-bind:style="{width:littleImageWidth + 'px', height: littleImageWidth + 'px'}">
					<image class="littleImage" src="../../static/assets/addImage.png"></image>
				  </view>
				</view>
			</view>
		</view>
		<view class="btnView">
		    <button class="saveBtn" @tap="saveClick">保存</button>
			<block v-for="(btnObj,index) in flowbtnchooseflow" :key="index">
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
				// 流转按钮相关
				flowbtnchooseflow:[],
				// 模型对象
				model: {
					instanceid: '',
					recordid: '',
				},
				
				// 照片相关
				littleImageWidth: 0,
				createImgList: [],	// 新建隐患照片列表
				changeImgList: [],	// 整改隐患照片列表
				confirmImgList: [],	// 确认整改照片列表
				
				// 状态：1、隐患信息可编辑，2、整改情况可编辑，3、整改确认可编辑
				pageState: 1,
				
				// 数据源
				dangerLevel: dataConfig.dangerLevel,
				dangerResult: dataConfig.dangerResult,
				dangerType: dataConfig.dangerType,
				dangerSource: dataConfig.dangerSource,
			}
		},
		onLoad(option) {
			this.littleImageWidth = (uni.getSystemInfoSync().windowWidth -50) / 4;
			this.instanceid = option.instanceid == null ? "" : option.instanceid;
			this.recordid = option.recordid == null ? "" : option.recordid;
			if(this.instanceid != "" || this.recordid != "") {
				this.getDangerDetail();
			}
		},
		methods:{
			/*新建隐患相关*/
			// 保存隐患
			saveClick: function(e) {
				var that = this;
				var param = {
					userid: that.userInfo.userid,
					instanceid: that.instanceid,
					recordid: that.recordid,
					yhms: that.yhms,
					yhdj: that.yhdj,
					yhhg: that.yhhg,
					yhlx: that.yhlx,
					zgqx: that.zgqx,
					yhly: that.yhly,
					zrbmid: that.zrbm == null ? "" : that.zrbm.id,
					zrbmmc: that.zrbm == null ? "" : that.zrbm.name,
					
					fqrid: that.userInfo.userid,
					fqrmc: that.userInfo.username,
				}
				request.requestLoading(config.addDanger, param, '添加隐患', 
					function(res){
						that.instanceid = res.instanceid;
						that.recordid = res.recordid;
						that.flowbtnchooseflow = res.flowbtnchooseflow;
					},function(){
						uni.showToast({
							icon: 'none',
							title: '添加失败'
						});
					}, function(){
						
					}
				);
			},
			// 流转隐患
			roamClick: function(btnObj) {
				var that = this;
				var param = {
					userid: that.userInfo.userid,
					instanceid: that.instanceid,
					recordid: that.recordid,
					yhms: that.yhms,
					yhdj: that.yhdj,
					yhhg: that.yhhg,
					yhlx: that.yhlx,
					zgqx: that.zgqx,
					yhly: that.yhly,
					zrbmid: that.zrbm == null ? "" : that.zrbm.id,
					zrbmmc: that.zrbm == null ? "" : that.zrbm.name,
					
					fqrid: that.userInfo.userid,
					fqrmc: that.userInfo.username,
					
					operationname: btnObj.operationname,
					nextstatusname: btnObj.nextstatusname,
					prestatusname: btnObj.prestatusname,
					flowtype: btnObj.flowtype,
				}
				request.requestLoading(config.flowDanger, param, '正在流转', 
					function(res){
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
				var param = {
					userid: that.userInfo.userid,
					receiverid: person.id,
					instanceid: that.instanceid,
					recordid: that.recordid,
					yhms: that.yhms,
					yhdj: that.yhdj,
					yhhg: that.yhhg,
					yhlx: that.yhlx,
					zgqx: that.zgqx,
					yhly: that.yhly,
					zrbmid: that.zrbm == null ? "" : that.zrbm.id,
					zrbmmc: that.zrbm == null ? "" : that.zrbm.name,
					
					fqrid: that.userInfo.userid,
					fqrmc: that.userInfo.username,
					
					operationname: btnObj.operationname,
					nextstatusname: btnObj.nextstatusname,
					prestatusname: btnObj.prestatusname,
					flowtype: btnObj.flowtype,
				}
				request.requestLoading(config.flowDangerAfterChooseTarget, param, '正在流转', 
					function(res){
						console.log('' + JSON.stringify(res));
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
				let param = {
					instanceid: that.instanceid,
					recordid: that.recordid
				};
				request.requestLoading(config.getDangerDetail, param, '正在加载', 
					function(res){
						console.log('' + JSON.stringify(res));
					},function(){
						uni.showToast({
							icon: 'none',
							title: '加载失败'
						});
					}, function(){
						
					}
				);
			}, 
			
			/*通用方法相关*/
			
			jumpInput: function(key, placeholder, text) {
				uni.navigateTo({
					url: "../common/inputPage?key=" + key + "&placeholder=" + placeholder + "&text=" + text
				})
				this.$fire.once(key, result=>{ 
					this[key] = result 
				});
			},
			jumpOrgChoose: function(key) {
				let selected = [this.zrbm]
				uni.navigateTo({
					url: "../common/orgChoose?selected=" + JSON.stringify(selected) + "&key=" + key + "&mltiple=false"
				})
				this.$fire.once(key, result=>{ 
					console.log('' + JSON.stringify(result))
					this[key] = result;
				});
			},
			alertSheetShow: function(key, list) {
				var that = this;
				uni.showActionSheet({
					itemList: list,
					success: function (res) {
						that[key] = list[res.tapIndex];
					},
					fail: function (res) {
						// console.log(res.errMsg);
					}
				});
			},
			pickerChange: function(data, e) {
				this[e.target.id] = data[e.target.value];
			},
			dateChange: function(key, e) {
				this[key] = e.target.value
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
