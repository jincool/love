import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home/Home'
import Plan from '@/components/Plan/Plan'
import Dynamic from '@/components/Dynamic/Dynamic'
import Setting from '@/components/Setting/Setting'
import ImgCut from '@/components/common/ImgCut'

Vue.use(Router)
const router=new Router({
    routes: [
        {
            path: '/',
            redirect: 'Home',

        },
        {
            path: '/Home',
            name: 'Home',
            // redirect:'/Home',
            component: Home
        },
        {
            path: '/Plan',
            name: 'Plan',
            component: Plan
        },
        {
            path: '/Dynamic',
            name: 'Dynamic',
            component: Dynamic
        },
        {
            path: '/Setting',
            name: 'Setting',
            component: Setting
        },
        {
            path: '/ImgCut',
            name: 'ImgCut',
            component: ImgCut
        }
    ],

})
//全局路由改变前钩子
// router.beforeEach((to, from, next) => {
//     console.log('即将进入：', to.name);
//     next();
// })

export default router
