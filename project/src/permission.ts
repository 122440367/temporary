//路由鉴权
import router from '@/router'
import nprogress from 'nprogress' //引入进度条插件
import 'nprogress/nprogress.css' //引入进度条样式
import pinia from '@/stores' //引入仓库对象
import useUserStore from './stores/modules/user'
import setting from './setting'


let userStore = useUserStore(pinia)


//全局守卫：项目当中任意路由切换都会触发的钩子
//前置守卫：在路由跳转之前触发
router.beforeEach(async (to, from, next) => {
    document.title = setting.title + '-' + to.meta.title; // 动态修改网页标题
    nprogress.start(); // 开始进度条

    // 获取 token 和用户名
    const token = userStore.state.token;
    const username = userStore.state.username;

    if (token) {
        if (to.path === '/login') {
            next({ path: '/' }); // 如果访问的是登录页面，跳转到首页
        } else {
            if (username) {
                next(); // 如果用户名存在，直接放行
            } else {
                try {
                    // 如果没有用户信息，尝试获取用户信息
                    await userStore.userInfo(); 
                    next(); // 放行
                } catch (error) {
                    // 如果获取用户信息失败（如 token 过期）
                    await userStore.userLogout(); // 清除 token
                    next({ path: '/login', query: { redirect: to.path } }); // 跳转到登录页面
                }
            }
        }
    } else {
        if (to.path === '/login') {
            next(); // 如果访问的是登录页面，直接放行
        } else {
            next({ path: '/login', query: { redirect: to.path } }); // 跳转到登录页面
        }
    }

});

router.afterEach((to, from) => {
    nprogress.done(); //结束进度条
})