<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_sidebar">
            <Logo></Logo>
        </div>
        <!-- 顶部tabbar -->
        <div class="layout_tabbar">456</div>
        <!-- 主要内容区 -->
        <div class="layout_main">
            <p class="test">


            </p>
        </div>

    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import { GET_TOKEN } from '@/utils/token';
import Logo from './logo/index.vue';

let $router = useRouter();

const redirect = () => {
    const token = GET_TOKEN();
    if (!token) {
        $router.push('/login');
    }
};

// 调用函数
redirect();
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    // position: relative;
    .layout_sidebar {
        width: $base-menu-width;
        height: 100%;
        background: $base-menu-background;
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
    }

    .test {
        height: 10000px;
    }
}
</style>