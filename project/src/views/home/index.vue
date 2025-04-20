<template>
    <div class="root">
        <el-card>
            <div class="box">
                <img :src="userStore.state.avatar" alt="头像" class="avatar" />
                <div>
                    <h2>{{ message }}</h2>
                    <h3 class="subTitle">{{ subTitle }}</h3>
                </div>
            </div>
        </el-card>
        <div class="cion">
            <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
        </div>
    </div>
</template>


<script setup lang="ts">
import useUserStore from '@/stores/modules/user';
import { getTime } from '@/utils/time';
let userStore = useUserStore();
let message = getTime() + '好' + userStore.state.username;
let subTitle = '练手半成品项目'
</script>

<style scoped>
.box {
    display: flex;

    /* align-items: center; */
    /* flex-direction: column; */
    h2 {
        font-size: 35px;
        font-family: 'Times New Roman', Times, serif;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .subTitle {
        font-size: 20px;
        color: #999;
        font-style: italic;
    }
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: inline;
    margin-right: 20px;
}

.cion {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
</style>