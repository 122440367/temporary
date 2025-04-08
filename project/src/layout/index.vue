<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_sidebar" :class="{ fold: LayOutSettingStore.fold }">
            <Logo></Logo>

            <!-- 滚动菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu :collapse="LayOutSettingStore.fold" background-color="$base-menu-background" text-color="white"
                    :default-active="$route.path">
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menu-list="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部tabbar -->
        <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold }">
            <Tabbar></Tabbar>
        </div>
        <!-- 主要内容区 -->
        <div class="layout_main" :class="{ fold: LayOutSettingStore.fold }">
            <Main></Main>
        </div>

    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import { GET_TOKEN } from '@/utils/token';
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import useUserStore from '@/stores/modules/user';
import Main from './main/index.vue';
import useLayOutSettingStore from '@/stores/modules/setting'
// import { useRoute } from 'vue-router';
import Tabbar from './tabbar/index.vue';

let $router = useRouter();
// let $route = useRoute();
let userStore = useUserStore();

let LayOutSettingStore = useLayOutSettingStore()

const redirect = () => {
    const token = GET_TOKEN();
    if (!token) {
        $router.push('/login');
    }
};

// 调用函数
redirect();
</script>

<script lang="ts">
export default {
    name: 'Layout'
};
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
        color: white;
        transition: all 0.3s;

        &.fold {
            width: $base-menu-min-width;

        }

        .scrollbar {
            height: calc(100vh - $base-tabbar-height - 50px);
            width: 100%;
            
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;

        &.fold {
            left: $base-menu-min-width;
            width: calc(100vw - $base-menu-min-width);
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            left: $base-menu-min-width;
            width: calc(100vw - $base-menu-min-width);
        }
    }


}

.layout_main {
    background-color: blueviolet;
}
</style>