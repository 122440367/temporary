import request from "@/utils/request";
import type { AttrResponseData, CategoryResponseData } from "./type";


enum API{
    C1_URL='/product/category/getOne',
    C2_URL='/product/category/getTwo/',
    C3_URL='/product/category/getThree/',
    ATTR_URL='/product/attr/getlist/',
}

export const reqC1=()=>request.get<any, CategoryResponseData>(API.C1_URL);

export const reqC2=(C1_id:number)=>request.get<any, CategoryResponseData>(API.C2_URL+C1_id);

export const reqC3=(C2_id:number)=>request.get<any, CategoryResponseData>(API.C3_URL+C2_id);

export const reqAttr=(C3_id:number)=>request.get<any, AttrResponseData>(API.ATTR_URL+C3_id);