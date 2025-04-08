<template>
    <el-icon style="margin-right: 10px;" @click="changeIcon">
        <component :is="LayOutSettingStore.fold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title"
            :to="item.path">
            <el-icon v-if="item.meta.icon" size="15">
                <component :is="item.meta.icon"></component>
            </el-icon>

            <span style="margin:0px 7px; font-size: 18px;">
                {{ item.meta.title }}
            </span>
        </el-breadcrumb-item>

    </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/stores/modules/setting'

let LayOutSettingStore = useLayOutSettingStore()

const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold;
}
</script>

<script lang="ts">
export default {
    name: 'Breadcrumb'
};
</script>

<style lang="scss" scoped></style>