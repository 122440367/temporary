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

            <el-button type="primary" size="large" @click="AddUser">添加用户</el-button>
            <el-button type="danger" size="large" @click="batchDelete">批量删除</el-button>

            <el-table style="margin:10px 0" border :data="UserArray" @selection-change="handleSelectionChange">
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
                <el-table-column label="userID" align="center" prop="id"></el-table-column>
                <el-table-column label="用户账号" align="center" prop="loginId"></el-table-column>
                <el-table-column label="用户昵称" align="center" prop="nickName"></el-table-column>
                <el-table-column label="用户角色" align="center" prop="roleNms"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
                <el-table-column label="操作" width="500px" align="center">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="large" :icon="UserIcon">分配角色</el-button>
                        <el-button type="primary" size="large" icon="Edit" @click="UpdateUser(row)">编辑修改</el-button>
                        <el-button type="danger" size="large" icon="Delete" @click="DeleteUser(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[6, 8, 10]"
                :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total"
                @current-change="getHasUser" @size-change="getHasUser" />
        </el-card>

        <!-- 添加新用户以及修改用户的的抽屉 -->
        <el-drawer v-model="drawer">
            <template #header>
                <h3>添加用户</h3>
            </template>

            <el-form :model="UserInfo" :rules="rules" ref="userForm" label-width="100px">
                <el-form-item label="账号" prop="loginId" required>
                    <el-input v-model="UserInfo.loginId" placeholder="请输入账号"></el-input>
                </el-form-item>

                <el-form-item label="昵称" prop="nickName" required>
                    <el-input v-model="UserInfo.nickName" placeholder="请输入昵称"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" required>
                    <el-input v-model="UserInfo.password" type="password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="UserInfo.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="UserInfo.sex">
                        <el-radio value="男">男</el-radio>
                        <el-radio value="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="联系方式" prop="mobile">
                    <el-input v-model="UserInfo.mobile" placeholder="请输入电话号码"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" size="large" @click="confirm">确认</el-button>
                    <el-button type="danger" size="large" @click="drawer = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>



</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { reqAddUser, reqAllUserInfo, reqBatchDeleteUser, reqDeleteUser, reqUpdateUser } from '@/api/acl/user';
import type { User } from '@/api/acl/user/type';
import { ElMessage, ElMessageBox } from 'element-plus';
import { User as UserIcon } from '@element-plus/icons-vue';

let pageNo = ref<number>(1);
let pageSize = ref<number>(8);
let total = ref<number>(0);
let UserArray = ref<User[]>([]);
let drawer = ref<boolean>(false);
let UserInfo = ref<User>({
    id: -1,
    loginId: '',
    nickName: '',
    password: '',
    email: '',
    sex: '',
    mobile: '',
});
let deleteList = ref({
    userIdList: [] as string[] // 存储选中用户的 ID 列表（数组形式）
});

const rules = reactive({
    loginId: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 6, max: 15, message: '账号长度必须在6到15位之间', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度必须大于6位', trigger: 'blur' },
    ],
    email: [
        { required: false, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur'] },
    ],
});

const getHasUser = async () => {
    let result = await reqAllUserInfo(pageNo.value, pageSize.value);

    if (result.code == 200) {
        UserArray.value = result.data.users;
        total.value = result.data.total;
    } else {
        ElMessage.error(result.message);
    }
};

const handleSelectionChange = (selection: User[]) => {
    // 将选中用户的 ID 转为字符串数组
    deleteList.value.userIdList = selection.map((user) => String(user.id));
};

const batchDelete = async () => {
    if (deleteList.value.userIdList.length === 0) {
        ElMessage.warning('请先选择要删除的用户');
        return;
    }

    try {
        await ElMessageBox.confirm(`确定要删除这${deleteList.value.userIdList.length}名用户吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });

        console.log(deleteList.value);

        let result = await reqBatchDeleteUser(deleteList.value);
        if (result.code == 200) {
            ElMessage.success(result.message);
            getHasUser(); // 刷新用户列表
            deleteList.value.userIdList = []; // 清空选中项
        } else {
            ElMessage.error(result.message);
        }
    } catch (error) {

    }
};

const AddUser = () => {
    drawer.value = true;
}

const UpdateUser = (data: User) => {
    drawer.value = true;
    UserInfo.value = data;
}

const confirm = async () => {

    if (UserInfo.value.id == -1) {
        // 添加用户
        let { id, ...data } = UserInfo.value;

        let result = await reqAddUser(data);
        if (result.code == 200) {
            ElMessage.success(result.message);
            getHasUser();
            drawer.value = false;
            ClearUserInfo();
        } else {
            ElMessage.error(result.message);
        }
    } else {
        // 修改用户
        let result = await reqUpdateUser(UserInfo.value);
        if (result.code == 200) {
            ElMessage.success(result.message);
            getHasUser();
            drawer.value = false;
            ClearUserInfo();
        } else {
            ElMessage.error(result.message);
        }
    }

}

const ClearUserInfo = () => {
    UserInfo.value = {
        id: -1,
        loginId: '',
        nickName: '',
        password: '',
        email: '',
        sex: '',
        mobile: '',
    }
}

const DeleteUser = async (id: number) => {
    try {
        await ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });

        // 调用删除接口
        let result = await reqDeleteUser(id);
        if (result.code == 200) {
            ElMessage.success('删除成功');
            getHasUser(); // 刷新用户列表
        } else {
            ElMessage.error(result.message);
        }
    } catch (error) {
        ElMessage.info('取消删除');
    }
};

onMounted(() => {
    getHasUser();
});

</script>

<style scoped></style>



<!-- 研究了一下数据库的表和接口，发现获取用户分页所返回的信息是多表联合的，回头完善页面的时候注意 -->