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
//   wx.showNavigationBarLoading()
//   if (message != "") {
//     wx.showLoading({
//       title: message,
//     })
//   }
	uni.request({
			url: url, 
			header: {
					// 'Content-Type': 'application/json'
					'Content-type': 'application/x-www-form-urlencoded'
			},
			method: 'GET',
			success: (res) => {
// 					wx.hideNavigationBarLoading()
// 					if (message != "") {
// 					  wx.hideLoading()
// 					}
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
// 上传图片
const uploadImage = function(url, filePaths, successUp, failUp, i, length, successFun, completeFun) {
	uni.uploadFile({
	  url: config.host + url,
	  filePath: filePaths[i],
	  name: 'fileData',
	  formData: {

	  },
	  success: (resp) => {
			successUp++;
			successFun(resp);
	  },
	  fail: (res) => {
			failUp++;
	  },
	  complete: () => {
			i++;
			if (i == length) {
				uni.showToast({
					title: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
					icon: 'none',
					duration: 2000
				})
				if (completeFun != null) {
					completeFun('200');
				}
			}
			else {  //递归调用uploadImage函数
				this.uploadImage(url,filePaths, successUp, failUp, i, length, successFun, completeFun);
			}
	  },
	});
}
export default {
    request,
    requestLoading,
	requestLoadingNew,
	uploadImage
}