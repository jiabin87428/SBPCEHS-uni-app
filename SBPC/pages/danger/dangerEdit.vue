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
			</uni-list>
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
			}
		}
	}
</script>

<style>
	@import url("../../css/common.css");
</style>
