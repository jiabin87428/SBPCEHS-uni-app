<template>
	<view class="baseView">
		<view class="cellInfoView">
			<uni-list>
				<block v-for="(item, index) in ggList" :key="index">
					<uni-list-item :title="item.title" :subnote="item.datetime" :note="item.source" :show-arrow="false"></uni-list-item>
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
				request.requestLoading(config.getPointList, param, '正在获取排名', 
					function(res){
						that.formatData(res.data);
					},function(){
						uni.showToast({
							icon: 'none',
							title: '获取失败'
						});
					}, function(){
						
					}
				);
			},
			// 格式化接口数据，让数据变成组件需要的内容
			formatData(list){
				this.ggList = []
				for(var i = 0; i < list.length; i++){					
					var obj = {};
					var item = list[i];
					obj['title'] = item.username;
					obj['source'] = item.bm;
					obj['datetime'] = item.jf + '分';
					obj['instanceid'] = item.instanceid;
					obj['recordid'] = item.recordid;
					obj['article_type'] = 0;
					obj['comment_count'] = '';
					obj['src'] = item.src;
					this.ggList.push(obj);
				}
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
