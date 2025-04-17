import request from "@/utils/request";
import type { AllUserResponseData, Response, User } from "./type";

enum API {
    ALLUSE_URL = '/sys/acl/user/getpage/',
    ADDUSER_URL = '/sys/acl/user/add'
}

export const reqAllUserInfo = (page: number, size: number, userNm?: string) => {
    return request.get<any, AllUserResponseData>(`${API.ALLUSE_URL}${page}/${size}`, {
        params: userNm ? { userNm } : undefined,
    });
};


export const reqAddUser = (data: User) => request.post<any, Response>(API.ADDUSER_URL, data);