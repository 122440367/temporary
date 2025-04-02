//在这里统一管理项目用户相关的所有接口

import request from "@/utils/request";
import type  {loginForm,loginResponseData,userResponseData} from "@/api/user/type";


//统一管理接口
enum API{
    LOGIN_URL = '/user/login',
    USER_INFO_URL = '/user/info',
}

//暴露请求函数
//登录接口 {username,password}
export const reqLogin=(data:loginForm)=>request.post<any,loginResponseData>(API.LOGIN_URL,data);
//获取用户信息接口 {token}
export const reqUserInfo=()=>request.get<any,userResponseData>(API.USER_INFO_URL);

