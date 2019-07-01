<template>
	<view class="center">
		<view class="logo" :hover-class="logo-hover">
			<image class="logo-img" :src="avatarUrl" @click="changeUserPhoto"></image>
			<view class="logo-title">
				<view class="infoView" v-if="hasLogin">
					<text class="uer-name">你好，{{userInfo.username}}</text>
					<text class="uer-code">工号：{{userInfo.usercode}}</text>
					<!-- <text class="uer-code">{{'积分：' + pointModel.zf + '分 | 排名：' + pointModel.jfpm}}</text> -->
				</view>
				<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">点击登录</button>
			</view>
		</view>
		<view class="userinfo">
		  <view class='dangerView' @tap="jumpAccountEdit()">
		    <image class="dangerIcon" src="../../static/img/setting.png" mode="widthFix"></image>
		    <view class='subView'>
		      <text class='dangerText'>设置</text>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	import config from '../../util/config.js';
	import request from '../../util/request.js';
	import photo from '../../util/photoUtil.js';
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	export default {
		computed: {
		    ...mapState(['hasLogin', 'forcedLogin', 'userInfo', 'pointModel'])
		},
		data() {
			return {
				userid: "",
				avatarUrl: "../../static/img/head.png",
				uerInfo: {},
			}
		},
		onLoad() {
			this.userid = this.userInfo.userid;
			this.uploadUserPhoto();
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
			    uni.navigateTo({
			        url: '../login/login',
			    });
			},
			// 跳转账号管理
			jumpAccountEdit() {
				uni.navigateTo({
				    url: './accountEdit',
				});
			},
			// 加载用户头像
			uploadUserPhoto: function() {
				this.avatarUrl = config.host + config.loadUserPhoto + this.userInfo.userid;
			},
			// 上传用户头像
			changeUserPhoto: function(e){
				var that = this;
				photo.addPhoto(function(photoList) {
					if (photoList.length <= 0) {
						return;
					}
					that.avatarUrl = photoList[0].src;
					var photoModel = photoList[0];
					that.uploadPhoto(photoList);
				}, 1);
			},
			// 上传照片
			uploadPhoto (photoList) {
				var that = this;
				photo.uploadPhoto(that.userInfo.userid, "", "rytx", photoList, function(photoListOnServer){
					uni.showToast({
						icon: 'none',
						title: '头像上传成功',
					});
				});
			},
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
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #2D68AA;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}
	
	.infoView {
		display: flex;
		flex-direction: column;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}
	
	.uer-code {
		height: 60upx;
		line-height: 60upx;
		font-size: 22upx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
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
		flex-direction: column;
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
	/*九宫格*/
	/* 菜单按钮 */
	.userinfo {
		background-color: #FFFFFF;
		width: 99%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
	}
	.dangerView {
	  display:flex;
	  flex-direction:column;
	  width: 33%;
	  margin-top: 5px;
	  background-color: #FFFFFF;
	  align-items:center;/*垂直居中*/
	}
	.dangerIcon {
	  width: 80upx;
	  height: 80upx;
	  margin-top: 50upx;
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
		margin-bottom: 50upx;
	}
</style>
