import request from '@/utils/request';
import type { RoleListResponseData, Response, MenuResponseData } from './type';

enum API {
    GETROLELIST_URL = '/sys/acl/role/getpage/',
    ADDROLE_URL = '/sys/acl/role/add',
    UPDATEROLE_URL = '/sys/acl/role/upd',
    DELETEROLE_URL = '/sys/acl/role/del/',
    GETROLEMENUS_URL = '/sys/acl/role/getRoleMenus/',
    GETALLMENUS_URL = '/sys/acl/role/getAllMenus',
    ASSIGNMENU_URL = '/sys/acl/role/allocationMenu',
}

export const reqGetRolePage = (page: number, size: number, roleNm?: string) => {
    return request.get<any, RoleListResponseData>(`${API.GETROLELIST_URL}${page}/${size}`, {
        params: roleNm ? { roleNm } : undefined,
    });
}

export const reqAddRole = (data: any) => request.post<any, Response>(API.ADDROLE_URL, data);

export const reqUpdateRole = (data: any) => request.put<any, Response>(API.UPDATEROLE_URL, data);

export const reqDeleteRole = (id: number) => request.delete<any, Response>(`${API.DELETEROLE_URL}${id}`);

export const reqGetRoleMenus = (id: number) => request.get<any, Response>(`${API.GETROLEMENUS_URL}${id}`);

export const reqGetAllMenus = () => request.get<any, MenuResponseData>(API.GETALLMENUS_URL);

export const reqAssignMenu = (data: any) => request.put<any, Response>(API.ASSIGNMENU_URL, data);