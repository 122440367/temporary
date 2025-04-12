<template>
    <div>
        <el-card class="box-card">
            <!-- 控制按钮 -->
            <el-button type="primary" size="large" style="margin-bottom: 10px;" @click="addTradeMark">添加品牌</el-button>

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
                        <el-button type="primary" size="large" icon="Edit"
                            @click="UpdateTrademark(row.id)">编辑</el-button>
                        <el-button type="danger" size="large" icon="Delete"
                            @click="deleteTrademark(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[8, 10]"
            :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>


    <!-- 对话框组件 -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌" width="500">
        <el-form style="width: 80%;">
            <el-form-item label="品牌名称" label-width="80px">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="品牌Logo" label-width="80px">
                <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="备注" label-width="80px"></el-form-item>
        </el-form>

        <template #footer>
            <el-button type="primary" size="large" @click="cancel">取消</el-button>
            <el-button type="primary" size="large" @click="confirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { reqHasTrademark, reqdeleteTrademark, reqUpdateTrademark } from '@/api/product/trademark';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Records, trademarkResponseData, reqTrademarkData, UpdateTrademarkData } from '@/api/product/trademark/type';

let pageNo = ref<number>(1);
let pageSize = ref<number>(8);
let total = ref<number>(0);
let loading = ref<boolean>(false);
let dialogFormVisible = ref<boolean>(false);

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

        if (result.code === 200) {
            // 请求成功，处理数据
            total.value = result.data.total;
            trademarkArr.value = result.data.records;
        } else {
            // 请求失败，处理错误
            ElMessage.error(result.message || '获取品牌数据失败');
        }
    } catch (error) {
        ElMessage.error('系统异常，请稍后重试');
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    // 组件加载完成后，调用获取品牌的函数
    getHasTrademark();
})

const addTradeMark = () => {
    // 打开添加品牌的对话框
    dialogFormVisible.value = true;

}

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

//删除品牌
const deleteTrademark = async (id: number) => {
    try {
        // 添加确认对话框
        await ElMessageBox.confirm(`确定要删除这个品牌吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        });

        // 用户点击确认后，执行删除操作
        const result = await reqdeleteTrademark(id);
        if (result.code === 200) {
            ElMessage.success('删除成功');
            // 删除成功后，重新获取品牌列表
            // 如果当前页只有一条数据，且不是第一页，则删除后自动跳转到前一页
            if (trademarkArr.value.length === 1 && pageNo.value > 1) {
                pageNo.value--;
            }
            getHasTrademark();
        } else {
            ElMessage.error(result.message || '删除失败');
        }
    } catch (error) {
        // 捕获取消删除的操作，不需要显示错误信息
        if (error !== 'cancel') {
            ElMessage.error('系统异常，请稍后重试');
        }
    }
}

//未完成
const UpdateTrademark = async (id: number) => {
    let data: UpdateTrademarkData = {
        id: 0,
        tmName: '',
        logoUrl: '',
        remark: ''
    }
    dialogFormVisible.value = true;
    const result = await reqUpdateTrademark(data);
}

const cancel = () => {
    // 关闭对话框
    dialogFormVisible.value = false;
}
const confirm = () => {
    // 提交表单数据
    // 关闭对话框
    dialogFormVisible.value = false;
}
</script>


<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.box-card {
    margin-bottom: 20px;
}
</style>