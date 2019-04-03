<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">域名：</text>
                <m-input type="text" focus clearable v-model="host" placeholder="请输入域名"></m-input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="testConnect">确认地址</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';
	import config from '../../util/config.js';
	import request from '../../util/request.js';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                host: '',
            }
        },
		onLoad() {
			this.host = config.host;
		},
        methods: {
            testConnect() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '请确认地址输入正确\n' + that.host,
					success: function (res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							config.host = that.host;
							uni.setStorage({
									key: "LOCAL_URL",
									data: that.host,
									success: function () {
										console.log('自定义域缓存成功');
										uni.navigateBack({
											delta: 1
										});
									}
							});
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
				
//                 request.requestLoading(that.host, {}, "正在测试连接", function(res){
// 					config.host = that.host;
// 					uni.setStorage({
// 							key: "LOCAL_URL",
// 							data: that.host,
// 							success: function () {
// 									console.log('自定义域缓存成功');
// 							}
// 					});
// 					uni.showToast({
// 					    title: '连接成功',
// 						duration: 1000,
// 						complete() {
// 							uni.navigateBack({
// 							    delta: 1
// 							});
// 						}
// 					});
// 				}, function(){
// 					uni.showToast({
// 						icon: 'none',
// 					    title: '连接失败'
// 					});
// 				}, function(){
// 					uni.showToast({
// 						icon: 'none',
// 					    title: '连接失败'
// 					});
// 				});
            }
        }
    }
</script>

<style>

</style>
