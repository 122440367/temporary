import request from "@/utils/request";

enum API {
    TRADEMARK_URL = '/product/brand/getpage',
}


export const reqHasTrademark = (data:any) =>
    request.post<any, any>(API.TRADEMARK_URL,data);