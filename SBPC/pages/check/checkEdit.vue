<template>
	<view class="baseView">
		<scroll-view class="scrollView" scroll-y="true">
			<view class="cellTitleView">
				<text class="cellTitle">基础信息</text>
			</view>
			<view class="cellInfoView">
				<uni-list>
					<picker id="jclx" @change="typePickerChange(checkTypes, $event)" v-bind:range="checkTypes" range-key="dictvalue">
						<uni-list-item title="检查类型" :subnote="model.jclx" :show-arrow="true"></uni-list-item>
					</picker>
					<uni-list-item title="检查人" :subnote="model.llrmc" show-arrow="false"></uni-list-item>
					<picker mode="date" :value="model.jcrq" @change="dateChange('jcrq', $event)">
						<uni-list-item title="检查日期" :subnote="model.jcrq" :show-arrow="true"></uni-list-item>
					</picker>
					<uni-list-item title="检查组成员" :subnote="model.qtcy" :show-arrow="true" @click="jumpPersonChoose"></uni-list-item>
					<picker id="mb" @change="mbChange(selectedModule, $event)" v-bind:range="selectedModule" range-key="mbmc">
						<uni-list-item title="检查模板" :subnote="model.mb" :show-arrow="true"></uni-list-item>
					</picker>
				</uni-list>
			</view>
			
			<block v-if="model.jcjlList.length > 0">
				<view class="cellTitleView">
					<text class="cellTitle">检查内容</text>
					<text class="cellTitle">正常-</text>
					<uni-icon type="checkbox-filled" size="22" color="#24BE41"></uni-icon>
					<text class="cellTitle">未检-</text>
					<uni-icon type="info-filled" size="22" color="#FFDE52"></uni-icon>
					<text class="cellTitle">异常-</text>
					<uni-icon type="clear" size="22" color="#C11E1E"></uni-icon>
				</view>
				<view class="cellInfoView">
					<uni-list>
						<uni-list-item  v-for="(item,index) in model.jcjlList" :key="index" :title="item.jcbz" :note="item.wtms" show-extra-icon="true" :show-arrow="editable" :extra-icon="getIcon(item)" @click="jumpEdit(item, index)"></uni-list-item>
					</uni-list>
				</view>
				<image class="addCheck" mode="aspectFit" src="../../static/assets/addCheck.png" @click="addCheck"></image>
			</block>
		</scroll-view>
		<view class="bottomView">
			<view class="buttonStyle" @click="saveClick">保存</view>
			<view class="buttonStyle" @click="completeClick">完成检查</view>
		</view>
		
		<prompt v-if="promptVisible"
		  title="添加检查内容"
		  placeholder="请输入检查标题"
		  defaultValue=""
		  mainColor="#3296FA"
		  @cancel="clickCancel"
		  @confirm="clickPromptConfirm"
		>
		  <!-- 这里放入slot内容-->
		  <!-- <text>我是slot内容</text> -->
		</prompt>
	</view>
</template>

<script>
	import uniList from '@/components/list/uni-list/uni-list.vue'
	import uniIcon from '@/components/list/uni-icon/uni-icon.vue'
	import uniListItem from '@/components/list/uni-list-item/uni-list-item.vue'
	import prompt from '@/components/prompt/prompt.vue'
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
		components: {uniList,uniListItem,uniIcon,prompt},
		data() {
			return {
				model: {
					recordid: '',	// 主键，有值更新，没值插入
					userid: '',
					jclx: '',
					llrid: '',
					llrmc: '',
					jcrq: '',
					qtcyid: '',
					qtcy: '',
					mb: '',
					jcjlList: [],
				},
				
				// 页面状态，0-新建 1-编辑
				pageState: 0,
				// 选中的模板
				currentModule: null,
				
				// 数据源
				checkTypes:[],
				// 选中的成员对象集合
				selectedPersons: [],
				// 选择的模板内容
				selectedModule: [],
				
				// 是否可编辑
				editable: true,
				
				// 控制弹框输入框显示, 在需要的地方调用this.promptVisible = true
				promptVisible: false,
				// 图标
				normal: {// 正常图标
					color: '#24BE41',
					size: '22',
					type: 'checkbox-filled'
				},
				undetected: {// 未检图标
					color: '#FFDE52',
					size: '22',
					type: 'info-filled'
				},
				abnormal: {// 异常图标
					color: '#C11E1E',
					size: '22',
					type: 'clear'
				},
			}
		},
		onLoad(option) {
			this.model.userid = this.userInfo.userid;
			if (this.pageState == 0) {
				// 获取检查类型
				this.getCheckTypes();
				// 获取检查模板
				this.getCheckModule();
				this.model.llrid = this.userInfo.userid;
				this.model.llrmc = this.userInfo.username;
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
			// 获取检查模板
			getCheckModule: function(e) {
				var that = this;
				let param = {
					userid: that.userInfo.userid
				}
				request.requestLoading(config.getCheckModule, param, '正在获取检查模板', 
					function(res){
						that.selectedModule = res.data;
					},function(){
						uni.showToast({
							icon: 'none',
							title: '获取失败'
						});
					}, function(){
						
					}
				);
			},
			// 保存
			saveClick: function(e) {
				var that = this;
				var param = that.model;
				// param.jcjlList = JSON.stringify(param.jcjlList);	// 复杂对象中的对象数组需要转成jsonString
				request.requestLoading(config.saveCheck, param, '正在保存检查', 
					function(res){
						console.log('' + JSON.stringify(res));
						uni.showToast({
							icon: 'none',
							title: '保存成功'
						});
					},function(){
						uni.showToast({
							icon: 'none',
							title: '保存失败'
						});
					}, function(){
						
					}
				);
			},
			// 完成检查
			completeClick: function(e) {
				
			},
			
			typePickerChange: function(data, e) {// 目前只有检查类型用
				this.model[e.target.id] = data[e.target.value].dictvalue;
				this.model['jclxbm'] = data[e.target.value].dictvalue;
			},
			dateChange: function(key, e) {
				this.model[key] = e.target.value
			},
			// 多选成员
			jumpPersonChoose: function(e) {
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
			// 选择模板
			mbChange: function(data, e) {
				this.currentModule = data[e.target.value]
				this.model[e.target.id] = data[e.target.value].mbmc;
				this.getCheckInfoByMb();
			},
			// 根据模板获取检查项
			getCheckInfoByMb: function() {
				var that = this;
				let param = {
					userid: that.userInfo.userid,
					mbid: that.currentModule.mbid,
				}
				request.requestLoading(config.getCheckInfo, param, '正在获取检查项', 
					function(res){
						that.model.jcjlList = res.data;
					},function(){
						uni.showToast({
							icon: 'none',
							title: '获取失败'
						});
					}, function(){
						
					}
				);
			},
			// 跳转检查项编辑
			jumpEdit: function(item, index) {
				if (this.editable == false) {
					return;
				}
				let key = "INFO_EDIT"
				uni.navigateTo({
					url: 'checkInfoEdit?item=' + JSON.stringify(item) + '&index=' + index + '&key=' + key
				});
				this.$fire.once(key, result=>{
					// 替换personList中的元素为未选中
					this.model.jcjlList.splice(result.index, 1, result.item);
				});
			},
			// 添加自定义检查项
			addCheck: function(e) {
				this.promptVisible = true;
			},
			// 点击弹出输入框确定
			clickPromptConfirm: function(val) {
			  // console.log(val)
			  if (val == "") {
				  uni.showToast({
					icon: 'none',
					title: '请输入检查标题内容'
				  })
				  return;
			  }
			  var newItem = {
				  bzlx: '1',
				  ifwt: '2',
				  jcbz: val,
				  jcbzid: '',
				  wtms: '',
				  zgqk: '',
				  
				  zplist: [],
			  }
			  this.model.jcjlList.push(newItem);
			  // 滚动到底部，效果不好
// 			  uni.pageScrollTo({
// 				scrollTop: 100,
// 				duration: 100
// 			});
			  this.promptVisible = false;
			},
			// 点击弹出输入框取消
			clickCancel: function(e) {
				this.promptVisible = false;
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
			// 获取检查项状态图标
			getIcon(item) {
				if (item.ifwt == '1') {// 正常图标
					return this.normal;
				}else if (item.ifwt == '3') {// 异常图标
					return this.abnormal;
				}else {// 未检图标
					return this.undetected;
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
