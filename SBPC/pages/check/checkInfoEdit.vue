<template>
	<view class="baseView">
		<view class="cellTitleView">
			<text class="cellTitle">{{item.jcbz}}</text>
		</view>
		<view class="cellInfoView">
			<uni-list>
				<picker id="ifwt" @change="pickerChange(typeArray, $event)" v-bind:range="typeArray">
					<uni-list-item title="检查结论" :subnote="item.ifwt" :show-arrow="true"></uni-list-item>
				</picker>
				<uni-list-item id="wtms" title="问题描述" :note="item.wtms" :show-arrow="true" @click="jumpInput('wtms', '请输入问题描述', item.wtms)"></uni-list-item>
				<picker id="zgqk" @change="pickerChange(rectifyTypes, $event)" v-bind:range="rectifyTypes">
					<uni-list-item title="检查方式" :subnote="item.zgqk" :show-arrow="true"></uni-list-item>
				</picker>
			</uni-list>
			<view class='cellImageBaseView' v-if="item.id != ''"> 
				<view class='cellImageTitleView'>
				  <text class='leftTextRow'>检查照片</text>
				  <text class='rightTextRow'>{{imageList.length}}</text>
				</view>
				<view id='imageView' class='imageView'>
				  <block v-for="(imgObj,idx) in imageList" :key="idx">
					<view class="littleImageView" v-bind:style="{width:littleImageWidth + 'px', height:littleImageWidth + 'px'}">
					  <image class="littleImage" @click="viewPhoto" :id="idx" :src="imgObj.src" mode="aspectFit"></image>
					  <image class='littleImageDelete' src='../../static/assets/delete.png' @click="deleteImage(imgObj,idx)" :id='idx' mode="aspectFit"></image>
					</view>
				  </block>
				  <view class="littleImageView" @click='addPhoto' v-bind:style="{width:littleImageWidth + 'px', height: littleImageWidth + 'px'}">
					<image class="littleImage" src="../../static/assets/addImage.png"></image>
				  </view>
				</view>
			</view>
		</view>
		<view class="btn-row">
		    <button type="primary" class="primary" @tap="saveItem">确定</button>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/list/uni-list/uni-list.vue'
	import uniListItem from '@/components/list/uni-list-item/uni-list-item.vue'
	import config from '../../util/config.js';
	import request from '../../util/request.js';
	import {
	    mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: mapState(['inputPageText', 'key', 'userInfo']),
		components: {uniList,uniListItem},
		data() {
		    return {
				// 返回赋值的Key
				key: '',
				
				typeArray: ['正常', '未检', '异常'],
				rectifyTypes: ['立即整改', '整改通知', '整改中'],
		        item: '',		// subList中的对象
				itemIndex: 0,	// subList中的第几个数据，用于确定后替换原数据
				
				// 上传照片相关
				imageViewHeight: 100,
				imageList: [],
				littleImageWidth: 0,
		    }
		},
		onLoad(option) {
			this.key = option.key;
			this.item = JSON.parse(option.item);
			this.itemIndex = JSON.parse(option.index);
			this.littleImageWidth = (uni.getSystemInfoSync().windowWidth -50) / 4;
			
// 			if(this.item.fj == null) {
// 				return;
// 			}
// 			if (this.item.fj != "") {
// 				console.log('FJ:' + this.item.fj);
// 				let imgList = JSON.parse(this.item.fj);
// 				for(var i=0; i<imgList.length; i++) {
// 					let imgObj = imgList[i];
// 					let imgUrl = config.host + config.loadImage + imgObj.fileId + "&userid=" + this.userInfo.userid;
// 					let imgItem = {
// 						fileid: imgObj.fileId,
// 						src: imgUrl,
// 						type: 2
// 					}
// 					this.imageList.push(imgItem);
// 				}
// 			}
		},
		onShow() {
			
		},
		methods:{
			...mapMutations(['setSublistItem']),
			/*通用方法相关*/
			pickerChange: function(data, e) {
				this.item[e.target.id] = data[e.target.value];
			},
			jumpInput: function(key, placeholder, text) {
				uni.navigateTo({
					url: "../common/inputPage?key=" + key + "&placeholder=" + placeholder + "&text=" + text
				})
				this.$fire.once(key, result=>{
					this.item[key] = result
				});
			},
			
			saveItem() {
				var that = this;
				var result = {
					item: that.item,
					index: that.itemIndex
				}
				that.$fire.fire(that.key, result);
				uni.navigateBack()
				
				// 上传照片，需要分两种情况，如是从后台加载的，不需要调用上传接口，如果是本地读取还未上传的，需要调上传接口
// 				let url = config.uploadImage + '?from=jc&yyid=' + that.item.id + '&userid=' + that.userInfo.userid
// 				var imgList = []
// 				for (var i=0 ; i<that.imageList.length; i++) {
// 					let item = that.imageList[i]
// 					if (item.type == 1 && !item.src.startsWith('http:')) {
// 						imgList.push(item.src);
// 					}
// 				}
// 				
// 				if(imgList.length == 0) {
// 					that.saveLocalItem();
// 					uni.navigateBack({
// 						delta: 1
// 					})
// 					return;
// 				}
// 				uni.showLoading({
// 					title: '正在上传图片'
// 				})
// 				request.uploadImage(url, imgList, 0, 0, 0, imgList.length, function (res) {
// 					let data = JSON.parse(res.data);
// 					let fj = data.fj;
// 					that.item.fj = fj;
// 					console.log('Item:',JSON.stringify(that.item));
// 				}, function(result){
// 					uni.hideLoading();
// 					if (result == '200') {
// 						that.saveLocalItem();
// 						uni.showToast({
// 						  title: '上传成功',
// 						  complete: setTimeout(function () {
// 							uni.navigateBack({
// 								delta: 1
// 							})
// 						  }, 1500)
// 						})
// 					}
// 				});
			},
			
		}
	}
</script>

<style>
	@import url("../../css/common.css");
</style>
