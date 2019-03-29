const config = require('./config')
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
const requestLoading = function(url, params, message, success, fail, complete) {
// 	wx.showNavigationBarLoading()
	if (message != "") {
	  uni.showLoading({
	  	title: message,
	  });
	}
	console.log('request.js :' + url);
	uni.request({
			url: config.host + url, 
			data: params,
			header: {
					// 'Content-Type': 'application/json'
					'Content-type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			success: (res) => {
// 					wx.hideNavigationBarLoading()
					if (message != "") {
					  uni.hideLoading()
					}

// 				uni.showToast({
// 					icon: 'none',
// 					title: res.data.repMsg
// 				});
				if (res.data.repCode == '200') {
					success(res.data)
				} else {
					fail()
				}
			},
			fail:(res) => {
				if (message != "") {
				  uni.hideLoading()  
				}
				fail()
			},
			complete:() => {
				if (message != "") {
				  uni.hideLoading()
				}
				complete()
			}
	});
}



// 展示进度条的网络请求(新版)
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息 
// success:成功的回调函数
// fail：失败的回调
const requestLoadingNew = function(url, params, message, success, fail, complete) {
	if (message != "") {
	  uni.showLoading({
	  	title: message,
	  });
	}
	uni.request({
		url: config.host + url, 
		data: params,
		header: {
			'Content-type': 'application/x-www-form-urlencoded'
		},
		method: 'POST',
		success: (res) => {
			uni.hideLoading();
			if(res.statusCode=='200'){
				success(res.data); 
			}else{
				fail();
			}
		},
		fail:(res) => {
			uni.hideLoading();
			fail();
		},
		complete:() => {
			uni.hideLoading();
			complete();
		}
	});
}


const request = function(url, message, success, fail) {
	uni.request({
			url: url, 
			header: {
					// 'Content-Type': 'application/json'
					'Content-type': 'application/x-www-form-urlencoded'
			},
			method: 'GET',
			success: (res) => {
					if (res.success == 'true') {
						success(res.data)
					} else {
						fail()
					}
			},
			fail(res) {
				fail()
			}
	});
}
export default {
    request,
    requestLoading,
	requestLoadingNew
}