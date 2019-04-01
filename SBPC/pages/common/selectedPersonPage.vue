<template>
	<view class="baseView">
		<block v-for="(obj, index) in selectedList" :key="index">
			<view class="cellBaseView_Row">
				<view class="cellTextView">
					<text class="titleLabel">{{obj.name}}</text>
					<text class="subTitleLabel">{{obj.orgName}}</text>
				</view>
				<image class="deleteImg" mode="aspectFit" src="../../static/assets/delete_gray.png" @click="deletePerson(index)"></image>
			</view>
			<view class="cellLine"></view>
		</block>
	</view>
</template>

<script>
	
	import {
	    mapState
	} from 'vuex'
	export default {
		computed: mapState(['userInfo']),
		components: {},
		data() {
			return {
				// 返回后赋值的key
				key: '',
				// 已选列表
				selectedList: [],
			}
		},
		onLoad(option) {
			this.key = option.key == null ? "" : option.key;
			this.selectedList = option.selectedList == null ? [] : JSON.parse(option.selectedList);
		},
		onNavigationBarButtonTap() {
			uni.navigateBack()
			this.$fire.fire(this.key, this.selectedList);
		},
		methods: {
			// 删除所选人
			deletePerson: function(index) {
				this.selectedList.splice(index, 1);
			},
		}
	}
</script>

<style>
	@import url("../../css/common.css");
	.cellTextView {
		background-color: #FFFFFF;
		width: 100%;
		height: 120upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.titleLabel {
		width: 100%;
		margin-left: 20upx;
		color: #333333;
		font-size: 34upx;
	}
	.subTitleLabel {
		width: 100%;
		margin-left: 20upx;
		color: #888888;
		font-size: 28upx;
	}
	.deleteImg {
		margin-right: 20upx;
		width: 45upx;
		height: 45upx;
		flex-shrink: 0; /*等比例不压缩*/
	}
</style>
