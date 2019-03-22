import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: true,
        hasLogin: false,
        userName: "",
		userType: 1,	// 1.管理员，2.普通用户
		userInfo: null,
    },
    mutations: {
        login(state, user) {
			if (user != null) {
				state.userName = user.username || '新用户';
				state.hasLogin = true;
				state.userType = user.yhlx;
				state.userInfo = user;
			}
        },
        logout(state) {
            state.userName = "";
			state.userInfo = null;
            state.hasLogin = false;
        },
    }
})

export default store
