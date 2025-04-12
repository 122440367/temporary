<template>
    <div>
        <el-card class="box-card">
            <!-- 控制按钮 -->
            <el-button type="primary" size="large" @click="" style="margin-bottom: 10px;">添加品牌</el-button>

            <!-- 展示表格 -->
            <el-table :border="true" :data="trademarkArr" v-loading="loading">
                <el-table-column label="序号" width="120px" align="center" type="index">
                </el-table-column>
                <el-table-column label="品牌名称" align="center" prop="tmName">
                </el-table-column>
                <el-table-column label="LOGO" align="center">
                    <template #default="{ row }">
                        <img :src="row.logoUrl" alt="品牌LOGO" style="width: 100px; height: 60px">
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="300px">
                    <template #default="{ row }">
                        <el-button type="primary" size="large" icon="Edit">编辑</el-button>
                        <el-button type="danger" size="large" icon="Delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[8, 10]"
            :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark';
import { ElMessage } from 'element-plus';
import type { Records, trademarkResponseData, reqTrademarkData } from '@/api/product/trademark/type';

let pageNo = ref<number>(1);
let pageSize = ref<number>(8);
let total = ref<number>(0);
let loading = ref<boolean>(false);

let reqData = reactive<reqTrademarkData>({
    page: pageNo.value,
    size: pageSize.value,
    tmName: ''
});

let trademarkArr = ref<Records>([]);

// 将获取品牌的接口封装为函数
const getHasTrademark = async () => {
    loading.value = true;
    try {
        reqData.page = pageNo.value;
        reqData.size = pageSize.value;

        const result: trademarkResponseData = await reqHasTrademark(reqData);
        console.log(result);
        if (result.code === 200) {
            // 请求成功，处理数据
            total.value = result.data.total;
            trademarkArr.value = result.data.records;
        } else {
            // 请求失败，处理错误
            console.error('获取品牌失败:', result.message);
            ElMessage.error(result.message || '获取品牌数据失败');
        }
    } catch (error) {
        console.error('获取品牌异常:', error);
        ElMessage.error('系统异常，请稍后重试');
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    // 组件加载完成后，调用获取品牌的函数
    getHasTrademark();
})

// 监听分页变化
const handleSizeChange = (val: number) => {
    pageSize.value = val;
    pageNo.value = 1; // 每页条数变化时，重置为第一页
    getHasTrademark();
}

const handleCurrentChange = (val: number) => {
    pageNo.value = val;
    getHasTrademark();
}
</script>

<style>
.box-card {
    margin-bottom: 20px;
}
</style>