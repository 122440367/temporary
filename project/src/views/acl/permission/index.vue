<template>
    <div class="class">
        <el-table :data="MenusArray" row-key="menuId" :tree-props="{ children: 'childrenList' }" border
            default-expand-all:false>
            <el-table-column prop="menuId" label="ID" align="left" width="100px"></el-table-column>
            <el-table-column label="名称" align="center">
                <template #default="{ row }">
                    <span :style="{ paddingLeft: `${row.level * 20}px` }">
                        {{ row.menuName }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="compName" label="权限值" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="{ row }">
                    <el-button size="default" :disabled="row.level === 2 ? true : false" type="primary" @click="Alert">
                        {{ row.level === 0 ? '添加菜单' : '添加功能' }}
                    </el-button>
                    <el-button type="primary" size="default" @click="Alert">编辑</el-button>
                    <el-button type="danger" size="default" @click="Alert">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog></el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reqGetList } from '@/api/acl/menu';
import type { Menu } from '@/api/acl/menu/type';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

let MenusArray = ref<Menu[]>([]);

const getHasMenus = async () => {
    let result = await reqGetList();
    if (result.code === 200) {
        MenusArray.value = result.data.menuList; // 将接口返回的数据赋值给 MenusArray
    } else {
        ElMessage.error(result.message);
    }
};

const Alert = () => {
    ElMessage({
        type: 'warning',
        message: '感觉这些CRUD没有意义，不重复写了',
    });
};

onMounted(() => {
    getHasMenus();
});
</script>

<style></style>