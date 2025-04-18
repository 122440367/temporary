import request from '@/utils/request';
import type { RoleListResponseData } from './type';

enum API {
    GETROLELIST_URL = '/sys/acl/role/getpage/',
}

export const reqGetRolePage = (page: number, size: number) => request.get<any, RoleListResponseData>(`${API.GETROLELIST_URL}${page}/${size}`);