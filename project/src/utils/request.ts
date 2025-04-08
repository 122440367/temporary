//对 axios 进行二次封装：使用请求拦截器、响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/stores/modules/user";

//step 1：利用axios的create方法创建一个axios实例 （其他配置：基础路径、超时时间）
let request = axios.create({
    //基础路径
    baseURL: import.meta.env.VITE_APP_API_URL,//基础路径会携带/api
    timeout: 5000 // 超时时间的设置
});

//step 2:给axios实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
    //config配置对象，有headers属性 请求头，给服务器端携带公共的参数
    let userStore = useUserStore(); //获取用户小仓库
    if (userStore.state.token) {
        //给请求头添加token
        config.headers.token = userStore.state.token; //将token添加到请求头中
    }
    //返回配置对象
    return config
});

//step 3:响应拦截器
request.interceptors.response.use((response) => {
    //成功回调

    //简化数据
    return response.data
}, (error) => {
    //失败回调:处理http网络错误

    //定义一个变量：存储网络错误信息
    let message = '';

    //http状态码
    let status = error.response.status;

    switch (status) {
        case 400:
            message = 'Request Param Wrong'; break;
        case 401:
            message = 'Token Expired'; break;
        case 403:
            message = 'Permission Denied'; break;
        case 404:
            message = 'RequestUrl Error'; break;
        case 500:
            message = 'Server Error'; break;
        default:
            message = 'NetWork Error'; break;
    }

    ElMessage({
        type: 'error',
        message //key: value简写
    });

    return Promise.reject(error)
});


// console.log(import.meta.env.VITE_APP_API_URL);
//对外暴露
export default request