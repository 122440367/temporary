<template>
    <div>
        <h1>我是一级路由展示登陆成功后的数据 </h1>

    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import { GET_TOKEN } from '@/utils/token';

let $router = useRouter();

const redirect = () => {
    // 获取 token
    const token = GET_TOKEN();
    console.log(token);
    // 如果没有 token，跳转到登录页面
    if (!token) {
        $router.push('/login'); // 使用 Vue Router 的编程式导航
    }
};

// 调用函数
redirect();
</script>

<style scoped></style>