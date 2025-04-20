import request from '@/utils/request';
import type { MenuListResponseData } from './type';

enum API {
    GETLIST_URL = '/sys/acl/menu/getList',
    //理论上这里是要有增删改编辑的 但是我感觉这种重复的CRUD没有意义 不做了
}

export const reqGetList = () => request.get<any, MenuListResponseData>(API.GETLIST_URL);