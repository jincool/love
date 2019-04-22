// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//配置axios
import Axios from 'axios'
//配置vuex
import Vuex from 'vuex'

//配置Vant的JS
import Vant from 'vant'
//配置Vant的CSS
import 'vant/lib/index.css';
//配置Header标题栏
import Header from '@/components/common/Header'
//配置图片裁剪
import Croppa from 'vue-croppa'
//配置日期格式JS
import moment from 'moment'
import 'moment/locale/zh-cn'
//配置图裁剪CSS
import 'vue-croppa/dist/vue-croppa.css'
//配置全局css
import '@/assets/css/Common.css'

// Axios添加vue实例属性
Vue.prototype.$axios = Axios;
//配置Axios默认请求地址
// Axios.defaults.baseURL = '/api';
 Axios.defaults.baseURL = 'http://jincool.com';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
// 日期格式化添加vue实例属性
Vue.prototype.$moment = moment;
//注册Vuex全局
Vue.use(Vuex)
//注册Vant全局组建及挂在
Vue.use(Vant);
//注册Vuex全局

//注册Header 标题栏全局组件
Vue.component('my-header', Header);
//注册Croppa图片剪辑全局组建及挂在
Vue.use(Croppa);
Vue.filter('agoDate', function (datetime) {
    moment.locale('zh-cn');
    return moment().diff(moment(datetime), 'day') + '天';
})
Vue.config.productionTip = false;
Vue.config.devtools =true;

//配置 login 状态管理
import loginStore from '@/store/loginStore'

let store = new Vuex.Store({
        modules: {
            login: loginStore
        }
    }
);
//
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 判断是否已登录
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        // 未登录则跳转到登录界面
        next('/login');
    } else {
        next() // 确保一定要调用 next()
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
