import request from "@/utils/request";
import type { AllUserResponseData, Response, User } from "./type";

enum API {
    ALLUSE_URL = '/sys/acl/user/getpage/',
    ADDUSER_URL = '/sys/acl/user/add',
    UPDUSER_URL = '/sys/acl/user/upd',
    DELETE_URL = '/sys/acl/user/del/',
    BATCHDELETE = '/sys/acl/user/batchDelete'
}

export const reqAllUserInfo = (page: number, size: number, userNm?: string) => {
    return request.get<any, AllUserResponseData>(`${API.ALLUSE_URL}${page}/${size}`, {
        params: userNm ? { userNm } : undefined,
    });
};


export const reqAddUser = (data: User) => request.post<any, Response>(API.ADDUSER_URL, data);

export const reqUpdateUser = (data: User) => request.put<any, Response>(API.UPDUSER_URL, data);

export const reqDeleteUser = (id: number) => request.delete<any, Response>(`${API.DELETE_URL}${id}`);

export const reqBatchDeleteUser = (data: any) =>
    request.delete<any, Response>(API.BATCHDELETE, { data });
//  axios 的 delete 方法默认不支持直接传递请求体数据。需要通过 data 属性传递请求体。