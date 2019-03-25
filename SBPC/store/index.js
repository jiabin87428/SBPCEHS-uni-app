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
		userInfo: null,
    },
    mutations: {
        login(state, user) {
			if (user != null) {
				state.userName = user.username || '新用户';
				state.hasLogin = true;
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
