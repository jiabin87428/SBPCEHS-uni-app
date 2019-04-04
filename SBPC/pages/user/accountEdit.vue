<template>
	<view class="center">
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60f;</text>
				<text class="list-text">修改密码</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="btnView">
			<button type="primary" class="btn" @tap="bindLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
	    mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
		    ...mapState(['hasLogin', 'forcedLogin'])
		},
		methods: {
			...mapMutations(['logout']),
			bindLogout() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认要退出登录吗？',
					success: function (res) {
						if (res.confirm) {
							that.logout();
							service.removeUser();
							/**
							 * 如果需要强制登录跳转回登录页面
							 */
							if (that.forcedLogin) {
							    uni.reLaunch({
							        url: '../login/login',
							    });
							}
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	.center {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		background-color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		height: 100%;
		flex-direction: column;
	}
	.btnView {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 200upx;
	}
	.btn {
		width: 95%;
		background-color: #4CD964;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #4cd964;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>