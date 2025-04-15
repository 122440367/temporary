<template>

    <el-card>
        <el-form :inline="true" class="form">

            <el-form-item label="用户名:" style="width: 55%;">
                <el-input placeholder="请输入用户名" size="default"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="large">搜索</el-button>
                <el-button type="primary" size="large">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card style="margin:10px 0">
        <el-button type="primary" size="large">添加用户</el-button>
        <el-button type="danger" size="large">批量删除</el-button>

        <el-table style="margin:10px 0" border>
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center"></el-table-column>
            <el-table-column label="userID" align="center"></el-table-column>
            <el-table-column label="用户名" align="center"></el-table-column>
            <el-table-column label="用户昵称" align="center"></el-table-column>
            <el-table-column label="用户角色" align="center"></el-table-column>
            <el-table-column label="创建时间" align="center"></el-table-column>
            <el-table-column label="更新时间" align="center"></el-table-column>
            <el-table-column label="操作" width="500px" align="center"></el-table-column>
        </el-table>

        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[8, 12]"
            :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="400" />
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let pageNo = ref<number>(1);
let pageSize = ref<number>(8);
</script>

<style scoped></style>