<template>
    <div class="root">
        <el-card>
            <el-form :inline="true">
                <el-form-item label="一级分类">
                    <el-select placeholder="请选择" style="width: 150px;">
                        <el-option label="白京"></el-option>
                        <el-option label="上海"></el-option>
                        <el-option label="深圳"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="二级分类">
                    <el-select placeholder="请选择" style="width: 150px;">
                        <el-option label="白京"></el-option>
                        <el-option label="上海"></el-option>
                        <el-option label="深圳"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="三级分类">
                    <el-select placeholder="请选择" style="width: 150px;">
                        <el-option label="白京"></el-option>
                        <el-option label="上海"></el-option>
                        <el-option label="深圳"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

        </el-card>
    </div>

</template>

<script lang="ts" setup>

</script>