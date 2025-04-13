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

 interface AttrValueList{
    id: number;
    attrValue: string;
}

export interface attrs {
    id: number;
    categoryId: number;     //应该时三级分类id
    attNm: string;             //属性名称
    attrValueList: AttrValueList[];
}

export interface AttrResponseData extends ResponseData {
    data: {
        attrs: attrs[];
    };
}


export interface CategoryResponseData extends ResponseData {
    data: {
        categorys: CategoryObj[];
    };
}
export interface AddOrUpdateAttrResponseData extends ResponseData {
    data:{}
}