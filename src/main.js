// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//配置axios
import Axios from 'axios'
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


//配置公共请求地址
Axios.defaults.baseURL='http://127.0.0.1/volservice/?a=getApi';
// Axios添加vue实例属性
Vue.prototype.$axios=Axios ;
// 日期格式化添加vue实例属性
Vue.prototype.$moment=moment ;

//注册Vant全局组建及挂在
Vue.use(Vant);
//注册Header 标题栏全局组件
Vue.component('my-header',Header);
//注册Croppa图片剪辑全局组建及挂在
Vue.use(Croppa);
Vue.filter('agoDate',function (datetime) {
    moment.locale('zh-cn');
    return moment().diff(moment(datetime),'day')+'天';
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
