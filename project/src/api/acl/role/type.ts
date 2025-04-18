export interface Response {
    code: number;
    message: string;
    success: boolean;
    data: any;
}

export interface Role {
    id: number;
    rName: string;
    roleKey?: string;
    status: string;
    createBy?: string;
    createTime: string;
    updateBy?: string;
    updateTime: string;
    remark?: string;
    delFlag?: string;
    rowSt?: string;
}

export interface RoleListResponseData extends Response {
    data: {
        total: number;
        pages: number;
        roles: Role[];
        hasNext: boolean;
    }
}