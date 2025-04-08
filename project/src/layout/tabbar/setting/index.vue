<template>
    <el-button size="large" icon="refresh" circle  @click="updateRefsh"></el-button>
    <el-button size="large" icon="FullScreen" circle @click="fullScreen"></el-button>
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
<script setup lang="ts">
import useLayOutSettingStore from '@/stores/modules/setting'

let LayOutSettingStore = useLayOutSettingStore()

const updateRefsh = () => {
    LayOutSettingStore.refresh = !LayOutSettingStore.refresh;
}

let fullScreen = () => {
    let full=document.fullscreenElement;
    
    if(!full){
        document.documentElement.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
}
</script>

<script lang="ts">
export default {
    name: 'Setting'
};
</script>
