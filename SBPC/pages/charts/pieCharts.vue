<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">{{title}}</view>
		</view>
		<view class="qiun-charts">
			<!--#ifdef H5 || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO-->
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN || APP-PLUS -->
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts"></canvas>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
	import wxCharts from '../../components/wx-charts/wxcharts.js';
	import config from '../../util/config.js';
	import service from '../../service.js';
	import request from '../../util/request.js';
	import {
	    mapState
	} from 'vuex'
	var _self;
	var Data={
		Pie:{series:[{ name: '一班', data: 50 }, { name: '二班', data: 30 }, { name: '三班', data: 20 }, { name: '四班', data: 18 }, { name: '五班', data: 8 }]},
		}
	
	export default {
		computed: {
		    ...mapState(['userInfo'])
		},
		components: {},
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				
				// 接口
				url: '',
				// 标题
				title: '',
			}
		},
		onLoad(option) {
			_self = this;
			_self.url = config[option.url];
			_self.title = option.title;
			_self.getCharts();
			
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
				new wxCharts({
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
			// 获取统计
			getCharts: function() {
				var that = this;
				let param = {
					userid: that.userInfo.userid
				}
				request.requestLoading(that.url, param, '正在获取统计信息', 
					function(res){
						let data = res.data;
						Data.Pie = that.formatData(data);
						that.showPie("canvasPie",Data.Pie);
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
				return {"series": pie};
			},
		}
	}
</script>

<style>
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
