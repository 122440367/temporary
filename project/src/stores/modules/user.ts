//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue';
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
import type { loginFormData, loginResponseData, userInfoResponseData } from "@/api/user/type";

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


    // 监听 localStorage 的变化
    window.addEventListener('storage', (event) => {
        if (event.key === 'TOKEN') {
            state.value.token = event.newValue || null; // 同步 token
        }
    });


    watch(
        () => state.value.token,
        (newToken) => {
            if (newToken) {
                SET_TOKEN(newToken); // 更新 localStorage 中的 token
            } else {
                REMOVE_TOKEN(); // 清空 localStorage 中的 token
            }
        }
    );

    // actions
    const userLogin = async (data: loginFormData) => {
        // 登录请求
        let result: loginResponseData = await reqLogin(data);

        if (result.code == 200) {
            state.value.token = result.data.token ?? null; // 将token存储到state中
            SET_TOKEN(state.value.token || '');

            console.log('登录成功');
            return 'ok';
        } else if (result.code == 201) {
            // console.log('登录失败')
            return Promise.reject(new Error(result.message)); // 返回失败的promise对象
        }
    };
    const userInfo = async () => {
        let result: userInfoResponseData = await reqUserInfo();
        if (result.code == 200) {
            state.value.username = result.data.userInf.loginId; // 将用户名存储到state中
            state.value.avatar = result.data.userInf.avatar; // 将头像存储到state中
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message)); // 返回失败的promise对象
        }
    }

    const userLogout = async () => {
        try {
            let result = await reqLogout();
            if (result.code == 200) {
                // console.log('退出登录成功');
            }
        } catch (error) {
            // console.warn('退出登录时发生错误:', error.message);
        } finally {
            // 无论后端是否返回错误，都清除本地状态
            state.value.token = null; // 清空 token
            state.value.username = ''; // 清空用户名
            state.value.avatar = ''; // 清空头像
            REMOVE_TOKEN(); // 删除 token
        }
        return 'ok';
    };

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