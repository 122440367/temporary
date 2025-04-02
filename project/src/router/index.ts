//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantsRoute } from './routes';

//创建路由器
let router = createRouter({
    //路由模式
    history: createWebHashHistory(),
    //路由配置
    routes:constantsRoute,
    //路由滚动行为
    scrollBehavior() {
        //返回到顶部
        return {
            top: 0,
            left: 0,
            // behavior: 'smooth'
        }
    }

});

export default router;