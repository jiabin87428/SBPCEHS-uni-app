<template>
	<view class="baseView">
		<view class="cellTitleView">
			<text class="cellTitle">隐患信息</text>
		</view>
		<view class="cellInfoView">
			<uni-list>
				<uni-list-item title="隐患描述" :note="model.yhms" show-arrow="true" @click="jumpInput('yhms', '请输入隐患描述', model.yhms)"></uni-list-item>
				<uni-list-item title="隐患等级" :subnote="model.yhdj" show-arrow="true" @click="alertSheetShow('yhdj', dangerLevel)"></uni-list-item>
				<uni-list-item title="隐患后果" :subnote="model.yhhg" show-arrow="true" @click="alertSheetShow('yhhg', dangerResult)"></uni-list-item>
				<picker id="yhlx" @change="pickerChange(dangerType, $event)" v-bind:range="dangerType">
					<uni-list-item title="隐患类型" :subnote="model.yhlx" show-arrow="true"></uni-list-item>
				</picker>
				<picker mode="date" :value="model.zgqx" @change="dateChange('zgqx', $event)">
					<uni-list-item title="整改期限" :subnote="model.zgqx" show-arrow="true"></uni-list-item>
				</picker>
				<picker id="yhly" @change="pickerChange(dangerSource, $event)" v-bind:range="dangerSource">
					<uni-list-item title="隐患来源" :subnote="model.yhly" show-arrow="true"></uni-list-item>
				</picker>
				<uni-list-item title="责任部门" :subnote="model.zrbm ? model.zrbm.name : ''" show-arrow="true" @click="jumpOrgChoose('zrbm')"></uni-list-item>
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
		<block v-if="pageState != 1">
			<view class="cellTitleView">
				<text class="cellTitle">整改情况</text>
			</view>
			<view class="cellInfoView">
				<uni-list>
					<uni-list-item title="隐患因素" :note="model.rwhg" show-arrow="true" @click="alertSheetShow('rwhg', dangerLevel)"></uni-list-item>
					<uni-list-item title="原因分析" :subnote="model.yyfx" show-arrow="true" @click="jumpInput('yyfx', '请输入原因分析', model.yyfx)"></uni-list-item>
					<uni-list-item title="整改情况" :subnote="model.yhzgqk" show-arrow="true" @click="jumpInput('yhzgqk', '请输入原因分析', model.yhzgqk)"></uni-list-item>
					<picker mode="date" :value="model.zgwcrq" @change="dateChange('zgwcrq', $event)">
						<uni-list-item title="完成日期" :subnote="model.zgwcrq" show-arrow="true"></uni-list-item>
					</picker>
					<uni-list-item title="整改人" :subnote="this.userInfo.username" show-arrow="false"></uni-list-item>
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
						  <image class='littleImageDelete' src='../../static/assets/delete.png' @click="deleteImage('changeImgList', imgObj, idx)" :id='idx' mode="aspectFit"></image>
						</view>
					  </block>
					  <view class="littleImageView" @click="addPhoto('changeImgList')" v-bind:style="{width:littleImageWidth + 'px', height: littleImageWidth + 'px'}">
						<image class="littleImage" src="../../static/assets/addImage.png"></image>
					  </view>
					</view>
				</view>
			</view>
		</block>
		
		<view class="btnView">
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
				
				// 状态：1、隐患信息可编辑，2、整改情况可编辑，3、整改确认可编辑
				// 包含start：只能填写隐患信息，包含zzzg：只能填写整改情况，包含zzyz：只能填写整改确认
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
			this.model.instanceid = option.instanceid == null ? "" : option.instanceid;
			this.model.recordid = option.recordid == null ? "" : option.recordid;
			if(this.model.instanceid != "" || this.model.recordid != "") {
				this.getDangerDetail();
			}
		},
		methods:{
			/*新建隐患相关*/
			// 保存隐患
			saveClick: function(e) {
				var that = this;
				that.model.userid = that.userInfo.userid;
				that.model.fqrid = that.userInfo.userid;
				that.model.fqrmc = that.userInfo.username;
				that.model.zrbmid = that.model.zrbm == null ? "" : that.model.zrbm.id;
				that.model.zrbmmc = that.model.zrbm == null ? "" : that.model.zrbm.name;
				
				request.requestLoading(config.addDanger, that.model, '添加隐患', 
					function(res){
						that.model = res;
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
				
				that.model.userid = that.userInfo.userid;
				that.model.operationname = btnObj.operationname;
				that.model.nextstatusname = btnObj.nextstatusname;
				that.model.prestatusname = btnObj.prestatusname;
				that.model.flowtype = btnObj.flowtype;

				request.requestLoading(config.flowDanger, that.model, '正在流转', 
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
				that.model.receiverid = person.id;
				request.requestLoading(config.flowDangerAfterChooseTarget, that.model, '正在流转', 
					function(res){
						uni.showToast({
							icon: 'none',
							title: res.repMsg,
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
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
						if (that.model.controlcode.indexOf("start") != -1) {// 包含start
							that.pageState = 1;
						}else if (that.model.controlcode.indexOf("zzzg") != -1) {// 包含zzzg
							that.pageState = 2;
						}else if (that.model.controlcode.indexOf("zzyz") != -1) {// 包含zzyz
							that.pageState = 3;
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
			
			/*通用方法相关*/
			jumpInput: function(key, placeholder, text) {
				uni.navigateTo({
					url: "../common/inputPage?key=" + key + "&placeholder=" + placeholder + "&text=" + text
				})
				this.$fire.once(key, result=>{
					this.model[key] = result 
					console.log('' + JSON.stringify(this.model));
				});
			},
			jumpOrgChoose: function(key) {
				uni.navigateTo({
					url: "../common/orgChoose?selected=" + JSON.stringify([]) + "&key=" + key + "&mltiple=false"
				})
				this.$fire.once(key, result=>{ 
					console.log('' + JSON.stringify(result))
					this.model[key] = result;
				});
			},
			alertSheetShow: function(key, list) {
				var that = this;
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
			pickerChange: function(data, e) {
				this.model[e.target.id] = data[e.target.value];
			},
			dateChange: function(key, e) {
				this.model[key] = e.target.value
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
