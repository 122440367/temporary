import request from "@/utils/request";
import type { reqTrademarkData, trademarkResponseData } from "./type";

enum API {
    TRADEMARK_URL = '/product/brand/getpage',
}


export const reqHasTrademark = (data:reqTrademarkData) =>
    request.post<any, trademarkResponseData>(API.TRADEMARK_URL,data);