<template>
    <el-button size="large" icon="refresh" circle @click="updateRefsh"></el-button>
    <el-button size="large" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="large" icon="setting" circle></el-button>
    <img :src="userStore.state.avatar" style="width: 50px;height: 50px; margin:0px 20px; border-radius: 50%;" />
    <el-dropdown style="margin-left: 20px;">
        <span class="el-dropdown-link">
            {{ userStore.state.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/stores/modules/setting'
import useUserStore from '@/stores/modules/user';
import { useRouter,useRoute } from 'vue-router';

let userStore = useUserStore();
let LayOutSettingStore = useLayOutSettingStore()

const updateRefsh = () => {
    LayOutSettingStore.refresh = !LayOutSettingStore.refresh;
}

let fullScreen = () => {
    let full = document.fullscreenElement;

    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
const $router = useRouter();
const $route = useRoute();

const logout = () => {
    //1. 向后端发送请求
    //2. 仓库中关于用户相关的信息[token、username等]清空
    //3. 跳转到登录页面
    userStore.userLogout();
    $router.push({path: '/login',query:{redirect:$route.path}});
}

</script>

<script lang="ts">
export default {
    name: 'Setting'
};
</script>
