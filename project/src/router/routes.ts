import { pa } from 'element-plus/es/locales.mjs';


//对外暴露配置路由(常量路由)
export const constantRoute = [
    {
        //登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',   //命名路由
        meta: {
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
        meta: {
            title: '',  //路由标题
            hidden: false,  //是否在菜单中隐藏
            icon: '',  //路由图标
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',  //路由标题
                    icon: 'HomeFilled',  //路由图标
                }
            },
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',   //命名路由
        meta: {
            title: '404',  //路由标题
            hidden: true,
            icon: 'DocumentDelete',  //路由图标
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',  //命名路由
        meta: {
            title: 'Any',  //路由标题
            hidden: true,
            icon: 'dataLine',  //路由图标
        }
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',   //命名路由
        meta: {
            icon: 'Platform',  //路由图标
            title: '大屏展示',  //路由标题
        }
    },

]

export const asyncRoute = [
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        redirect: '/acl/user',
        meta: {
            title: '权限管理',  //路由标题
            icon: 'Lock',  //路由图标
        },
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name: 'User',   //命名路由
                meta: {
                    title: '用户管理',  //路由标题
                    icon: 'User',  //路由图标
                }
            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'Role',   //命名路由
                meta: {
                    title: '角色管理',  //路由标题
                    icon: 'UserFilled',  //路由图标
                },
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'Permission',   //命名路由
                meta: {
                    title: '菜单管理',  //路由标题
                    icon: 'Monitor',  //路由图标
                }
            }
        ]
    },
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        redirect: '/product/trademark',
        meta: {
            title: '商品管理',
            icon: 'Goods',
        },
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    icon: 'ShoppingCartFull'
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    icon: 'ChromeFilled'
                }
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    icon: 'BrushFilled'
                }
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    icon: 'Orange'
                }
            }
        ]
    }
]