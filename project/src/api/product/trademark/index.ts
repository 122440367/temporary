import request from "@/utils/request";
import type { reqTrademarkData, trademarkResponseData, AddTrademarkData, addTrademarkResponseData, UpdateTrademarkData, UpdateTrademarkResponseData } from "./type";

enum API {
    TRADEMARK_URL = '/product/brand/getpage',       // Get trademark list
    ADD_TRADEMARK_URL = '/product/brand/add',       // Add trademark
    UPDATE_TRADEMARK_URL = '/product/brand/upd',    // Update trademark
    DELETE_TRADEMARK_URL = '/product/brand/del'     // Delete trademark
}


export const reqHasTrademark = (data: reqTrademarkData) =>
    request.post<any, trademarkResponseData>(API.TRADEMARK_URL, data);

export const reqdeleteTrademark = (id: number) =>
    request.delete<any, any>(`${API.DELETE_TRADEMARK_URL}/${id}`);

export const reqAddTrademark = (data: AddTrademarkData) =>
    request.post<any, addTrademarkResponseData>(API.ADD_TRADEMARK_URL, data);

export const reqUpdateTrademark = (data: UpdateTrademarkData) =>
    request.put<any, UpdateTrademarkResponseData>(API.UPDATE_TRADEMARK_URL, data);