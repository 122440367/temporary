<template>
    <el-button size="large" icon="refresh" circle></el-button>
    <el-button size="large" icon="FullScreen" circle></el-button>
    <el-button size="large" icon="setting" circle></el-button>
    <img src="../../../../public/logo.png" style="width: 50px;height: 50px; margin:0px 20px;" />
    <el-dropdown style="margin-left: 20px;">
        <span class="el-dropdown-link">
            Admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>