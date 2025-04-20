export interface Response {
    code: number;
    message: string;
    success: boolean;
    data: any;
}

export interface Menu {
    menuId: number;
    parentMenuId?: number;
    menuName: string;
    level?: number;
    menuType?: string;
    path?: string;
    component?: string;
    compName?: string;
    status?: string;
    perms?: string;
    icon?: string;
    meta?: string;
    childrenList?: Menu[];
}

export interface MenuListResponseData extends Response {
    data: {
        menuList: Menu[];
    }
}