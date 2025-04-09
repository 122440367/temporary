//定义用户相关数据的ts类型

export interface loginFormData {
    username: string;
    password: string;
}

export interface ResponseData {
    success: boolean;
    code: number;
    message: string;
    data: object
}

export interface loginResponseData extends ResponseData {
    data: {
        token: string;
    }
}

export interface userInfoResponseData extends ResponseData {
    data: {
        menuList:any[]
        buttonList: any[]
        userInf: {
            id: number
            loginId: string
            nickName: string
            password: string
            status: string
            email: string
            mobile: string
            sex: string
            avatar: string
            userType: string
            createBy: string
            createTime: string
            updateBy: string
            roleNms?: null,
            updateTime: string
            deleted: string
            sourceType: string
        },
        roleList: any[]
    }
}

