interface ResponseData {
    success: boolean;
    code: number;
    message: string;
}


export interface CategoryObj {
    id: number;
    caNm: string;
    type: string,
    ca1Id: number,
    ca1Nm: string,
    ca2Id: number,
    ca2Nm: string,
    createTime: string,
    updateTime: string,
    remark: string,
}

export interface CategoryResponseData extends ResponseData {
    data: {
        categorys: CategoryObj[];
    };
}