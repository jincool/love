import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home/Home'
import Plan from '@/components/Plan/Plan'
import Dynamic from '@/components/Dynamic/Dynamic'
import Setting from '@/components/Setting/Setting'
import ImgCut from '@/components/common/ImgCut'
import Login from '@/components/common/Login'

Vue.use(Router)
const router=new Router({
    routes: [
        {
            path: '/',
            redirect: 'Home',
            meta: { requiresAuth: true }

        },
        {
            path: '/Home',
            name: 'Home',
            // redirect:'/Home',
            component: Home,
            meta: { requiresAuth: true }
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
            path: '/Login',
            name: 'Login',
            component: Login
        }
    ],

})
//全局路由改变前钩子
// router.beforeEach((to, from, next) => {
//     console.log('即将进入：', to.name);
//     next();
// })

export default router
