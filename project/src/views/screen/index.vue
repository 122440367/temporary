<template>
    <div>
        <h2>这里什么也没有，即将导航至首页</h2>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

onMounted(() => {
    const router = useRouter();
    setTimeout(() => {
        // 5秒后跳转到原界面
        router.push({ name: 'layout' });
    }, 3000);
});
</script>

<style></style>