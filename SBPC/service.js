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

const copyObj = function (a){
	var c = {};
	c = JSON.parse(JSON.stringify(a));
	return c;
}

export default {
    getUsers,
    addUser,
    removeUser,
    copyObj
}
