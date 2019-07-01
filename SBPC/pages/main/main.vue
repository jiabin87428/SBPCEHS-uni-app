<template> 
	<view class="baseView">  
		<view class="topView_pc" @tap="getPoints()">
			<view class="topItemView">
				<text class="topTextTitle">隐患总数</text>
				<text class="topTextNum">{{pointModel.yhzsl}}</text>
			</view>
			<view class="topItemView">
				<text class="topTextTitle">整改中</text>
				<text class="topTextNum">{{pointModel.zgzyhsl}}</text>
			</view>
			<view class="topItemView">
				<text class="topTextTitle">超期未整改</text>
				<text class="topTextNum">{{pointModel.cqwgz}}</text>
			</view>
		</view>
		
		<!-- <view class="titleView_pc">
			<text class="titleText_pc">目标职责</text>
		</view> -->
		<view class="menuBlockView">
		  <view class='dangerView' @tap="jumpPage('../check/checkList')">
			<image class="dangerIcon" src="../../static/assets/jc.png" mode="widthFix"></image>
			<view class='subView'>
			  <text class='dangerText'>检查</text>
			</view>
		  </view>
		  <view class='dangerView' @tap="jumpPage('../danger/dangerList')">
			<image class="dangerIcon" src="../../static/assets/yh.png" mode="widthFix"></image>
			<view class='subView'>
			  <text class='dangerText'>隐患</text>
			</view>
		  </view>
		  <view class='dangerView' @tap="jumpPage('../charts/chartsTypeList')">
			<image class="dangerIcon" src="../../static/assets/tj.png" mode="widthFix"></image>
			<view class='subView'>
			  <text class='dangerText'>统计</text>
			</view>
		  </view>
		  <view class='dangerView' @tap="jumpPage('../peixun/peixunList')">
			<image class="dangerIcon" src="../../static/assets/pxkc.png" mode="widthFix"></image>
			<view class='subView'>
			  <text class='dangerText'>培训</text>
			</view>
		  </view>
		  <view class='dangerView' @tap="jumpPage('../other/gonggaoList')">
			<image class="dangerIcon" src="../../static/assets/gg.png" mode="widthFix"></image>
			<view class='subView'>
			  <text class='dangerText'>通知公告</text>
			</view>
		  </view>
		  <view class='dangerView' @tap="jumpPage('../other/newsList')">
			<image class="dangerIcon" src="../../static/assets/xw.png" mode="widthFix"></image>
			<view class='subView'>
			  <text class='dangerText'>公司新闻</text>
			</view>
		  </view>
		  <view class='dangerView' @tap="jumpPage('../other/pointRank')">
			<image class="dangerIcon" src="../../static/assets/cn.png" mode="widthFix"></image>
			<view class='subView'>
			  <text class='dangerText'>积分排名</text>
			</view>
		  </view>
		  <view class='dangerView'>

		  </view>
		  <view class='dangerView'>

		  </view>
		</view>
	</view>
</template>

<script>
	import config from '../../util/config.js';
	import service from '../../service.js';
	import request from '../../util/request.js';
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	export default {
		computed: {
		    ...mapState(['hasLogin', 'forcedLogin', 'userType', 'userInfo'])
		},
		components: {},
		data() {
			return {
				pointModel: {
					// 需要的固定积分
					xyjf: 0,
					// 已获得主动学习积分
					zdjf: 0,
					// 已获得固定学习积分
					gdjf: 0,
					// 积分排名
					jfpm: "0/0",
					// 总积分
					zf: 0
				},
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.login(service.getUsers());
			if (!this.hasLogin) {
			    uni.showModal({
			        title: '未登录',
			        content: '您未登录，需要登录后才能继续',
			        /**
			         * 如果需要强制登录，不显示取消按钮
			         */
			        showCancel: !this.forcedLogin,
			        success: (res) => {
			            if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
			                if (this.forcedLogin) {
			                    uni.reLaunch({
			                        url: '../login/login'
			                    });
			                } else {
			                    uni.navigateTo({
			                        url: '../login/login'
			                    });
			                }
			            }
			        }
			    });
			}else {
				this.getPoints();
			}
		},
		methods:{
			...mapMutations(['login', 'setPoints']),
			jumpPage(url) {
				if (url == '') {
					uni.showToast({
						icon: 'none',
						title: '敬请期待～',
					})
					return;
				}else {
					uni.navigateTo({
						url: url
					});
				}
			},
			// 获取积分统计
			getPoints: function() {
				var that = this;
				let param = {
					userid: that.userInfo.userid
				};
				request.requestLoading(config.getPoints, param, '', function(res){
						that.pointModel = res;
						that.pointModel.zf = parseInt(res.zdjf) + parseInt(res.gdjf);
						that.setPoints(that.pointModel);
					},function(){//fail function
						uni.showToast({
							icon: 'none',
							title: '网络异常，请重试'
						});
					}, function(){//complete function
					
					}
				);
			},
		},
	}
</script>

<style>  
	@import url("../../css/common.css");
	/* 菜单按钮 */
	.menuBlockView {
	  width: 100%;
	  background-color: #FFFFFF;
	  display: flex;
	  flex-wrap: wrap;
	  flex-direction: row;
	  justify-content: space-around;
	  padding-bottom: 30upx;
	}
	.dangerView {
	  display:flex;
	  flex-direction:column;
	  width: 30%;
	  margin-top: 50px;
	  align-items:center;/*垂直居中*/
	}
	.dangerIcon {
	  width: 80upx;
	  height: 80upx;
	}

	.subView {
	  display:flex;
	  flex-direction:column;
	  width: 100%;
	  margin-top: 10px;
	  align-items:center;/*垂直居中*/
	}
	.dangerText {
		width: 100%;
		font-size: 16;
		color: #898989;
		text-align: center;
	}
	
	.titleView_pc {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 20upx;
		width: 100%;
		height: 80upx;
		background-color: #FFFFFF;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #F1F1F1;
	}
	.titleText_pc {
		margin-left: 30upx;
		color: #666666;
		width: 100%;
		text-align: left;
		font-size: 32upx;
	}
	/*顶部统计*/
	.topView_pc {
/* 		width: 100%;
		height: 240upx;
		margin-top: 0upx;
		background-color: #2D68AA;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between; */
		
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
		background-color: #2D68AA;
	}
	.topItemView {
		width: 30%;
		height: 240upx;
		/* background-color: #2D68AA; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.topTextTitle {
		width: 100%;
		text-align: center;
		color: #FFFFFF;
		font-size: 30upx;
	}
	.topTextNum {
		width: 100%;
		text-align: center;
		color: #FFFFFF;
		font-size: 40upx;
	}
	.arrow {
		width: 15upx;
		height: 240upx;
		margin-right: 10upx;
	}
	
</style>
