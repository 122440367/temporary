import type { CategoryObj } from "@/api/product/attr/type";
import type { RouteRecordRaw } from "vue-router"

//定义小仓库数据state类型
export interface UserState{
    token:string|null, // 用户登录成功后返回的token
    menuRoutes: RouteRecordRaw[], // 菜单路由
    username: string, // 用户名
    avatar: string, // 头像
}

export interface CategoryState{
    c1Id: string|number, // 一级分类id
    c1Arr: CategoryObj[], // 一级分类数据
    c2Id: string|number, // 二级分类id
    c2Arr: CategoryObj[], // 二级分类数据
    c3Id: string|number, // 三级分类id
    c3Arr: CategoryObj[] // 三级分类数据
}