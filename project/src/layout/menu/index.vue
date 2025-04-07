<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <!-- 无子路由 -->
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>


        <!-- 有一个路由 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item v-if="!item.meta.hidden" :index="item.children[0].path" @click="goRoute">
                <template #title>
                    <el-icon>
                        <component :is="item.children[0].meta.icon"></component>
                    </el-icon>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>


        <!-- 多个子路由 -->
        <template v-if="item.children && item.children.length > 1">
            <el-sub-menu v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>

    </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';



defineProps([
    'menuList',
])

let $router = useRouter();

const goRoute = (vc:any) => {
    $router.push(vc.index);
};
</script>
<script lang="ts">
export default {
    name: 'Menu',
}
</script>