<template>
    <div class="root">
        <el-card>
            <el-form :inline="true">

                <el-form-item label="一级分类">
                    <el-select placeholder="请选择" style="width: 150px;" v-model="categoryStore.state.c1Id"
                        @change="getC2" :loading="loading" :disabled="disabled">
                        <el-option v-for="(c1, index) in categoryStore.state.c1Arr" :key="c1.id" :label="c1.caNm"
                            :value="c1.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="二级分类">
                    <el-select placeholder="请选择" style="width: 150px;" v-model="categoryStore.state.c2Id"
                        @change="getC3" :loading="loading" :disabled="disabled">
                        <el-option v-if="categoryStore.state.c2Arr.length > 0"
                            v-for="(c2, index) in categoryStore.state.c2Arr" :key="c2.id" :label="c2.caNm"
                            :value="c2.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="三级分类">
                    <el-select placeholder="请选择" style="width: 150px;" v-model="categoryStore.state.c3Id"
                        :loading="loading" :disabled="disabled">
                        <el-option v-if="categoryStore.state.c3Arr.length > 0"
                            v-for="(c3, index) in categoryStore.state.c3Arr" :key="c3.id" :label="c3.caNm"
                            :value="c3.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import useCategoryStore from '@/stores/modules/category';

// 接收父组件传递的 disabled 属性
defineProps({
    disabled: {
        type: Boolean,
        default: false
    }
});

let categoryStore = useCategoryStore();
const loading = ref(false);

const getC1 = async () => {
    try {
        loading.value = true;
        await categoryStore.getC1();
    } catch (error) {
        console.error("获取一级分类失败:", error);
    } finally {
        loading.value = false;
    }
};

const getC2 = async () => {
    try {
        if (!categoryStore.state.c1Id) {
            console.warn("未选择一级分类，无法获取二级分类");
            return;
        }
        loading.value = true;
        categoryStore.state.c2Id = '';
        categoryStore.state.c2Arr = [];
        categoryStore.state.c3Id = '';
        categoryStore.state.c3Arr = [];
        await categoryStore.getC2(categoryStore.state.c1Id as number);
    } catch (error) {
        console.error("获取二级分类失败:", error);
    } finally {
        loading.value = false;
    }
};

const getC3 = async () => {
    try {
        if (!categoryStore.state.c2Id) {
            console.warn("未选择二级分类，无法获取三级分类");
            return;
        }
        loading.value = true;
        categoryStore.state.c3Id = '';
        categoryStore.state.c3Arr = [];
        await categoryStore.getC3(categoryStore.state.c2Id as number);
    } catch (error) {
        console.error("获取三级分类失败:", error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    getC1();
});
</script>