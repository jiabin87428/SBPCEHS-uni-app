<template>
	<view>
		<view class="fixedit" :style="{top:top}">
			<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
				<view v-for="(cate, index) in categories" :key="index" :data-cateid="cate.cateid" :data-index="index" :class="[cateCurrentIndex == index ? 'grace-tab-current' : '']" @tap="tabChange">{{cate.name}}</view>
			</scroll-view>
		</view>
		<view style="height:50px;"></view>
		<!-- 文章内容区 -->
		<view class="grace-news-list" style="width:94%; padding:5px 3%;">
			<block v-for="(item, index) in artList" :key="index">
				<!-- 一张图 -->
				<navigator url="../article-info/article-info" v-if="item.imgs.length < 3" open-type="navigate">
					<view class="grace-news-list-img-news">
						<view class="grace-news-list-title-main">{{item.title}}</view>
						<view class="grace-news-list-img-big"><image :src="item.imgs[0]" mode="widthFix"></image></view>
					</view>
				</navigator>
				<!-- 三张图 -->
				<navigator url="../article-info/article-info" v-if="item.imgs.length >= 3">
					<view class="grace-news-list-img-news">
						<view class="grace-news-list-title-main">{{item.title}}</view>
						<view class="grace-news-list-imgs">
							<image :src="item.imgs[0]" mode="widthFix"></image>
							<image :src="item.imgs[1]" mode="widthFix"></image>
							<image :src="item.imgs[2]" mode="widthFix"></image>
						</view>
					</view>
				</navigator>
			</block>
		</view>
	</view>
</template>
<script>
var page = 1, cate = 0;
export default{
	data() {
		return {
			top : 0,
			//分类信息
			categories : [
				{cateid : 0, name : "全部"},
				{cateid : 1, name : "风景"},
				{cateid : 2, name : "游记"},
				{cateid : 3, name : "世界"},
				{cateid : 4, name : "其他"},
			],
			// 当前选择的分类
			cateCurrentIndex : 0,
			// 演示文章数据
			artList : []
		};
	},
	onLoad:function(){
		// #ifdef H5
		this.top = '44px';
		// #endif
		page = 1;
		artList : [];
		this.getNewsList();
	},
	//下拉刷新
	onPullDownRefresh : function(){
		// 重置分页及数据
		page = 1;
		this.artList = [];
		this.getNewsList();
	},
	// 加载更多
	onReachBottom : function(){
		this.getNewsList();
	},
	methods:{
		// 数据和分页是模拟的，实际也是这样写
		getNewsList: function(){
			uni.showLoading({});
			// 假设已经到底，实际根据api接口返回值判断
			if(page >= 3){
				uni.showToast({"title":"已经加载全部", icon:"none"});
				return ;
			}
			uni.request({
				url: 'https://www.easy-mock.com/mock/5bb833775df5622d84ac87ca/example/imgnewlist?page='+page+'#!method=get&cate='+cate,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					var newsList = res.data.data;
					this.artList = this.artList.concat(newsList);
					uni.hideLoading();
					page++;
				},
				complete: res => {
					uni.hideLoading();
					uni.stopPullDownRefresh();
				}
			});
		},
		tabChange : function(e){
			// 选中的索引
			var index  = e.currentTarget.dataset.index;
			// 具体的分类id
			var cateid = e.currentTarget.dataset.cateid;
			this.cateCurrentIndex = index;
			// 动态替换内容
			this.content = this.categories[index].name;
			
			// 读取分类数据
			cate = cateid; //把分类信息发送给api接口即可读取对应分类的数据
			// 重置分页及数据 
			page = 1;
			this.artList = [];
			// 加载对应分类数据覆盖上一个分类的展示数据 加载更多是继续使用这个分类
			this.getNewsList();
		}
	}
}
</script>
<style>
/* 分段器头部 fixed 定位 */
.fixedit{width:100%; position:fixed; z-index:99; left:0; top:0;}
.grace-news-list-imgs{max-height:68px; overflow:hidden;}
</style>