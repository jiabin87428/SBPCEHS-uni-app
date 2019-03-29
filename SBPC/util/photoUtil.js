const config = require('./config');
const request = require('./request');

/*
 * complete：	添加成功函数
 */
const addPhoto = function(complete) {
	var photoList = [];
	uni.chooseImage({
		count: 9, //默认9
		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album', 'camera'], //从相册选择
		success: function (res) {
			for (var i=0;i<res.tempFilePaths.length;i++) {
				var imgObj = {//	type：1为新增需要上传，2为加载的，不需要上传
					fileid: '',
					src: res.tempFilePaths[i],
					type: 1
				}
				photoList.push(imgObj);
			}
			complete(photoList);
		}
	});
}

/*
 * imgList：		需要处理的图片集合
 * imgObj：		图片对象
 * index：		图片在集合的位置
 * complete：	删除成功函数
 */
const deletePhoto = function(imgList, imgObj, index, complete) {
	if (imgObj.src.startsWith('http:')) {// 网络图片
		let param = {
			from: 'jc',
			yyid: '',
			fileid: imgObj.fileid,
			userid: ''
		};
		request.requestLoading(config.deleteImage, param, '正在删除图片', 
			function(res){
				imgList.splice(index,1);
				complete(imgList);
			},function(){
				uni.showToast({
					icon: 'none',
					title: '删除失败'
				});
			}, function(){
				
			}
		);
	}else {// 刚选择好，还未上传，非网络图片
		imgList.splice(index,1);
		complete(imgList);
	}
}

/*
 * imgList：		图片集合
 */
const viewPhoto = function(imgList) {
	var photoList = []
	for (var i=0 ; i<imgList.length; i++) {
		let item = imgList[i]
		photoList.push(item.src);
	}
	// 预览图片
	uni.previewImage({
		urls: photoList
	});
}

/*
 * userid：			用户id
 * zpsgrecordid：	对应的隐患id
 * attachtype：		不同阶段的照片：fxwt-新建隐患，zzwt-整改阶段，yzwt-验证阶段
 * complete:		上传完成函数
 */
const uploadPhoto = function(userid, zpsgrecordid, attachtype, photoList, complete) {
	var that = this;
	// 上传照片，需要分两种情况，如是从后台加载的，不需要调用上传接口，如果是本地读取还未上传的，需要调上传接口
	let url = config.uploadImage + '?userid=' + userid + '&zpsgrecordid=' + zpsgrecordid + '&attachtype=' + attachtype;
	var imgList = []
	for (var i=0 ; i<photoList.length; i++) {
		let item = photoList[i]
		if (item.type == 1 && !item.src.startsWith('http:')) {
			imgList.push(item.src);
		}
	}
	
	if(imgList.length == 0) {
		complete();
		return;
	}
	uni.showLoading({
		title: '正在上传图片'
	})
	console.log('' + JSON.stringify(request));
	uploadImage(url, imgList, 0, 0, 0, imgList.length, function (res) {
// 		let data = JSON.parse(res.data);
// 		let fj = data.fj;
// 		that.fj = fj;
	}, function(result){
		uni.hideLoading();
		if (result == '200') {
			uni.showToast({
			  title: '上传成功',
			})
			complete();
		}
	});
}

// 上传图片
const uploadImage = function(url, filePaths, successUp, failUp, i, length, successFun, completeFun) {
	console.log('url:' + url);
	console.log('filePaths:' + JSON.stringify(filePaths));
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
    addPhoto,
	deletePhoto,
	viewPhoto,
	uploadPhoto
}