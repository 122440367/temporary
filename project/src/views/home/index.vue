<template>
    <div>
        <h1>我是一级路由展示登陆成功后的数据 </h1>

    </div>
</template>


<script setup lang="ts">

import { onMounted } from 'vue';

import useUserStore from '@/stores/modules/user';
let userStore = useUserStore();


onMounted(() => {
   userStore.userInfo();
});
</script>

<style scoped></style>