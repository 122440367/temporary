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
import { asyncRoute, constantRoute } from '@/router/routes';
import router from '@/router';

function filterAsyncRoutes(asyncRoute: any[], menuList: string[]): any[] {
    return asyncRoute.filter((route) => {
        // 检查当前路由的 name 是否在 menuList 中
        if (menuList.includes(route.name)) {
            // 如果有子路由，递归过滤子路由
            if (route.children) {
                route.children = filterAsyncRoutes(route.children, menuList);
            }
            return true; // 保留该路由
        }
        return false; // 过滤掉该路由
    });
}

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
        let result: loginResponseData = await reqLogin(data);

        if (result.code === 200) {
            state.value.token = result.data.token ?? null;
            SET_TOKEN(state.value.token || '');

            // 登录成功后获取用户信息并加载动态路由
            await userInfo();

            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    };

    const userInfo = async () => {
        let result: userInfoResponseData = await reqUserInfo();
        if (result.code === 200) {
            // 存储用户信息
            state.value.username = result.data.userInf.loginId;
            state.value.avatar = result.data.userInf.avatar;

            // 过滤动态路由
            let userAsyncRoute = filterAsyncRoutes(asyncRoute, result.data.menuList);

            // 将动态路由和静态路由合并
            state.value.menuRoutes = [...constantRoute, ...userAsyncRoute];

            // 动态添加路由
            userAsyncRoute.forEach((route) => {
                router.addRoute(route);
            });

            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    };

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

    // 使用 computed 包装 menuRoutes，确保其响应式
    const menuRoutes = computed(() => state.value.menuRoutes);

    return {
        state,
        userLogin,
        isLoggedIn,
        menuRoutes,
        userInfo,
        userLogout
    };
});

export default useUserStore;