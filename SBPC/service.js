// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}

const addUser = function (userInfo) {
    uni.setStorageSync(USERS_KEY, JSON.stringify(userInfo));
}
const removeUser = function () {
    uni.removeStorageSync(USERS_KEY);
	//把给nvue文件用的另一份userInfo也清空
	uni.removeStorageSync('userInfo');
}

// 拷贝对象
const copyObj = function (a){
	var c = {};
	c = JSON.parse(JSON.stringify(a));
	return c;
}

// 获取当前日期
const getCurrentDate = function (timeStamp){
	let year = new Date(timeStamp).getFullYear();
	let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
	let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
	let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
	let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
	// this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
	return year + "-" + month + "-" + date;
}

export default {
    getUsers,
    addUser,
    removeUser,
    copyObj,
	getCurrentDate
}
