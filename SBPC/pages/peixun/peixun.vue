<template>
	<view class="baseView">
		<view class="pxTitleView">
			<label class="pxTitleLabel">{{model.bt}}</label>
			<label class="pxSubTitleLabel">积分：{{model.kjjf}}分</label>
		</view>
		<image class="classImage" mode="aspectFit" :src="classList.length > 0 ? classList[currentIndex].src : ''" @click="viewPhoto(classList[currentIndex])"></image>
		<label class="countLabel">{{currentIndex + 1}}/{{classList.length}}</label>
		<view class="controlBtnView">
			<button :class="currentIndex > 0 ? 'buttonStyle' : 'buttonStyleDisable'" @click="provClick">上一页</button>
			<button :class="isCountFinish ? 'buttonStyle' : 'buttonStyleDisable'" @click="nextClick">{{nextPage}}</button>
		</view>
		<!-- <button class="buttonStyle" @click="gotoCeshi">去考试（测试用）</button> -->
	</view>
</template>

<script>
	import uniList from '@/components/list/uni-list/uni-list.vue'
	import uniIcon from '@/components/list/uni-icon/uni-icon.vue'
	import uniListItem from '@/components/list/uni-list-item/uni-list-item.vue'
	import prompt from '@/components/prompt/prompt.vue'
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
			components: {uniList,uniListItem,uniIcon,prompt},
			data() {
				return {
					model: {
						bt: "",
						recordid: "",
					},
					// 当前浏览到第几张
					currentIndex: 0,
					// 最大阅读进度，第几页，用于控制返回上一页后不倒计时
					maxReadIndex: 0,
					// 课件图列表
					classList:[],
					
					// 计时器
					timer: null,
					// 下一页文字
					nextPage: '下一页',
					// 倒计时时间
					seconds: 0,
					// 倒计时结束
					isCountFinish: false,
					
					// 页面返回标志 true是不能返回，false是可以返回，很奇怪
					backPressFlag: true,
				}
			},
			onLoad(option) {
				this.$fire.on("APP_HIDE", result=>{
					this.pauseTimer();
				});
				this.$fire.on("APP_SHOW", result=>{
					this.pauseTimer();
					this.startCount();
				});
				
				this.model.recordid = option.recordid == null ? "" : option.recordid;
				
				this.getDetail();
			},
			onBackPress() {
				var that = this;
				if (that.backPressFlag == true) {
					console.log(that.backPressFlag)
					uni.showModal({
						title: '提示',
						content: '是否确认退出培训？',
						confirmText: '确认',
						cancelText: '取消',
						success: function (res) {
							if (res.confirm) {
								that.backPressFlag = false;
								uni.navigateBack({
									delta: 1
								})
							} else if (res.cancel) {
								that.backPressFlag = true;
							}
						}
					});
					return that.backPressFlag;
				}
			},
			onUnload: function() {
				this.timer && this.clearTimer();
			},
			methods: {
				getDetail: function () {
					var that = this;
					that.currentIndex = 0;
					that.maxReadIndex = 0;
					let param = {
						userid: that.userInfo.userid,
						recordid: that.model.recordid
					};
					request.requestLoading(config.getClassDetail, param, '正在加载课件', function(res){
							that.model = res;
							that.classifyPhotos(res.kjList);
							that.seconds = that.minuteToSecond(that.classList[that.currentIndex].bfsc)
							that.startCount();
						},function(){//fail function
							uni.showToast({
								icon: 'none',
								title: '网络异常，请重试'
							});
						}, function(){//complete function
						
						}
					);
				},
				
				// 加载完隐患详情后把照片加到对应的List中
				classifyPhotos: function(photoList) {
					if (photoList == null) {
						return;
					}
					this.classList = [];
					for(var i = 0 ; i < photoList.length; i++) {
						let item = photoList[i];
						let photoModel = {
							fileid: item.attid,
							src: config.host + config.loadImage + '&attid=' + item.attid,
							bfsc: item.bfsc,
						};
						
						this.classList.push(photoModel);
					}
				},
				// 浏览照片
				viewPhoto(imageItem) {
					photo.viewPhoto([imageItem])
				},
				
				// 上一页
				provClick: function(e) {
					this.clearTimer();
					
					this.currentIndex -= 1;
					// this.startCount(this.classList[this.currentIndex].bfsc);
					if (this.currentIndex < this.maxReadIndex) {
						this.isCountFinish = true;
					}else {
						this.isCountFinish = false;
					}
				},
				
				// 下一页
				nextClick: function(e) {
					if (this.isCountFinish == false) {
						return;
					}
					
					if (this.currentIndex == this.classList.length - 1) {
						uni.navigateTo({
							url:'../ceshi/ceshi?recordid=' + this.model.ksapid
						});
					}else {
						this.currentIndex += 1;
						if (this.currentIndex >= this.maxReadIndex) {
							this.maxReadIndex = this.currentIndex;
							this.seconds = this.minuteToSecond(this.classList[this.currentIndex].bfsc)
							this.startCount();
						}
					}
				},
				
				// 去考试，测试用
				gotoCeshi: function(e) {
					uni.navigateTo({
						url:'../ceshi/ceshi?recordid=' + this.model.ksapid
					});
				},
				
				// 开始倒计时
				startCount() {
					this.isCountFinish = false;
					if (this.currentIndex == this.classList.length - 1) {
						this.nextPage = '(' + this.seconds + ')去参加考试';
					}else {
						this.nextPage = '(' + this.seconds + ')下一页';
					}
					this.timer = setInterval(() => {
						if (this.seconds === 0) {
							this.timer && this.clearTimer();
							this.isCountFinish = true;
						} else {
							this.isCountFinish = false;
						}
						this.loading();
					}, 1000);
				},
				
				// 更新秒和文字
				loading() {
					if (this.seconds == 0) {
						if (this.currentIndex == this.classList.length - 1) {
							this.nextPage = '去参加考试';
						}else {
							this.nextPage = '下一页';
						}
					}else {
						this.seconds -= 1;
						if (this.currentIndex == this.classList.length - 1) {
							this.nextPage = '(' + this.seconds + ')去参加考试';
						}else {
							this.nextPage = '(' + this.seconds + ')下一页';
						}
					}
				},
				
				// 清除timer
				clearTimer: function() {
					clearInterval(this.timer);
					this.timer = null;
					this.seconds = 0;
					this.loading();
				},
				
				// 暂停timer
				pauseTimer: function() {
					console.log('时间暂停，清除Timer')
					clearInterval(this.timer);
					this.timer = null;
				},
				
				// 分钟秒转换
				minuteToSecond: function (minute) {
					return parseInt(minute);
				},
			}
		}
</script>

<style>
	@import url("../../css/common.css");
	.pxTitleView {
		width: 100%;
		height: 120upx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.pxTitleLabel {
		width: 100%;
		/* height: 120upx; */
		font-size: 32upx;
		margin-left: 20upx;
		margin-right: 20upx;
		line-height: 60upx;
	}
	.pxSubTitleLabel {
		width: 100%;
		/* height: 120upx; */
		font-size: 22upx;
		margin-left: 20upx;
		margin-right: 20upx;
		line-height: 30upx;
		color: #BBBBBB;
	}
	.classImage {
		width: 100%;
		flex-shrink: 0; /*等比例不压缩*/
	}
	.controlBtnView {
		width: 100%;
		height: 120upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.countLabel {
		width: 100%;
		height: 60upx;
		text-align: center;
		color: #888888;
		line-height: 60upx;
	}
</style>
