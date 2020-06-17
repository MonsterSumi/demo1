import Vue from 'vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import env from './env';

import App from './App.vue';

//默认接口代理设置
axios.defaults.baseURL = env.baseUrl;
axios.defaults.timeout = 8000;
//接口错误拦截
axios.interceptors.response.use(function (response) {
	const res = response.data;
	if (res.status == 0) {
		return res.data;
	} else if (res.status == 10) {//未登录状态码
		window.location.href = '/#/login';
	} else {
		//其他错误信息
	}
})

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app');
