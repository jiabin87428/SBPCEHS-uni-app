<template>
	<view class="baseView">
		<scroll-view class="personScrollView" scroll-y="true">
			<block v-for="(obj, index) in personList" :key="index">
				<view class="cellBaseView_Row">
					<image class="selectedImg" v-if="mltiple == true && obj.selected == true && obj.isUser == 'Y'" src="../../static/assets/selected.png"></image>
					<image class="unSelectedImg" v-if="mltiple == true && obj.isUser == 'Y' && (obj.selected == false || obj.selected == null)" src="../../static/assets/unselected.png"></image>
					<view class="orgName" @click="chooseCurrent(obj)" v-if="mltiple == false">{{obj.name}}</view>
					<view class="orgName" @click="addOrDeleteCurrent(obj, index)" v-if="mltiple == true">{{obj.name}}</view>
					<view class="nextLevelView" @click="gotoNext(obj)" v-if="obj.isUser == 'N'">
						<view class="columnLine"></view>
						<image class="levelImg" mode="aspectFit" src="../../static/assets/level.png"></image>
						<view class="nextLevel">下级</view>
					</view>
				</view>
				<view class="cellLine"></view>
			</block>
		</scroll-view>
		<view class="bottomView" v-if="mltiple==true">
			<text class="hasChoose" @click="editSelected">已选择:{{selectedList.length}}人</text>
			<view class="confirmButtom" @click="confirmCurrentList">确定</view>
		</view>
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
				// 赋值的Key
				key: '',
				// 查询条件
				condition: '',
				// 是否多选
				mltiple: false,
				// 已选内容
				selectedList: [],
				// 人员列表
				personList: [],
				
				// 当前部门id
				orgId: '',
				// 当前部门名称
				orgName: '',
				
				// 返回层级-因为可能有多级
				backLevel: 1,
			}
		},
		onLoad(option) {
			this.key = option.key;
			this.mltiple = option.mltiple == 'true' ? true : false;
			this.selectedList = option.selected == null ? [] : JSON.parse(option.selected);
			this.orgId = option.orgId == null ? "" : option.orgId;
			this.backLevel = option.back == null ? 1 : parseInt(option.back);
			this.condition = option.condition == null ? "" : option.condition;
			this.orgName = option.orgName == null ? "" : option.orgName;
			this.getPersonList();
			
			// 返回赋值已选的key
			let backSelectedKey = "SET_SELECTED_" + this.backLevel;
			this.$fire.on(backSelectedKey, resultList=>{
				this.selectedList = resultList;
			});
		},
		onNavigationBarButtonTap() {
			
		},
		onShow() {
			
		},
		onBackPress(options) {  
            if (options.from === 'navigateBack') {// 通过uni.navigateBack()返回
                console.log('22222')
            }else {// 左上角返回
				if (this.backLevel > 1) {
					// 返回赋值已选的key
					let backSelectedKey = "SET_SELECTED_" + (this.backLevel - 1);
					this.$fire.fire(backSelectedKey, this.selectedList);
				}
			}
        }, 
		methods:{
			getPersonList: function() {
				var that = this;
				let param = {
					userid: that.userInfo.userid,
					orgid: that.orgId,
					data: that.condition,
				};
				request.requestLoading(config.getPersonList, param, '正在加载', 
					function(res){
						that.personList = res.data;
						that.comparSelectedList();
					},function(){
						uni.showToast({
							icon: 'none',
							title: '加载失败'
						});
					},function() {
						
					});
			},
			// 比对已选中的列表
			comparSelectedList: function(e) {
				// 循环一下selectedList是否已有选中的
				for(var i = 0 ; i < this.personList.length; i++) {
					let person = this.personList[i];
					for(var j = 0 ; j < this.selectedList.length; j++) {
						var selectedPerson = this.selectedList[j];
						if (selectedPerson.id == person.id) {
							person.selected = true;
							// 替换personList中的元素为选中
							this.personList.splice(i, 1, person);
						}
					}
				}
			},
			// 选择当前项 - 单选
			chooseCurrent: function(person) {
				if(this.mltiple == false && person.isUser == "Y") {// 单选，直接返回
					this.$fire.fire(this.key, person);
					uni.navigateBack({
						delta: this.backLevel
					})
				}
			},
			// 选择当前项 - 多选
			confirmCurrentList: function(e) {
				this.$fire.fire(this.key, this.selectedList);
				uni.navigateBack({
					delta: this.backLevel
				})
			},
			// 多选添加或删除 index为personList中的位置，非selected中的位置
			addOrDeleteCurrent: function(person, index) {
				if (person.selected == true) {
					for(var i = 0 ; i < this.selectedList.length; i++) {
						var model = this.selectedList[i];
						if (model.id == person.id) {
							model.selected = false;
							// 替换personList中的元素为未选中
							this.personList.splice(index, 1, model);
							// 删除selectedList中的元素
							this.selectedList.splice(i, 1);
							return;
						}
					}
				}else {
					person.selected = true;
					person.orgName = this.orgName;
					// 替换personList中的元素为选中
					this.personList.splice(index, 1, person);
					// 添加到selectedList中
					this.selectedList.push(person);
				}
			},
			// 去下级
			gotoNext: function(person) {
				var back = this.backLevel + 1;
				uni.navigateTo({
					url: "../common/personChoose?selected=" + JSON.stringify(this.selectedList) + "&key=" + this.key + "&condition=" + this.condition + "&mltiple=" + this.mltiple + "&orgId=" + person.id + "&orgName=" + person.name + "&back=" + back
				})
			},
			// 查看已选
			editSelected: function(e) {
				let key = "VIEW_SELECTED_PERSON"
				uni.navigateTo({
					url: "selectedPersonPage?selectedList=" + JSON.stringify(this.selectedList) + "&key=" + key
				})
				this.$fire.once(key, resultList=>{
					this.selectedList = resultList;
				});
			},
		}
	}
</script>

<style>
	@import url("../../css/common.css");
	.personScrollView {
		/* width: 100%;
		height: 300upx; */
		width: 100%;
		margin-bottom: 110upx;
	}
	
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
		height: 100%;
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
	
	.bottomView {
		width: 100%;
		height: 110upx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0upx;
		overflow: hidden;
		text-align: center;
		line-height: 110upx;
		color: #FFFFFF;
		font-size: 32upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.hasChoose {
		width: 100%;
		margin-left: 20upx;
		color: #3296FA;
		font-size: 30upx;
		text-align: left;
	}
	
	.confirmButtom {
		background-color: #3296FA;
		width: 300upx;
		margin-top: 5upx;
		margin-bottom: 5upx;
	}
</style>
