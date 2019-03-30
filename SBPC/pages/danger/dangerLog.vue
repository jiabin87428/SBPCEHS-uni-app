<template>
	<view class="baseView" id="baseView">
		<view class="cellInfoView">
			<uni-list>
				<block v-for="(logItem,idx) in logList" :key="idx">
					<uni-list-item :title="logItem.nextstatusname + '（接收人：' + logItem.receivername + '，' + '发送者：' + logItem.sendername + '）'" :note="logItem.date" :show-arrow="false"></uni-list-item>
				</block>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/list/uni-list/uni-list.vue'
	import uniIcon from '@/components/list/uni-icon/uni-icon.vue'
	import uniListItem from '@/components/list/uni-list-item/uni-list-item.vue'
	
	export default {
		components: {uniList,uniListItem,uniIcon},
		data() {
			return {
				logList: [],
			}
		},
		onLoad(option) {
			let list = JSON.parse(option.logList);
			this.logList = list;
			console.log(option.logList);
		},
		methods: {
			
		},
	}
</script>

<style>
	@import url("../../css/common.css");
</style>
