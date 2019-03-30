// config.js
/**
  * 接口配置文件
  * 登录名和密码: root GelureM1
  * 
  */
var host = "http://112.124.14.5/sbpc"  //域名要在小程序的管理平台配置好，如果出现调用时报错，无效的域名，可在微信开发工具左边点项目-》配置信息-》看一下配置的域名【request合法域名】有没有刷新下来，没有的话就点下面的刷新

 
var config = {

	// 下面的地址配合 Server 工作
	host,
	// 登录
	login: '/mobile/system/login.do',

	// 获取隐患列表
	getDangerList: '/mobile/getYhzg.do',
	// 获取隐患详情
	getDangerDetail: '/mobile/getYhzg.do?action=getOneYh',
	// 添加隐患
	addDanger: '/mobile/getYhzg.do?action=insertYh',
	// 隐患流转
	flowDanger: '/mobile/getYhzg.do?action=flowYh',
	// 选择完流转目标后继续流转
	flowDangerAfterChooseTarget: '/mobile/getYhzg.do?action=flowSelectUserYh',
	
	// 获取部门
	getOrgList: '/mobile/getUser.do?action=getOrgList ',
	// 获取人员
	getPersonList: '/mobile/getUser.do?action=getUserList ',
	
	// 上传照片
	uploadImage: '/uploadImg',
	// 加载照片
	loadImage: '/mobile/getYhzg.do?action=loadYhPhoto',
	
};
//对外把对象config返回
module.exports = config