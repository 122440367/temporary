//在这里统一管理项目用户相关的所有接口

import request from "@/utils/request";


//统一管理接口
enum API {
    LOGIN_URL = '/toLogin',
    USERINFO_URL = '/user/getUserInf',
    LOGOUT_URL = '/user/logout'
}

//暴露请求函数
//登录接口
export const reqLogin = (data: any) => request.post<any, any>(API.LOGIN_URL, data);
//获取用户信息接口
export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL);
//退出登录接口
export const reqLogout = () => request.get<any, any>(API.LOGOUT_URL);