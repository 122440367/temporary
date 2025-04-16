<template>
    <div class="root">
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

            <el-table style="margin:10px 0" border :data="UserArray">
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
                <el-table-column label="userID" align="center" prop="id"></el-table-column>
                <el-table-column label="用户名" align="center" prop="loginId"></el-table-column>
                <el-table-column label="用户昵称" align="center" prop="nickName"></el-table-column>
                <el-table-column label="用户角色" align="center" prop="roleNms"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
                <el-table-column label="操作" width="500px" align="center">
                    <el-button type="primary" size="large" icon="User">分配角色</el-button>
                    <el-button type="primary" size="large" icon="Edit">编辑修改</el-button>
                    <el-button type="danger" size="large" icon="Delete">删除</el-button>
                </el-table-column>
            </el-table>

            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[8, 12]"
                :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total" />
        </el-card>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqAllUserInfo } from '@/api/acl/user';
import type { User } from '@/api/acl/user/type';
import { ElMessage } from 'element-plus';

let pageNo = ref<number>(1);
let pageSize = ref<number>(8);
let total = ref<number>(0);
let UserArray = ref<User[]>([]);

const getHasUser = async () => {


    let result = await reqAllUserInfo(pageNo.value, pageSize.value);

    if (result.code == 200) {
        UserArray.value = result.data.users;
        total.value = result.data.total;
    } else {
        ElMessage.error(result.message);
    }
}

onMounted(() => {
    getHasUser();
});

</script>

<style scoped></style>



<!-- 研究了一下数据库的表和接口，发现获取用户分页所返回的信息是多表联合的，回头完善页面的时候注意 -->