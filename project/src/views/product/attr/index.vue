<template>
    <div class="root">

        <Category :disabled="isCategoryDisabled"></Category>

        <el-card style="margin:10px 0">

            <div v-show="scene" class="default">
                <el-button type="primary" size="large" icon="Plus" style="margin: 10px 0;"
                    :disabled="!categoryStore.state.c3Id" @click="addAttr">添加属性</el-button>
                <el-table border :data="categoryStore.state.Attrs" stripe style="width: 100%">
                    <el-table-column label="序号" align="center" type="index" width="120px" prop="id"></el-table-column>
                    <el-table-column label="属性名称" width="280px" align="center" prop="attNm"></el-table-column>
                    <el-table-column label="属性值" align="center">
                        <template #="{ row, $index }">
                            <el-tag v-for="(item, index) in row.attrValueList" :key="item.id" style="margin:5px">{{
                                item.attrValue }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="220px" align="center">
                        <template #="{ row, $index }">
                            <el-button type="primary" size="default" icon="Edit" @click="editAttr(row)">编辑</el-button>
                            <el-button type="primary" size="default" icon="Delete"
                                @click="DeleteAttr(row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div v-show="!scene" class="Operate">

                <el-form :model="AttrParam" :rules="rules" ref="attrForm" label-width="120px">
                    <el-form-item label="属性名称" prop="attNm">
                        <el-input placeholder="请输入属性名" v-model="AttrParam.attNm" style="width:70%"></el-input>
                    </el-form-item>
                    <el-form-item label="属性值">
                        <div v-for="(item, index) in AttrParam.attrValueList" :key="index"
                            style="margin-bottom: 10px; display: flex; align-items: center;">
                            <el-input v-model="item.attrValue" placeholder="请输入属性值"
                                style="width: 70%; margin-right: 10px;"></el-input>
                            <el-button type="danger" icon="Delete" @click="removeAttrValue(index)"></el-button>
                        </div>
                    </el-form-item>
                </el-form>

                <el-button type="primary" icon="Plus" @click="addAttrValue" style="margin:10px 0">添加属性值</el-button>

                <div class="bottom">    
                    <el-button type="primary" size="default" icon="Plus" @click="AddAttr">保存</el-button>
                    <el-button type="primary" size="default" @click="cancle">取消</el-button>
                </div>
            </div>
        </el-card>

        <!-- 编辑对话框 -->
        <el-dialog title="编辑属性" v-model="dialogVisible" width="50%">
            <el-form :model="AttrParam" :rules="rules" ref="attrForm" label-width="120px">
                <el-form-item label="属性名称" prop="attNm">
                    <el-input placeholder="请输入属性名" v-model="AttrParam.attNm" style="width:70%"></el-input>
                </el-form-item>
                <el-form-item label="属性值">
                    <div v-for="(item, index) in AttrParam.attrValueList" :key="index"
                        style="margin-bottom: 10px; display: flex; align-items: center;">
                        <el-input v-model="item.attrValue" placeholder="请输入属性值"
                            style="width: 70%; margin-right: 10px;"></el-input>
                        <el-button type="danger" icon="Delete" @click="removeAttrValue(index)"></el-button>
                    </div>
                </el-form-item>
            </el-form>

            <el-button type="primary" icon="Plus" @click="addAttrValue" style="margin:10px 0">添加属性值</el-button>

            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveAttr">保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reqAddAttr, reqDeleteAttr, reqUpdateAttr } from '@/api/product/attr';
import useCategoryStore from '@/stores/modules/category';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, reactive, watch } from 'vue';
import { debounce } from 'lodash-es';

let categoryStore = useCategoryStore();

watch(
    () => categoryStore.state.c3Id,
    debounce((newVal) => {
        if (newVal) {
            categoryStore.getAttr(newVal as number);
        }
    }, 300),
    { immediate: true }
);

let scene = ref(true);
const dialogVisible = ref(false); // 控制对话框显示状态
const attrForm = ref();
const isCategoryDisabled = ref(false);
const AttrParam = ref({
    categoryId: categoryStore.state.c3Id,
    attNm: '',
    attrValueList: [
        {
            attrValue: ''
        }
    ]
});

const rules = reactive({
    attNm: [{ required: true, message: '请输入属性名称', trigger: 'blur' }],
    attrValueList: [
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value.length === 0) {
                    callback(new Error('请至少添加一个属性值'));
                } else {
                    callback();
                }
            },
            trigger: 'change'
        }
    ]
});

const resetForm = () => {
    AttrParam.value.attNm = '';
    AttrParam.value.attrValueList = [
        {
            attrValue: ''
        }
    ];
};

const addAttr = () => {
    isCategoryDisabled.value = true; // 禁用下拉菜单
    scene.value = false;
};

const editAttr = (row: any) => {
    // 将选中的属性信息赋值给 AttrParam
    AttrParam.value = {
        categoryId: categoryStore.state.c3Id,
        attNm: row.attNm,
        attrValueList: row.attrValueList.map((item: any) => ({
            attrValue: item.attrValue
        }))
    };
    // 打开对话框
    dialogVisible.value = true;
};

const saveAttr = async () => {
    // 检查属性值是否重复
    const values = AttrParam.value.attrValueList.map((item) => item.attrValue.trim());
    const hasDuplicateValues = values.some((value, index) => values.indexOf(value) !== index);

    if (hasDuplicateValues) {
        ElMessage.error('属性值存在重复，请修改后再保存');
        return;
    }

    const valid = await attrForm.value.validate().catch(() => false);
    if (!valid) return;

    let TempParam = {
        ...AttrParam.value,
        id: categoryStore.state.Attrs.find(attr => attr.attNm === AttrParam.value.attNm)?.id || null
    };
    let result = await reqUpdateAttr(TempParam);

    if (result.code === 200) {
        ElMessage.success('保存成功');
        resetForm();
        dialogVisible.value = false; // 关闭对话框
        categoryStore.getAttr(categoryStore.state.c3Id as number);
    } else {
        ElMessage.error(result.message);
    }
    isCategoryDisabled.value = false; // 恢复下拉菜单
    scene.value = true;
};

const AddAttr = async () => {
    const isDuplicate = categoryStore.state.Attrs.some(
        (attr) => attr.attNm === AttrParam.value.attNm
    );
    if (isDuplicate) {
        ElMessage.error('属性名称已存在，请勿重复添加');
        return;
    }

    const valid = await attrForm.value.validate().catch(() => false);
    if (!valid) return;

    AttrParam.value.categoryId = categoryStore.state.c3Id;
    let result = await reqAddAttr(AttrParam.value);

    if (result.code === 200) {
        ElMessage.success('添加成功');
        resetForm();
    } else {
        ElMessage.error(result.message);
    }
    scene.value = true;
    categoryStore.getAttr(categoryStore.state.c3Id as number);
    isCategoryDisabled.value = false; // 恢复下拉菜单
};

const cancle = () => {
    isCategoryDisabled.value = false; // 恢复下拉菜单
    scene.value = true;
    resetForm();
};

const addAttrValue = () => {
    AttrParam.value.attrValueList.push({ attrValue: '' });
};

const removeAttrValue = (index: number) => {
    if (AttrParam.value.attrValueList.length <= 1) {
        ElMessage.warning('至少需要一个属性值');
        return;
    }
    AttrParam.value.attrValueList.splice(index, 1);
};

const DeleteAttr = async (id: number) => {
    ElMessageBox.confirm('确定要删除该属性吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            const result = await reqDeleteAttr(id);
            if (result.code === 200) {
                ElMessage.success('删除成功');
                categoryStore.getAttr(categoryStore.state.c3Id as number);
            } else {
                ElMessage.error(result.message);
            }
        })
        .catch(() => {
            ElMessage.info('已取消删除');
        });
};
</script>

<style></style>