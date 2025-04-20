<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>


        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang="ts">

import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue';
import Setting from '@/layout/tabbar/setting/index.vue';

</script>
<script lang="ts">
export default {
    name: 'Tabbar'
};
</script>


<style lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
        font-size: 30px;

    }

    .tabbar_right {
        margin-right: 20px;
        display: flex;
        align-items: center;
    }


}
</style>