// config.js
/**
  * 接口配置文件
  * 
  * 
  */
var host = "http://112.124.14.5/sbpc"  //域名要在小程序的管理平台配置好，如果出现调用时报错，无效的域名，可在微信开发工具左边点项目-》配置信息-》看一下配置的域名【request合法域名】有没有刷新下来，没有的话就点下面的刷新

 
var config = {

	// 下面的地址配合 Server 工作
	host,
	// 登录
	login: '/mobile/system/login.do',

	// 点位检查扫码接口
	scan: '/mobile/dwsm.do',

	// 扫码新增检查
	UpdatePoint: '/mobile/updateJcjl.do',

	// 获取Tab页上的数量
	getTabCounts: '/mobile/getTabCount.do',

	// 获取检查详情
	getPointDetail: '/mobile/getJcjl.do',

	// 首页统计
	getMainPageCount: '/mobile/getSytj.do',
	
	// 报警设备类型统计
	alertDeviceCount: '/mobile/bjsblx.do',

	// 报警事件类型统计
	alertEventCount: '/mobile/bjsjlx.do',

	// 阀组压力统计
	alertValveCount: '/mobile/ylfz.do',
	// 阀组压力统计 - 根据楼层获取阀组编号
	getValveDataByFloor: '/mobile/getfz.do',
	
	// 上传图片
	uploadImage: '/uploadImg',
	
	// 加载图片
	loadImage: '/mobile/loadYhzp.do?fileid=',
	
	// 删除图片
	deleteImage: '/mobile/delZp.do',
	
	// ------隐患相关-------
	// 添加隐患并发起流程
	addYhzgToFlow: '/mobile/addYhzgToFlow.do',
	//获取隐患审批数据
	getYhzgListByType:'/mobile/getYhzgListByType.do',
	//获取隐患整改数目
	getYhzgTabCounts:'/mobile/getYhzgTabCounts.do',
	//获取隐患整改详情信息
	getYhzgDetail:'/mobile/getYhzgDetail.do',
	//隐患整改流程流转
	updateAndSendFlowForMobile:'/mobile/updateAndSendFlowForMobile.do',
	//查看流程图
	showFlowPic:'/mobile/showFlowPic.do',
	//根据用户id查询当前用户所在部门
	getUserDeptName:'/mobile/getUserDeptName.do',
	//获取流转日志的接口
	getActNodeInsts:'/mobile/getActNodeInsts.do',
	//获取审批记录的接口
	listForInst:'/mobile/listForInst.do',
	//获取预警指数统计结果的接口
	getYjzsStatics:'/mobile/getYjzsStatics.do',
	
	//----------作业相关-----------------------
	//安全措施选择器页面跳转
	choiceICON:'/mobile/choiceICON.do',
	//保存作业
	savePTW:'/mobile/savePTW.do',
	//保存作业并发起工作流
	savePTWFlow:'/mobile/savePTWFlow.do',
	
	//根据图标id获取考虑因素
	getConsiderByIcon: '/mobile/loadklysForVue.do',
	//根据考虑因素id获取危害
	getHarmByConsi: '/mobile/loadwhForVue.do',
	//根据危害id获取参考措施
	getSolutionsByHarmId: '/mobile/loadckcsForVue.do',
	//根据作业主键id获取已选参考措施
	getSelectedSolutionById: '/mobile/loadIconAndAqcsForVue.do',
	//添加参考措施
	addSolution: '/mobile/addIconAndAqcsForVue.do',
	//删除已选措施
	deleteSelectedSolution: '/mobile/delIconAndAqcsForVue.do',
	
};
//对外把对象config返回
module.exports = config