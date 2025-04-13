<template>
    <div class="root">
        
        <Category></Category>
        
        <el-card style="margin:10px 0">
            <el-button type="primary" size="large" icon="Plus" style="margin: 10px 0;">添加属性</el-button>
            <el-table border>
                <el-table-column label="序号" align="center" type="index" width="120px"></el-table-column>
                <el-table-column label="属性名称" width="280px"  align="center"></el-table-column>
                <el-table-column label="属性值"  align="center"></el-table-column>
                <el-table-column label="操作" width="220px"  align="center"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script setup lang="ts">

</script>

<style></style>