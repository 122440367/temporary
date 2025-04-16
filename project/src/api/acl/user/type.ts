export interface Response {
    success: boolean;
    code: number;
    message: string;
    data: any;
}

export interface User {
    id?: number;
    loginId: string;
    nickName: string;
    email: string;
    mobile?: string
    sex?: string
    avatar?: string
    userType?: string
    createBy?: string | null;
    createTime?: string;
    updateBy?: string | null;
    roleNms?: null;
    updateTime?: string;
}

export interface AllUserResponseData extends Response {
    data: {
        total: number;
        pages: number;
        "hasNext": boolean;
        users: User[];
    }
}