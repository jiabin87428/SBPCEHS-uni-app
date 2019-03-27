const config = require('./config');
const request = require('./request')

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

export default {
    addPhoto,
	deletePhoto,
	viewPhoto
}