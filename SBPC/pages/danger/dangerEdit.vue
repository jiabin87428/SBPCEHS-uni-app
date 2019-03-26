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
				  <text class='rightTextRow'>{{imageList.length}}</text>
				</view>
				<view id='imageView' class='imageView'>
				  <block v-for="(imgObj,idx) in imageList" :key="idx">
					<view class="littleImageView" v-bind:style="{width:littleImageWidth + 'px', height:littleImageWidth + 'px'}">
					  <image class="littleImage" @click="viewPhoto" :id="idx" :src="imgObj.src" mode="aspectFit"></image>
					  <image class='littleImageDelete' src='../../static/assets/delete.png' @click="deleteImage(imgObj,idx)" :id='idx' mode="aspectFit"></image>
					</view>
				  </block>
				  <view class="littleImageView" @click='addPhoto' v-bind:style="{width:littleImageWidth + 'px', height: littleImageWidth + 'px'}">
					<image class="littleImage" src="../../static/assets/addImage.png"></image>
				  </view>
				</view>
			</view>
		</view>
		<view class="btnView">
		    <button class="saveBtn" @tap="saveClick">保存</button>
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
				
				// 照片相关
				imageList: [],
				littleImageWidth: 0,
				
				// 是否可编辑
				editable: true,
				
				// 数据源
				dangerLevel: dataConfig.dangerLevel,
				dangerResult: dataConfig.dangerResult,
				dangerType: dataConfig.dangerType,
				dangerSource: dataConfig.dangerSource,
			}
		},
		onLoad(option) {
			this.littleImageWidth = (uni.getSystemInfoSync().windowWidth -50) / 4;
		},
		onNavigationBarButtonTap() {
			
		},
		onShow() {
			
		},
		methods:{
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
			// 保存隐患
			saveClick: function(e) {
				var that = this;
				let param = {
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
						console.log('' + JSON.stringify(res));
					},function(){
						uni.showToast({
							icon: 'none',
							title: '添加失败'
						});
					}, function(){
						
					}
				);
			},
			// 上传照片功能-添加照片
			addPhoto() {
				var that = this;
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						for (var i=0;i<res.tempFilePaths.length;i++) {
							var imgObj = {//	type：1为新增需要上传，2为加载的，不需要上传
								fileid: '',
								src: res.tempFilePaths[i],
								type: 1
							}
							that.imageList.push(imgObj);
						}
					}
				});
			},
			// 删除照片，需要分两种情况，如是从后台加载的，那需要调用删除接口，如果是直接本地读取还未上传的，不需要调删除接口
			deleteImage(imgObj, index) {
				var that = this;
				if (imgObj.src.startsWith('http:')) {// 网络图片
					let obj = {
						item: that.item,
						index: that.itemIndex
					}
					that.setSublistItem(obj);
					
					let param = {
						from: 'jc',
						yyid: that.item.id,
						fileid: imgObj.fileid,
						userid: that.userInfo.userid
					};
					request.requestLoading(config.deleteImage, param, '正在删除图片', 
						function(res){
							console.log('删除成功：' + JSON.stringify(res));
							that.item.fj = res.fj
							that.imageList.splice(index,1);
						},function(){
							uni.showToast({
								icon: 'none',
								title: '删除失败'
							});
						}, function(){
							
						}
					);
				}else {// 刚选择好，还未上传，非网络图片
					that.imageList.splice(index,1);
				}
			},
			// 浏览照片
			viewPhoto() {
				var that = this;
				var imgList = []
				for (var i=0 ; i<that.imageList.length; i++) {
					let item = that.imageList[i]
					imgList.push(item.src);
				}
				// 预览图片
				uni.previewImage({
					urls: imgList
				});
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
		margin-left: 20px;
		margin-bottom: 20px;
		margin-right: 20px;
	}
</style>
