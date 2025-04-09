//在这里统一管理项目用户相关的所有接口

import request from "@/utils/request";
import type { loginFormData,loginResponseData,userInfoResponseData } from "@/api/user/type";

//统一管理接口
enum API {
    LOGIN_URL = '/toLogin',
    USERINFO_URL = '/user/getUserInf',
    LOGOUT_URL = '/user/logout'
}

//暴露请求函数
//登录接口
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
//获取用户信息接口
export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USERINFO_URL);
//退出登录接口
export const reqLogout = () => request.get<any, any>(API.LOGOUT_URL);