<template>

    <svg :style="{ width: width, height: height }">
        <use :href="prefix + name" :fill="color" :width="width" :height="height"></use>
    </svg>

</template>


<script setup lang="ts">
//接收父组件参数
defineProps({
    //属性值前缀
    prefix: {
        type: String,
        default: '#icon-'
    },
    //图标名称
    name: {
        type: String,
    },
    //图标颜色
    color: {
        type: String,
        default: ''
    },
    //图标大小
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }
})

</script>

<style scoped></style>
