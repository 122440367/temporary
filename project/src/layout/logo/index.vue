<template>
    <div class="logo">
        <img :src="setting.logo" alt="" v-if="!setting.logiHidden">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';

</script>
<script lang="ts">
export default {
    name: 'Logo'
};
</script>


<style scoped lang="scss">
.logo {
    width: 100%;
    height: auto;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;

    img {
        width: 120px;
        // height: 120px;
    }

    p {
        margin-left: 10px;
        font-size: $base-logo-title-fontsize;
        white-space: nowrap;
        overflow: hidden;
    }
}
</style>