import service from '../service.js'
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
	// 将参数克隆一份，不影响传过来的参数，不然转jsonString会影响UI显示，界面可能会卡住
	var copyParam = service.copyObj(params);
	// 格式化参数，Form表单形式，需要将type为对象的值转为jsonString
	copyParam = formatParam(copyParam);
	console.log('request.js :' + config.host + url);
	uni.request({
			url: config.host + url, 
			data: copyParam,
			header: {
					// 'Content-Type': 'application/json;charset=utf-8'
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
					console.log("200");
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

// 复杂对象中的对象数组需要转成jsonString
const formatParam = function(param) {
	console.log("formatParam");
	// console.log(Object.keys(param));
	Object.keys(param).forEach(function(key){
		 if (typeof param[key] == "object") {
			 param[key] = JSON.stringify(param[key]);
		 }
	});
	return param;
}

export default {
    request,
    requestLoading,
	requestLoadingNew
}