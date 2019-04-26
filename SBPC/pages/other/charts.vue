<template>
	<view class="qiun-columns">
		<scroll-view scroll-y="true">
			<view class="cellInfoView">
				<uni-list>
					<picker @change="pickerChange('currentType', typeData, $event)" v-bind:range="typeData">
						<uni-list-item title="统计类型" :subnote="currentType" :show-arrow="true"></uni-list-item>
					</picker>
				</uni-list>
			</view>
		</scroll-view>
		
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">{{currentType}}</view>
		</view>
		<view class="qiun-charts">
			<block v-if="currentType == '隐患原因'">
				<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
				<!--#endif-->
				<!--#ifdef MP-WEIXIN || APP-PLUS -->
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts"></canvas>
				<!--#endif-->
			</block>
			<block v-if="currentType == '隐患类型'">
				<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" style="background-color: #E5FDC3;" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
				<!--#endif-->
				<!--#ifdef MP-WEIXIN || APP-PLUS -->
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" style="background-color: #E5FDC3;"></canvas>
				<!--#endif-->
			</block>
		</view>
	</view>
</template>

<script>
	import wxCharts from '@/components/wx-charts/wxcharts.js';
	import service from '../../service.js';
	import config from '../../util/config.js';
	import request from '../../util/request.js';
	import onfire from 'onfire.js';
	import uniList from '@/components/list/uni-list/uni-list.vue'
	import uniIcon from '@/components/list/uni-icon/uni-icon.vue'
	import uniListItem from '@/components/list/uni-list-item/uni-list-item.vue'
	import { 
	    mapState
	} from 'vuex'
	
	var _self;
	var canvaColumn=null;
	var pie = null;
	var Data={
		Column:{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量1',data:[15, 20, 45, 37, 43, 34]},{name: '成交量2',data:[30, 40, 25, 14, 34, 18]}]},
		Pie:{series:[]},
	}
	
	export default {
		computed: mapState(['userInfo']),
		components: {uniList,uniListItem,uniIcon},
		data() {
			return {
				// 统计类型
				typeData: ["隐患原因", "隐患类型"],
				currentType: "隐患原因",
				
				cWidth:'',
				cHeight:'',
				pixelRatio:1
			}
		},
		onLoad() {
			_self = this;
			this.getCharts();
			//#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
		},
		onReady() {
			this.showPie("canvasPie",Data.Pie);
		},
		methods: {
			showPie(canvasId,chartData){
				pie = new wxCharts({
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
				   });
			},
			changeData(){
				//这里只做了柱状图数据动态更新，其他图表同理。
				pie.updateData({
					series: Data.Pie.series
				});
			},
			// 获取统计
			getCharts: function() {
				var that = this;
				let param = {
					userid: that.userInfo.userid
				}
				request.requestLoading(config.getDangerReasonChart, param, '正在获取统计信息', 
					function(res){
						let data = res.data;
						Data.Pie = that.formatData(data);
						// that.changeData();
					},function(){
						uni.showToast({
							icon: 'none',
							title: '获取失败'
						});
					}, function(){
						
					}
				);
			},
			// 格式化数据
			formatData: function(data) {
				var pie = [];
				for(var i=0; i<data.length; i++) {
					let item = data[i];
					let newItem = {
						name: item.name,
						data: parseInt(item.value)
					}
					pie.push(newItem);
				}
				console.log('统计结果：' + JSON.stringify(pie));
				return {"series": pie};
			},
			// 选择位置
			pickerChange: function(id, data, e) {
				this[id] = data[e.target.value];
				this.getCharts();
			},
		}
	}
</script>

<style>
	@import url("../../css/common.css");
page{background:#F2F2F2;}
.qiun-padding{padding:2%; width:96%;}
.qiun-wrap{display:flex; flex-wrap:wrap;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{display:flex; flex-direction:column !important;}
.qiun-common-mt{margin-top:10upx;}
.qiun-bg-white{background:#FFFFFF;}
.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
/* 通用样式 */
.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
/* 横屏样式 */
.qiun-charts-rotate{width: 700upx; height:1100upx;background-color: #FFFFFF;padding: 25upx;}
.charts-rotate{width: 700upx; height:1100upx;background-color: #FFFFFF;}
/* 圆弧进度样式 */
.qiun-charts3{width: 750upx; height:250upx;background-color: #FFFFFF;position:relative;}
.charts3{position: absolute;width: 250upx; height:250upx;background-color: #FFFFFF;}

.qiun-tip {display:block; width:auto; overflow:hidden; padding:15upx; height:30upx; line-height:30upx; margin:10upx; background:#ff9933; font-size:30upx; border-radius:8upx;justify-content:center; text-align:center;border: 1px solid #dc7004;color: #FFFFFF;}
</style>
