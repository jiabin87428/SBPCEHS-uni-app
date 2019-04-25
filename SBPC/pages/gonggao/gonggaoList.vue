<template>
	<view class="baseView">
		<view class="cellInfoView">
			<uni-list>
				<block v-for="(index, item) in ggList" :key="index">
					<uni-list-item :title="item.notesobject" :subnote="item.createtime" :show-arrow="true" @click="getDetail(item)"></uni-list-item>
				</block>
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
				ggList: [],
			}
		},
		onLoad() {
			this.getGgList();
		},
		onNavigationBarButtonTap() {
			
		},
		methods: {
			// 获取公告列表
			getGgList: function(e) {
				var that = this;
				let param = {
					userid: that.userInfo.userid
				}
				request.requestLoading(config.getGgList, param, '正在获取通知公告', 
					function(res){
						that.ggList = res.data;
					},function(){
						uni.showToast({
							icon: 'none',
							title: '获取失败'
						});
					}, function(){
						
					}
				);
			},
			// 获取公告详情
			getDetail: function(item) {
				var that = this;
				let param = {
					userid: that.userInfo.userid,
					recordid: item.recordid
				}
				request.requestLoading(config.getGgDetail, param, '正在获取公告详情', 
					function(res){
						// that.ggList = res.data;
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
	.scrollView {
		width: 100%;
		margin-bottom: 110upx;
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
	.addCheck {
		background-color: #FFFFFF;
		width: 100%;
		height: 80upx;
		padding-top: 20upx;
		padding-bottom: 20upx;
		flex-shrink: 0; /*等比例不压缩*/
	}
</style>
