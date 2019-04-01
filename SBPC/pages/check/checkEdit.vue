<template>
	<view class="baseView">
		<view class="cellTitleView">
			<text class="cellTitle">基础信息</text>
		</view>
		<view class="cellInfoView">
			<uni-list>
				<picker id="jclx" @change="pickerChange(checkTypes, $event)" v-bind:range="checkTypes" range-key="dictvalue">
					<uni-list-item title="检查类型" :subnote="model.jclx.dictvalue" :show-arrow="true"></uni-list-item>
				</picker>
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
	import photo from '../../util/photoUtil.js';
	
	import {
	    mapState
	} from 'vuex'
	export default {
		computed: mapState(['userInfo']),
		components: {uniList,uniListItem,uniIcon},
		data() {
			return {
				model: {
					jclx: '',
				},
				
				// 页面状态，0-新建 1-编辑
				pageState: 0,
				
				// 数据源
				checkTypes:[],
			}
		},
		onLoad(option) {
			
			if (this.pageState == 0) {
				// 获取检查类型
				this.getCheckTypes();
			}
		},
		onNavigationBarButtonTap() {
			
		},
		onUnload() {
			
		},
		methods: {
			
			// 获取检查类型
			getCheckTypes: function(e) {
				var that = this;
				let param = {
					userid: that.userInfo.userid
				}
				request.requestLoading(config.getCheckTypes, param, '正在获取检查类型', 
					function(res){
						that.checkTypes = res.data;
					},function(){
						uni.showToast({
							icon: 'none',
							title: '获取失败'
						});
					}, function(){
						
					}
				);
			},
			
			/*通用方法相关*/
			pickerChange: function(data, e) {
				this.model[e.target.id] = data[e.target.value];
			},
			
		}
	}
</script>

<style>
	@import url("../../css/common.css");
</style>
