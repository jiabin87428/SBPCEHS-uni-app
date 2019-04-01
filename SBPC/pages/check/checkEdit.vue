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
				<uni-list-item title="检查人" :note="model.jcr" show-arrow="false"></uni-list-item>
				<picker mode="date" :value="model.jcrq" @change="dateChange('jcrq', $event)">
					<uni-list-item title="检查日期" :subnote="model.jcrq" :show-arrow="true"></uni-list-item>
				</picker>
				<uni-list-item title="检查组成员" :subnote="model.qtcy" :show-arrow="true" @click="jumpPersonChoose('zrbm', 1)"></uni-list-item>
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
					llrid: '',
					llrmc: '',
					jcrq: '',
					qtcyid: '',
					qtcy: '',
				},
				
				// 页面状态，0-新建 1-编辑
				pageState: 0,
				
				// 数据源
				checkTypes:[],
				selectedPersons: [],
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
			dateChange: function(key, e, editableState) {
				if(this.pageState != editableState) {
					return
				}
				this.model[key] = e.target.value
			},
			jumpPersonChoose: function() {
				var that = this;
				let key = "CHECK_PERSONS"
				uni.navigateTo({
					url: "../common/personChoose?key=" + key + "&mltiple=true" + "&selected=" + JSON.stringify(this.selectedPersons)
				})
				that.$fire.once(key, personList=>{
					that.selectedPersons = personList;
					that.formatPersons();
				});
			},
			// 格式化检查组成员，变成接口需要的用；隔开的字符串
			formatPersons: function() {
				var qtcyid = "";
				var qtcy = "";
				for(var i = 0 ; i < this.selectedPersons.length; i++) {
					let person = this.selectedPersons[i];
					qtcyid = person.id + ";" + qtcyid;
					qtcy = person.name + ";" + qtcy;
				}
				this.model.qtcy = qtcy;
				this.model.qtcyid = qtcyid;
			},
		}
	}
</script>

<style>
	@import url("../../css/common.css");
</style>
