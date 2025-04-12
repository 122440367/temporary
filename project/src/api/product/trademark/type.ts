
export interface ResponseData {
    success: boolean;
    code: number;
    message: string;

}

export interface reqTrademarkData{
    page?: number;
    size?: number;
    tmName?: string;
}

export interface trademark {
    id?: number;
    tmName: string;
    logoUrl?: string;
    remark?: string;
    createTime?: string;
    updateTime?: string;
}
export type Records = trademark[];

export interface trademarkResponseData extends ResponseData {
    data: {
        total: number;
        pages: number;
        size: number;
        records: Records;
    }
}