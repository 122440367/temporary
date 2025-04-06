import { timePanelSharedProps } from 'element-plus/es/components/time-picker/src/props/shared.mjs';
import { hi } from 'element-plus/es/locales.mjs';

//对外暴露配置路由(常量路由)
export const constantRoute = [
    {
        //登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',   //命名路由
        meta:{
            title: '登录',  //路由标题
            hidden: true,  //是否在菜单中隐藏
            icon: 'Promotion',  //路由图标
        }
    },
    {
        //登录成功后展示数据的路由
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',   //命名路由 
        meta:{
            title:'layout',  //路由标题
            hidden: false,  //是否在菜单中隐藏
            icon:'Avatar',  //路由图标
        },
        children:[
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'home',   //命名路由
                meta:{
                    title: '首页',  //路由标题
                    hidden: false,
                    icon:'HomeFilled',  //路由图标
                }
            },
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',   //命名路由
        meta:{
            title: '404',  //路由标题
            hidden: true,
            icon:'DocumentDelete',  //路由图标
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',  //命名路由
        meta:{
            title: 'Any',  //路由标题
            hidden: true,
            icon:'dataLine',  //路由图标
        }
    }
]