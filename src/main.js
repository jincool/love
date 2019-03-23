// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//配置Vant的JS
import Vant from 'vant'
//配置Vant的JS
import 'vant/lib/index.css';

//注册Vant全局组建及挂在
Vue.use(Vant)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
