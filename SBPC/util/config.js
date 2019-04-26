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
	// 获取公告列表
	getGgList: '/mobile/getOther.do?action=getTzList',
	// 获取公告详情
	getGgDetail: '/mobile/getOther.do?action=getOneTz',
	// 获取新闻列表
	getNewsList: '/mobile/getOther.do?action=getXwList',
	// 获取积分排名
	getPointList: '/mobile/getOther.do?action=getJfpmList',
	// 获取积分统计
	getPoints: '/mobile/getTrain.do?action=getJftj',
	
	/*统计相关*/
	// 获取隐患分类统计
	getDangerTypeChart: '/mobile/getYhzg.do?action=getYhlxtj',
	// 获取隐患原因统计
	getDangerReasonChart: '/mobile/getYhzg.do?action=getYhyytj',

	/*隐患相关*/
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
	
	/*检查相关*/
	// 获取检查列表
	getCheckList: '/mobile/getAqjc.do',
	// 获取检查详情
	getCheckDetail: '/mobile/getAqjc.do?action=getOneJc',
	// 获取检查类型
	getCheckTypes: '/mobile/getAqjc.do?action=getJclx',
	// 获取检查模板
	getCheckModule: '/mobile/getAqjc.do?action=getMb',
	// 根据检查模板查询检查项
	getCheckInfo: '/mobile/getAqjc.do?action=getJcjlForMb',
	// 保存检查
	saveCheck: '/mobile/getAqjc.do?action=insertJc',
	
	/*培训相关*/
	// 获取培训列表
	// getClassList: '/mobile/getTrain.do?action=getPxzlList',
	getClassList: '/mobile/getOther.do?action=getPxzlList',
	// 获取培训内容
	getClassDetail: '/mobile/getTrain.do?action=getOnePxzl',
	
	/*考试相关*/
	// 获取考试说明
	getExamDesc: '/mobile/getExam.do?action=getMyKskm',
	// 获取考试内容
	getExamInfo: '/mobile/getExam.do?action=createGrsj',
	// 提交考卷
	submitExam: '/mobile/getExam.do?action=submitGrsj',
	
	/*通用接口*/
	// 获取部门
	getOrgList: '/mobile/getUser.do?action=getOrgList ',
	// 获取人员
	getPersonList: '/mobile/getUser.do?action=getUserList ',
	// 上传照片
	uploadImage: '/uploadImg',
	// 删除照片
	deleteImage: '/mobile/getYhzg.do?action=delYhPhoto',
	// 加载照片
	loadImage: '/mobile/getYhzg.do?action=loadYhPhoto',
	// 加载用户头像
	loadUserPhoto: '/mobile/getUser.do?action=loadPhoto&userid=',
	
};
//对外把对象config返回
module.exports = config