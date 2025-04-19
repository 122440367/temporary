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
    status?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    delFlag?: string;
    rowSt?: string;
}

export interface Menu {
    menuId: number;
    parentMenuId: number;
    menuName: string;
    level: number;
    menuType: string;
    path?: string;
    component?: string;
    compName?: string;
    status?: string;
    perms?: string;
    icon?: string;
    meta?: string;
    childrenList?: Menu[];
}

export interface RoleListResponseData extends Response {
    data: {
        total: number;
        pages: number;
        roles: Role[];
        hasNext: boolean;
    }
}


export interface MenuResponseData extends Response {
    data: {
        menus: Menu[];
    }
}

