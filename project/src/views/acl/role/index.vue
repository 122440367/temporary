<template>
    <div class="root">
        <el-card>
            <el-form :inline="true" class="form">

                <el-form-item label="角色名称:" style="width: 55%;">
                    <el-input placeholder="请输入角色名称" size="default" v-model="SearchKeyWord"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="large" @click="Search">搜索</el-button>
                    <el-button type="primary" size="large" @click="Reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin:10px 0">

            <el-button type="primary" size="large" @click="AddRole">添加角色</el-button>
            <!-- <el-button type="danger" size="large">批量删除</el-button> -->

            <el-table style="margin:10px 0" border :data="RolesArray">
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
                <el-table-column label="roleID" align="center" prop="id"></el-table-column>
                <el-table-column label="角色名称" align="center" prop="rName"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
                <el-table-column label="操作" width="500px" align="center">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="large" icon="User"
                            @click="AssignPermission(row.id)">分配权限</el-button>
                        <el-button type="primary" size="large" icon="Edit" @click="EditRole(row)">编辑</el-button>
                        <el-button type="danger" size="large" icon="Delete" @click="DeleteRole(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[6, 8, 10]"
                :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total"
                @current-change="getHasRole" @size-change="getHasRole" />
        </el-card>

        <!-- 添加/修改角色的对话框 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle">
            <el-form :model="RoleParam" :rules="rules" ref="roleForm" label-width="100px">
                <el-form-item label="角色名称：" style="width: 60%; margin-top: 10px;" prop="rName">
                    <el-input placeholder="请输入角色名称" style="width:60%" v-model="RoleParam.rName"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="danger" size="large" @click="Cancle">取消</el-button>
                <el-button type="success" size="large" @click="Confirm">确认</el-button>
            </template>
        </el-dialog>


        <!-- 分配权限的抽屉 -->
        <el-drawer v-model="drawer">
            <template #header>
                <h3>分配权限</h3>
            </template>

            <template #default>
                <!-- 树形控件 -->
                <el-tree ref="treeRef" :data="AllMenusArray" node-key="menuId" :props="treeProps" show-checkbox
                    default-expand-all check-strictly>
                </el-tree>
            </template>

            <template #footer>
                <el-button type="danger" size="large" @click="CancleAssign">取消</el-button>
                <el-button type="success" size="large" @click="ConfirmAssign">保存</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { reqAddRole, reqAssignMenu, reqDeleteRole, reqGetAllMenus, reqGetRoleMenus, reqGetRolePage, reqUpdateRole } from '@/api/acl/role';
import type { Menu, Role } from '@/api/acl/role/type';
import { ElMessage, ElMessageBox } from 'element-plus';
import { nextTick, onMounted, ref } from 'vue';




let pageNo = ref(1);
let pageSize = ref(8);
let total = ref(0);
let RolesArray = ref<Role[]>([]);
let SearchKeyWord = ref('');
let dialogVisible = ref<boolean>(false);
let dialogTitle = ref<string>('添加角色');
let RoleParam = ref<Role>({
    id: -1,
    rName: '',
});
let drawer = ref<boolean>(false); // 抽屉的显示状态
const roleForm = ref(); // 表单引用
const rules = {
    rName: [
        { required: true, message: '角色名称不能为空', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符之间', trigger: 'blur' },
    ],
};
let AllMenusArray = ref<Menu[]>([]); // 所有菜单的数组
const treeProps = {
    children: 'childrenList', // 子节点字段
    label: 'menuName', // 显示的节点名称字段
};
const RoleId = ref<number>(-1); // 角色ID
const treeRef = ref(); // 树形控件的引用

const getHasRole = async () => {
    let result = await reqGetRolePage(pageNo.value, pageSize.value);
    if (result.code == 200) {
        RolesArray.value = result.data.roles;
        total.value = result.data.total;
    } else {
        ElMessage.error(result.message);
    }
};

const Search = async () => {
    pageNo.value = 1; // 重置页码为1
    let result = await reqGetRolePage(pageNo.value, pageSize.value, SearchKeyWord.value);
    if (result.code == 200) {
        RolesArray.value = result.data.roles;
        total.value = result.data.total;
    } else {
        ElMessage.error(result.message);
    }
};

const Reset = () => {
    pageNo.value = 1; // 重置页码为1
    SearchKeyWord.value = '';
    getHasRole();
};

const AddRole = () => {
    dialogVisible.value = true;
    dialogTitle.value = '添加角色';
    roleForm.value?.resetFields(); // 重置表单校验状态
    clearRoleParam(); // 清空表单数据
};

const EditRole = (data: Role) => {
    dialogVisible.value = true;
    dialogTitle.value = '编辑角色';
    roleForm.value?.resetFields(); // 重置表单校验状态
    RoleParam.value = { ...data }; // 填充表单数据
};

const clearRoleParam = () => {
    RoleParam.value = {
        id: -1,
        rName: '',
    };
};

const Cancle = () => {
    dialogVisible.value = false;
    clearRoleParam();
};

const Confirm = async () => {
    const valid = await roleForm.value.validate().catch(() => false); // 校验表单
    if (!valid) {
        ElMessage.error('请填写完整的角色信息');
        return;
    }

    if (RoleParam.value.id === -1) {
        // 添加角色
        let { id, ...data } = RoleParam.value; // 解构赋值，去掉id属性
        let result = await reqAddRole(data);
        if (result.code == 200) {
            ElMessage.success('角色添加成功');
        } else {
            ElMessage.error(result.message);
        }
        dialogVisible.value = false;
        clearRoleParam();
        getHasRole(); // 重新获取角色列表
        pageNo.value = total.value; // 跳转到最后一页
    } else {
        // 修改角色
        let result = await reqUpdateRole(RoleParam.value);
        if (result.code == 200) {
            ElMessage.success('角色修改成功');
        } else {
            ElMessage.error(result.message);
        }
        dialogVisible.value = false;
        getHasRole(); // 重新获取角色列表
        clearRoleParam();
    }
};

const DeleteRole = async (id: number) => {
    try {
        // 弹出确认框，提示用户是否确认删除
        await ElMessageBox.confirm('确定要删除该角色吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });

        // 调用删除角色接口
        let result = await reqDeleteRole(id);
        if (result.code === 200) {
            ElMessage.success('角色删除成功');
            getHasRole(); // 重新获取角色列表
        } else {
            ElMessage.error(result.message || '删除失败');
        }
    } catch (error) {
        // 捕获用户取消操作或其他错误
        ElMessage.info('已取消删除');
    }
};

const getHasMenus = async () => {
    let result = await reqGetAllMenus();
    if (result.code == 200) {
        AllMenusArray.value = result.data.menus; // 获取所有菜单的数组
    } else {
        ElMessage.error(result.message);
    }
};

// 递归提取所有 menuId
const extractMenuIds = (menus: Menu[]): number[] => {
    const ids: number[] = [];
    menus.forEach((menu) => {
        ids.push(menu.menuId); // 添加当前节点的 menuId
        if (menu.childrenList && menu.childrenList.length > 0) {
            ids.push(...extractMenuIds(menu.childrenList)); // 递归提取子节点的 menuId
        }
    });
    return ids;
};

/// 分配权限相关的方法
const AssignPermission = async (id: number) => {
    RoleId.value = id; // 设置角色ID

    drawer.value = true;
    let result = await reqGetRoleMenus(id);
    if (result.code == 200) {
        // 递归提取所有 menuId
        const checkedKeys = extractMenuIds(result.data.menus);
        treeRef.value.setCheckedKeys(checkedKeys); // 设置选中的节点
    } else {
        ElMessage.error(result.message);
    }

};

const CancleAssign = () => {
    RoleId.value = -1; // 清空角色ID
    drawer.value = false;
};

const ConfirmAssign = async () => {
    if (!treeRef.value) {
        ElMessage.error('树形控件未绑定');
        return;
    }

    // 获取选中的节点
    const checkedKeys = treeRef.value.getCheckedKeys(); // 获取选中的节点ID

    // 获取所有祖先节点的 menuId
    const getAncestorKeys = (nodeKey: number, menus: Menu[]): number[] => {
        const ancestors: number[] = [];
        const findAncestors = (key: number, nodes: Menu[]) => {
            for (const node of nodes) {
                if (node.childrenList?.some((child) => child.menuId === key)) {
                    ancestors.push(node.menuId); // 添加父节点ID
                    findAncestors(node.menuId, menus); // 递归查找更高层的父节点
                }
                // 递归查找子节点
                if (node.childrenList && node.childrenList.length > 0) {
                    findAncestors(key, node.childrenList);
                }
            }
        };
        findAncestors(nodeKey, menus);
        return ancestors;
    };

    // 遍历所有选中的节点，获取其祖先节点
    let allKeys = [...checkedKeys];
    checkedKeys.forEach((key: number) => {
        const ancestors = getAncestorKeys(key, AllMenusArray.value);
        allKeys.push(...ancestors); // 合并祖先节点ID
    });

    // 去重
    allKeys = [...new Set(allKeys)];

    let data = {
        id: RoleId.value,
        menuList: allKeys, // 包含选中节点及其祖先节点的菜单ID
    };

    console.log('分配权限数据:', data);

    let result = await reqAssignMenu(data);
    if (result.code == 200) {
        ElMessage.success('分配权限成功');
    } else {
        ElMessage.error(result.message);
    }

    RoleId.value = -1; // 清空角色ID
    drawer.value = false;
};

onMounted(() => {
    getHasRole();
    getHasMenus();
});
</script>

<style></style>