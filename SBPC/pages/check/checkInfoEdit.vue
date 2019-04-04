<template>
	<view class="baseView">
		<view class="cellTitleView">
			<text class="cellTitle">{{item.jcbz}}</text>
		</view>
		<view class="cellInfoView">
			<uni-list>
				<picker id="ifwt" @change="resultPickerChange(typeArray, $event)" v-bind:range="typeArray">
					<uni-list-item title="检查结论" :subnote="typeArray[parseInt(item.ifwt)-1]" :show-arrow="true"></uni-list-item>
				</picker>
				<uni-list-item id="wtms" title="问题描述" :note="item.wtms" :show-arrow="true" @click="jumpInput('wtms', '请输入问题描述', item.wtms)" v-if="item.ifwt != '1'"></uni-list-item>
				<picker id="zgqk" @change="pickerChange(rectifyTypes, $event)" v-bind:range="rectifyTypes" v-if="item.ifwt != '1'">
					<uni-list-item title="检查方式" :subnote="rectifyTypes[parseInt(item.zgqk)-1]" :show-arrow="true"></uni-list-item>
				</picker>
			</uni-list>
			<view class='cellImageBaseView' v-if="item.ifwt != '1'"> 
				<view class='cellImageTitleView'>
				  <text class='leftTextRow'>检查照片</text>
				  <text class='rightTextRow'>{{item.zplist.length}}</text>
				</view>
				<view id='imageView' class='imageView'>
				  <block v-for="(imgObj,idx) in item.zplist" :key="idx">
					<view class="littleImageView" v-bind:style="{width:littleImageWidth + 'px', height:littleImageWidth + 'px'}">
					  <image class="littleImage" @click="viewPhoto('zplist')" :id="idx" :src="imgObj.src" mode="aspectFit"></image>
					  <image class='littleImageDelete' src='../../static/assets/delete.png' @click="deleteImage('zplist', imgObj, idx)" :id='idx' mode="aspectFit"></image>
					</view>
				  </block>
				  <view class="littleImageView" @click="addPhoto('zplist')" v-bind:style="{width:littleImageWidth + 'px', height: littleImageWidth + 'px'}">
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
	import photo from '../../util/photoUtil.js';
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
		        item: {
					zplist: [],
				},		// subList中的对象
				itemIndex: 0,	// subList中的第几个数据，用于确定后替换原数据
				
				// 上传照片相关
				imageViewHeight: 100,
				littleImageWidth: 0,
		    }
		},
		onLoad(option) {
			var that = this;
			that.key = option.key;
			// that.item = JSON.parse(option.item);
			that.itemIndex = JSON.parse(option.index);
			that.littleImageWidth = (uni.getSystemInfoSync().windowWidth -50) / 4;
			
			uni.getStorage({
				key: "LOCAL_ITEM",
				success: function (res) {
					that.item = res.data
				}
			});
			
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
				this.item[e.target.id] = parseInt(e.target.value) + 1;
			},
			jumpInput: function(key, placeholder, text) {
				uni.navigateTo({
					url: "../common/inputPage?key=" + key + "&placeholder=" + placeholder + "&text=" + text
				})
				this.$fire.once(key, result=>{
					this.item[key] = result
				});
			},
			
			// 检查结论选择
			resultPickerChange: function(data, e) {
				if (e.target.value == '0' && (this.item.wtms != '' || this.item.zgqk != '' || this.item.zplist.length > 0)) {
					uni.showModal({
					    content: '选择[正常]将要清除问题描述、检查方式、检查照片，是否确认？',
					    success: (res) => {
					        if (res.confirm) {
					            this.item.wtms = "";
								this.item.zgqk = "";
								this.item.zplist = [];
								this.item[e.target.id] = parseInt(e.target.value) + 1;
					        }else {
								return;
							}
					    }
					})
				}else {
					this.item[e.target.id] = parseInt(e.target.value) + 1;
				}
			},
			saveItem() {
				var that = this;
				var result = {
					item: that.item,
					index: that.itemIndex
				}
				that.$fire.fire(that.key, result);
				uni.navigateBack()
			},
			
			// 添加照片
			addPhoto(imgListName) {
				var that = this;
				photo.addPhoto(function(photoList) {
					that.item[imgListName] = that.item[imgListName].concat(photoList);
				});
			},
			// 删除照片，需要分两种情况，如是从后台加载的，那需要调用删除接口，如果是直接本地读取还未上传的，不需要调删除接口
			deleteImage(imgListName, imgObj, index) {
				var that = this;
				photo.deletePhoto(that.item[imgListName], imgObj, index, function(photoList){
					that.item[imgListName] = photoList;
				});
			},
			// 浏览照片
			viewPhoto(imgListName) {
				photo.viewPhoto(this.item[imgListName])
			},
		}
	}
</script>

<style>
	@import url("../../css/common.css");
</style>
