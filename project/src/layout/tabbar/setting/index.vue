<template>
    <el-button size="large" icon="refresh" circle @click="updateRefsh"></el-button>
    <el-button size="large" icon="FullScreen" circle @click="fullScreen"></el-button>

    <el-popover placement="bottom" title="主题设置" width="300px" trigger="hover">
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker v-model="color" show-alpha :predefine="predefineColors" size="small" :teleported="false"
                    @change="setColor" />
            </el-form-item>

            <el-form-item label="暗黑模式">
                <el-switch v-model="dark" active-icon="MoonNight" inactive-icon="Sunny" inline-prompt
                    @change="changeDark"></el-switch>
            </el-form-item>
        </el-form>

        <template #reference>
            <el-button size="large" icon="setting" circle></el-button>
        </template>
    </el-popover>

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
import useLayOutSettingStore from '@/stores/modules/setting';
import useUserStore from '@/stores/modules/user';
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let userStore = useUserStore();
let LayOutSettingStore = useLayOutSettingStore();
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
const updateRefsh = () => {
    LayOutSettingStore.refresh = !LayOutSettingStore.refresh;
};

let fullScreen = () => {
    let full = document.fullscreenElement;

    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

const $router = useRouter();
const $route = useRoute();

const logout = async () => {
    // 1. 向后端发送请求
    // 2. 仓库中关于用户相关的信息[token、username等]清空
    // 3. 跳转到登录页面
    await userStore.userLogout();
    $router.push({ path: '/login', query: { redirect: $route.path } });
};

let dark = ref(false);
let themeColor = ref(localStorage.getItem('themeColor') || '#409EFF'); // 默认主题颜色

const changeDark = () => {
    let html = document.documentElement;
    dark.value ? (html.className = 'dark') : (html.className = '');
};

// 动态更改主题颜色
const setColor = () => {
    let html = document.documentElement
    html.style.setProperty('--el-color-primary', color.value)
}

// 页面加载时应用存储的主题颜色
onMounted(() => {
    document.documentElement.style.setProperty('--el-color-primary', themeColor.value);
});
</script>

<script lang="ts">
export default {
    name: 'Setting',
};
</script>
