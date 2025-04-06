//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';

//引入接口
import { reqLogin } from '@/api/user';

//引入类型
import type { loginForm, loginResponseData } from '@/api/user/type';
import type { UserState } from '@/stores/modules/types/type';

import { SET_TOKEN, GET_TOKEN } from '@/utils/token';

import { computed } from 'vue';

//引入路由
import { constantRoute } from '@/router/routes';

//创建用户小仓库
let useUserStore = defineStore('User', () => {
    // state
    const state = ref<UserState>({
        token: GET_TOKEN(), // 从 localStorage 初始化 token
        menuRoutes: [] // 菜单路由
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

    // getters
    const isLoggedIn = computed(() => !!state.value.token);

    const menuRoutes = reactive(constantRoute); //仓库存储生成菜单需要的路由

    return {
        state,
        userLogin,
        isLoggedIn,
        menuRoutes
    };
});

export default useUserStore