//封装本地存储数据与读取数据的方法

export const SET_TOKEN = (token: string) => {
    localStorage.setItem('TOKEN', token); // 设置token到localStorage
}

export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN'); // 获取token从localStorage
}

export const REMOVE_TOKEN = () => {
    localStorage.removeItem('TOKEN'); // 删除token从localStorage
}

