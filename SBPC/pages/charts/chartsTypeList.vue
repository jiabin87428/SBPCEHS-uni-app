<template>
	<view class="baseView">
		<uni-list>
			<uni-list-item title="隐患原因" :show-arrow="true" @click="jumpPage('pieCharts?url=getDangerReasonChart&title=隐患原因')"></uni-list-item>
			<uni-list-item title="隐患类型" :show-arrow="true" @click="jumpPage('listCharts?url=getDangerTypeChart&title=隐患类型')"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import config from '../../util/config.js';
	import uniList from '@/components/list/uni-list/uni-list.vue'
	import uniIcon from '@/components/list/uni-icon/uni-icon.vue'
	import uniListItem from '@/components/list/uni-list-item/uni-list-item.vue'
	import { 
	    mapState
	} from 'vuex'
	
	export default {
		computed: mapState(['userInfo']),
		components: {uniList,uniListItem,uniIcon},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		onReady() {
			
		},
		methods: {
			jumpPage: function(url) {
				console.log('URL:' + url)
				if (url == '') {
					uni.showToast({
						icon: 'none',
						title: '敬请期待～',
					})
					return;
				}else {
					uni.navigateTo({
						url: url
					});
				}
			},
		}
	}
</script>

<style>
	@import url("../../css/common.css");
</style>
