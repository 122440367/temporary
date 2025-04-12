<template>
    <div class="root">
        <div>
        <el-card class="box-card">
            <!-- 顶部操作栏 -->
            <div class="operation-bar">
                <!-- 左侧按钮 -->
                <div class="left-operation">
                    <el-button type="primary" size="large" @click="addTradeMark">添加品牌</el-button>
                </div>
                
                <!-- 右侧搜索区域 -->
                <div class="right-search">
                    <el-input 
                        v-model="reqData.tmName" 
                        placeholder="请输入品牌名称"
                        style="width: 300px; margin-right: 10px;"
                        clearable
                        @clear="getHasTrademark"
                    ></el-input>
                    <el-button type="primary" size="large" @click="getHasTrademark">搜索</el-button>
                </div>
            </div>
            
            <!-- 展示表格 -->
            <el-table :border="true" :data="trademarkArr" v-loading="loading">
                <el-table-column label="序号" width="120px" align="center" type="index">
                </el-table-column>
                <el-table-column label="品牌名称" align="center" prop="tmName">
                </el-table-column>
                <el-table-column label="LOGO" align="center">
                    <template #default="{ row }">
                        <img :src="handleImageUrl(row.logoUrl)" alt="品牌LOGO" style="width: 100px; height: 60px"
                            @error="handleImageError">
                    </template>
                </el-table-column>
                <el-table-column label="备注" align="center" prop="remark" width="600px">
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
    <el-dialog v-model="dialogFormVisible" :title="Param.id === -1 ? '添加品牌' : '修改品牌'" width="500">
        <!-- 将表单宽度调整为100%，并设置label-position为left -->
        <el-form ref="trademarkFormRef" style="width: 100%;" label-position="left" :rules="rules" :model="Param">
            <el-form-item label="品牌名称" label-width="80px" prop="tmName">
                <el-input v-model="Param.tmName" placeholder="请输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌Logo" label-width="80px" prop="logoUrl">
                <el-upload class="avatar-uploader" action="/api/comm/file/upload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="Param.logoUrl" :src="handleImageUrl(Param.logoUrl)" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="备注" label-width="80px">
                <el-input v-model="Param.remark" type="textarea" rows="3" placeholder="请输入备注信息"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </template>
    </el-dialog>

    </div>
    
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'; // 引入 watch
import { reqHasTrademark, reqdeleteTrademark, reqUpdateTrademark, reqAddTrademark } from '@/api/product/trademark';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Records, trademarkResponseData, reqTrademarkData } from '@/api/product/trademark/type';
import type { UploadProps } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

// 添加表单引用
const trademarkFormRef = ref<FormInstance | null>(null);

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

const Param = reactive({
    id: -1,
    tmName: '',
    logoUrl: '',
    remark: ''
});

let trademarkArr = ref<Records>([]);

// 表单验证规则
const rules = reactive<FormRules>({
    tmName: [
        { required: true, message: '请输入品牌名称', trigger: 'blur' },
        { min: 2, max: 20, message: '品牌名称长度在2到20个字符之间', trigger: 'blur' }
    ],
    logoUrl: [
        { required: true, message: '请上传品牌Logo', trigger: 'change' }
    ]
});

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
    // 重置表单数据
    Param.id = -1;
    Param.tmName = '';
    Param.logoUrl = '';
    Param.remark = '';
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

// 编辑品牌
const UpdateTrademark = async (id: number) => {
    try {
        // 获取当前要编辑的品牌数据
        const currentTrademark = trademarkArr.value.find(item => item.id === id);
        if (currentTrademark) {
            // 将数据赋值给表单
            Param.id = currentTrademark.id ?? -1;
            Param.tmName = currentTrademark.tmName;
            Param.logoUrl = currentTrademark.logoUrl ?? '';
            Param.remark = currentTrademark.remark || '';
            // 打开对话框
            dialogFormVisible.value = true;
        } else {
            ElMessage.error('未找到要编辑的品牌数据');
        }
    } catch (error) {
        console.error('编辑品牌时出错:', error);
        ElMessage.error('系统异常，请稍后重试');
    }
}

const cancel = () => {
    // 关闭对话框
    dialogFormVisible.value = false;
}
const confirm = async () => {
    // 表单验证
    if (!trademarkFormRef.value) return;

    await trademarkFormRef.value.validate(async (valid, fields) => {
        if (valid) {
            // 表单验证通过，执行添加或修改操作
            dialogFormVisible.value = false;

            if (Param.id == -1) {
                let data = {
                    tmName: Param.tmName,
                    logoUrl: Param.logoUrl,
                    remark: Param.remark
                }
                let result = await reqAddTrademark(data);
                if (result.code === 200) {
                    ElMessage.success('添加成功');
                    getHasTrademark();
                } else {
                    ElMessage.error(result.message || '添加失败');
                }
            } else {
                let result = await reqUpdateTrademark(Param);
                if (result.code === 200) {
                    ElMessage.success('修改成功');
                    getHasTrademark();
                } else {
                    ElMessage.error(result.message || '修改失败');
                }
                Param.id = -1;
            }
        } else {
            console.log('表单验证失败:', fields);
        }
    });
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const isImage = rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/jpg';
    const isLt4MB = rawFile.size / 1024 / 1024 < 4;

    if (!isImage) {
        ElMessage.error('上传头像图片只能是 JPG、PNG 格式!');
        return false;
    }
    if (!isLt4MB) {
        ElMessage.error('上传头像图片大小不能超过 4MB!');
        return false;
    }
    return true;
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    console.log('上传响应:', response);
    if (response.code === 200) {
        // 存储相对路径，不包含域名前缀
        let imgUrl = response.data.imgUrl;

        // 如果返回的URL包含域名前缀，需要移除
        if (imgUrl.startsWith('http://localhost:9006/')) {
            imgUrl = imgUrl.substring('http://localhost:9006/'.length);
        }

        Param.logoUrl = imgUrl;
        console.log('设置的图片路径:', Param.logoUrl);
    } else {
        ElMessage.error('上传失败: ' + (response.message || '未知错误'));
    }
}

// 处理图片URL，添加前缀
const handleImageUrl = (url: string): string => {
    if (!url) return '';

    // 如果已经是完整的URL（以http或https开头），则直接返回
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // 去除可能存在的前导斜杠
    const cleanUrl = url.replace(/^\/+/, '');

    // 添加前缀
    return `http://localhost:9006/${cleanUrl}`;
}

// 处理图片加载错误
const handleImageError = (e: Event) => {
    console.error('图片加载失败:', (e.target as HTMLImageElement).src);
    // 可以设置一个默认图片
    // (e.target as HTMLImageElement).src = '/default-image.png';
}

// 添加 watch 监听搜索内容变化
watch(() => reqData.tmName, (newValue, oldValue) => {
    // 当搜索内容被清空时，自动执行搜索
    if (newValue === '' && oldValue !== '') {
        // 重置到第一页
        pageNo.value = 1;
        getHasTrademark();
    }
});
</script>


<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

/* 添加新的样式 */
.operation-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.left-operation {
    /* 左侧按钮区域样式 */
}

.right-search {
    display: flex;
    align-items: center;
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