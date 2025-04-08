//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';
//引入接口
import { reqLogin,reqUserInfo } from '@/api/user';
//引入类型
import type { loginForm, loginResponseData } from '@/api/user/type';
import type { UserState } from '@/stores/modules/types/type';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
import { computed } from 'vue';

//引入路由
import { constantRoute } from '@/router/routes';

//创建用户小仓库
let useUserStore = defineStore('User', () => {
    // state
    const state = ref<UserState>({
        token: GET_TOKEN(), // 从 localStorage 初始化 token
        menuRoutes: [], // 菜单路由
        username: '', // 用户名
        avatar: '', // 头像
    });

    // actions
    const userLogin = async (data: loginForm) => {
        // 登录请求
        let result: loginResponseData = await reqLogin(data);
        // console.log(result);
        // 成功 -> 200，token     失败 -> 201，message
        if (result.code == 200) {
            state.value.token = result.data.token ?? null; // 将token存储到state中
            SET_TOKEN(state.value.token || '');

            console.log('登录成功');
            return 'ok';
        } else if (result.code == 201) {
            // console.log('登录失败')
            return Promise.reject(new Error(result.data.message)); // 返回失败的promise对象
        }
    };
    const userInfo = async () => {
        let result = await reqUserInfo();
        if (result.code == 200) {
            state.value.username = result.data.checkUser.username; // 将用户名存储到state中
            state.value.avatar = result.data.checkUser.avatar; // 将头像存储到state中
            return 'ok';
        }else{
            return Promise.reject('获取用户信息失败'); // 返回失败的promise对象
        }
    }

    const userLogout = () => {
        //目前没有退出登录的接口，所以直接清除token
        state.value.token = ''; // 清除token
        state.value.username = ''; // 清除用户名
        state.value.avatar = ''; // 清除头像
        REMOVE_TOKEN(); // 清除localStorage中的token
    }


    // getters
    const isLoggedIn = computed(() => !!state.value.token);

    const menuRoutes = reactive(constantRoute); //仓库存储生成菜单需要的路由

    return {
        state,
        userLogin,
        isLoggedIn,
        menuRoutes,
        userInfo,
        userLogout
    };
});

export default useUserStore