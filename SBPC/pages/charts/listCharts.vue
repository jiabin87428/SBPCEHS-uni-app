<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">{{title}}</view>
		</view>
		<view class="qiun-charts">
			<uni-list>
				<block v-for="(item, index) in datas" :key="index">
					<uni-list-item :title="item.name" :subnote="item.value + '%'" :show-arrow="false"></uni-list-item>
				</block>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import config from '../../util/config.js';
	import service from '../../service.js';
	import request from '../../util/request.js';
	import uniList from '@/components/list/uni-list/uni-list.vue'
	import uniIcon from '@/components/list/uni-icon/uni-icon.vue'
	import uniListItem from '@/components/list/uni-list-item/uni-list-item.vue'
	import {
	    mapState
	} from 'vuex'
	
	export default {
		computed: {
		    ...mapState(['userInfo'])
		},
		components: {uniList,uniListItem,uniIcon},
		data() {
			return {		
				// 接口
				url: '',
				// 标题
				title: '',
				// 数据源
				datas: [],
			}
		},
		onLoad(option) {
			this.url = config[option.url];
			this.title = option.title;
			this.getCharts();
		},
		onReady() {
			
		},
		methods: {
			// 获取统计
			getCharts: function() {
				var that = this;
				let param = {
					userid: that.userInfo.userid
				}
				request.requestLoading(that.url, param, '正在获取统计信息', 
					function(res){
						that.datas = res.data;
					},function(){
						uni.showToast({
							icon: 'none',
							title: '获取失败'
						});
					}, function(){
						
					}
				);
			},
		}
	}
</script>

<style>
	@import url("../../css/common.css");
	.qiun-padding{padding:2%; width:96%;}
	.qiun-wrap{display:flex; flex-wrap:wrap;}
	.qiun-rows{display:flex; flex-direction:row !important;}
	.qiun-columns{display:flex; flex-direction:column !important;}
	.qiun-common-mt{margin-top:10upx;}
	.qiun-bg-white{background:#FFFFFF;}
	.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
	.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
	/* 通用样式 */
	.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
	.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
</style>
