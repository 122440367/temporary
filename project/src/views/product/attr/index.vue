<template>
    <div class="root">

        <Category></Category>

        <el-card style="margin:10px 0">
            <el-button type="primary" size="large" icon="Plus" style="margin: 10px 0;"
                :disabled="!categoryStore.state.c3Id">添加属性</el-button>
            <el-table border :data="categoryStore.state.Attrs" stripe style="width: 100%">
                <el-table-column label="序号" align="center" type="index" width="120px" prop="id"></el-table-column>
                <el-table-column label="属性名称" width="280px" align="center" prop="attNm"></el-table-column>
                <el-table-column label="属性值" align="center">
                    <template #="{row,$index}"> 
                        <el-tag v-for="(item,index) in row.attrValueList" :key="item.id" style="margin:5px">{{ item.attrValue }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220px" align="center">
                    <template #="{row,$index}">
                        <el-button type="primary" size="default" icon="Edit">编辑</el-button>
                        <el-button type="primary" size="default" icon="Delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/stores/modules/category';
import { watch } from 'vue';

let categoryStore = useCategoryStore();

watch(() => categoryStore.state.c3Id, (newVal) => {
    if (newVal) {
        categoryStore.getAttr(newVal as number);
    }
}, { immediate: true });

</script>

<style></style>