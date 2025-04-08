<template>
    <el-icon style="margin-right: 10px;" @click="changeIcon">
        <component :is="LayOutSettingStore.fold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
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