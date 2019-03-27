<template>
	<view class="baseView">
		<block v-for="(obj, index) in personList" :key="index">
			<view class="cellBaseView_Row">
				<view class="orgName" @click="chooseCurrent(obj)">{{obj.name}}</view>
				<view class="nextLevelView" @click="gotoNext(obj)" v-if="obj.isUser == 'N'">
					<view class="columnLine"></view>
					<image class="levelImg" mode="aspectFit" src="../../static/assets/level.png" v-if="obj.hasChild == 'Y'"></image>
					<view class="nextLevel" v-if="obj.hasChild == 'Y'">下级</view>
					<image class="levelImg" mode="aspectFit" src="../../static/assets/level_disable.png" v-if="obj.hasChild == 'N'"></image>
					<view class="nextLevel_disable" v-if="obj.hasChild == 'N'">下级</view>
				</view>
			</view>
			<view class="cellLine"></view>
		</block>
		<view class="coverBottomView" v-if="mltiple==true">确定</view>
	</view>
</template>

<script>
	import config from '../../util/config.js';
	import request from '../../util/request.js';
	import {
	    mapState
	} from 'vuex'
	export default {
		computed: mapState(['userInfo']),
		data() {
		    return {
				// 复制的Key
				key: '',
				// 查询条件
				condition: '',
				// 是否多选
				mltiple: false,
				// 已选内容
				selected: [],
				// 部门列表
				personList: [],
				
				// 当前部门id
				orgId: '',
				
				// 返回层级-因为可能有多级
				backLevel: 1,
			}
		},
		onLoad(option) {
			this.key = option.key;
			this.mltiple = option.mltiple == 'true' ? true : false;
			this.selected = option.selected == null ? [] : JSON.parse(option.selected);
			this.orgId = option.orgId == null ? "" : option.orgId;
			this.backLevel = option.back == null ? 1 : parseInt(option.back);
			this.condition = option.condition == null ? "" : option.condition;
			this.getOrgList();
		},
		onNavigationBarButtonTap() {
			
		},
		onShow() {
			
		},
		methods:{
			getOrgList: function() {
				var that = this;
				let param = {
					userid: that.userInfo.userid,
					orgid: that.orgId,
					data: that.condition,
				};
				request.requestLoading(config.getPersonList, param, '正在加载', 
					function(res){
						that.personList = res.data;
					},function(){
						uni.showToast({
							icon: 'none',
							title: '加载失败'
						});
					},function() {
						
					});
			},
			// 选择当前项
			chooseCurrent: function(person) {
				if(this.mltiple == false && person.isUser == "Y") {// 单选，直接返回
					this.$fire.fire(this.key, person);
					uni.navigateBack({
						delta: this.backLevel
					})
				}
			},
			// 去下级
			gotoNext: function(person) {
				if (person.hasChild == "N") {
					uni.showToast({
						icon: 'none',
						title: '该节点无下级'
					});
					return;
				}
				var back = this.backLevel + 1;
				uni.navigateTo({
					url: "../common/personChoose?selected=" + JSON.stringify(this.selected) + "&key=" + this.key + "&condition=" + this.condition + "&mltiple=" + this.mltiple + "&orgId=" + person.id + "&back=" + back
				})
			},
		}
	}
</script>

<style>
	@import url("../../css/common.css");
	.orgName {
		width: 100%;
		margin-left: 20upx;
		color: #666666;
		font-size: 34upx;
	}
	.nextLevelView {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.columnLine {
		width: 1upx;
		height: 60%;
		background-color: #DDDDDD;
	}
	.levelImg {
		margin-left: 30upx;
		margin-right: 5upx;
		width: 40upx;
	}
	.nextLevel {
		width: 100upx;
		color: #3296FA;
		font-size: 34upx;
	}
	.nextLevel_disable {
		width: 100upx;
		color: #BEBEBE;
		font-size: 34upx;
	}
</style>
