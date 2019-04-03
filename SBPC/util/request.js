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
	// params = formatParam(params);
	console.log('request.js :' + config.host + url);
	uni.request({
			url: config.host + url, 
			data: params,
			header: {
					// 'Content-Type': 'application/json;charset=utf-8'
					'Content-type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			success: (res) => {
// 					wx.hideNavigationBarLoading()
					console.log("请求成功");
					if (message != "") {
						console.log("成功后隐藏Loading");
						uni.hideLoading()
					}

// 				uni.showToast({
// 					icon: 'none',
// 					title: res.data.repMsg
// 				});
				if (res.data.repCode == '200') {
					console.log("200");
					success(res.data)
				} else {
					fail()
				}
			},
			fail:(res) => {
				if (message != "") {
					console.log("失败后隐藏Loading");
					uni.hideLoading()  
				}
				fail()
			},
			complete:() => {
				if (message != "") {
					console.log("完成后隐藏Loading");
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

// 复杂对象中的对象数组需要转成jsonString
const formatParam = function(param) {
	console.log("formatParam");
	// console.log(Object.keys(param));
	Object.keys(param).forEach(function(key){
		 // console.log(key,param[key]);
		 if (typeof param[key] == "object") {
			 param[key] = JSON.stringify(param[key]);
		 }
	});
	console.log(JSON.stringify(param));
	return param;
}

export default {
    request,
    requestLoading,
	requestLoadingNew
}