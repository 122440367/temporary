import type { RouteRecordRaw } from "vue-router"

//定义小仓库数据state类型
export interface UserState{
    token:string|null, // 用户登录成功后返回的token
    menuRoutes: RouteRecordRaw[], // 菜单路由
    username: string, // 用户名
    avatar: string, // 头像
}
