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
router.beforeEach(async(to, from, next) => {
    document.title =setting.title+'-'+to.meta.title; //动态修改网页标题
    //访问某个路由之前守卫

    nprogress.start(); //开始进度条
    //获取token判断是否登录
    let token = userStore.state.token; //获取token
    let username=userStore.state.username; //获取用户名

    if (token) {
        if(to.path === '/login') {
            next({ path: '/' }); //如果访问的是登录页面，跳转到首页
        }else{
            if (username) {
                next(); //放行，继续访问 
            } else {
               //无用户信息 发请求获取后放行
               try{
                await userStore.userInfo(); //获取用户信息
                next(); //放行，继续访问
               }catch(error){
                //token过期：获取不到用户信息
                //用户手动修改了token

                //退出登录
                userStore.userLogout(); //清除token
                next({path:'/login',query:{redirect:to.path}});
               }
            }
        }

    } else {
        if (to.path === '/login') {
            next(); //放行，继续访问 
        } else {
            next({ path: '/login', query: { redirect: to.path} }); //跳转到登录页面 
        }
    }

})

router.afterEach((to, from) => {
    nprogress.done(); //结束进度条
})