//封装一个获取时间的方法
export const getTime: any = () => {
    let message = '';
    let hours = new Date().getHours();
    if (hours <= 10) {
        message = '早上';
    } else if (hours <= 14) {
        message = '中午';
    } else if (hours <= 18) {
        message = '下午';
    } else {
        message = '晚上';
    }
    return message;
}