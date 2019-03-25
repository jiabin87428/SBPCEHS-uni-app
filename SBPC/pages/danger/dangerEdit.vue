<template>
	<view class="baseView">
		<view class="cellTitleView">
			<text class="cellTitle">基础信息</text>
		</view>
		<view class="cellInfoView">
			<uni-list>
				<uni-list-item title="隐患描述" :note="yhms" show-arrow="true" @click="jumpInput('yhms', '请输入隐患描述', yhms)"></uni-list-item>
				<uni-list-item title="检查人" subnote="obj.zrrmc" show-arrow="true"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/list/uni-list/uni-list.vue'
	import uniIcon from '@/components/list/uni-icon/uni-icon.vue'
	import uniListItem from '@/components/list/uni-list-item/uni-list-item.vue'
	import config from '../../util/config.js';
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
				// 是否可编辑
				editable: true,
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
		}
	}
</script>

<style>
	@import url("../../css/common.css");
</style>
