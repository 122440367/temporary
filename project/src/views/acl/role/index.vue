<template>
    <div class="root">
        <el-card>
            <el-form :inline="true" class="form">

                <el-form-item label="角色名称:" style="width: 55%;">
                    <el-input placeholder="请输入角色名称" size="default"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="large">搜索</el-button>
                    <el-button type="primary" size="large">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin:10px 0">

            <el-button type="primary" size="large">添加角色</el-button>

            <el-table style="margin:10px 0" border :data="RolesArray">
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
                <el-table-column label="roleID" align="center" prop="id"></el-table-column>
                <el-table-column label="角色名称" align="center" prop="rName"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
                <el-table-column label="操作" width="500px" align="center">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="large" icon="User">分配权限</el-button>
                        <el-button type="primary" size="large" icon="Edit">编辑</el-button>
                        <el-button type="danger" size="large" icon="Delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[6, 8, 10]"
                :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total"
                @current-change="getHasRole" @size-change="getHasRole" />
        </el-card>



    </div>
</template>

<script setup lang="ts">
import { reqGetRolePage } from '@/api/acl/role';
import type { Role } from '@/api/acl/role/type';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';


let pageNo = ref(1);
let pageSize = ref(8);
let total = ref(0);
let RolesArray = ref<Role[]>([]);


const getHasRole = async () => {
    let result = await reqGetRolePage(pageNo.value, pageSize.value);
    if (result.code == 200) {
        RolesArray.value = result.data.roles;
        total.value = result.data.total;
    } else {
        ElMessage.error(result.message);
    }
}

onMounted(() => {
    getHasRole();
});
</script>

<style></style>