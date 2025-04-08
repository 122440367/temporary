<template>
    <div>
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" :key="$route.fullPath" />
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/stores/modules/setting'
import { ref, watch, nextTick } from 'vue';

let LayoutSettingStore = useLayoutSettingStore();
let flag = ref(true);
//监听仓库内部数据是否变化
watch(
    () => LayoutSettingStore.refresh,
    () => {
        flag.value = false;
        nextTick(() => {
            flag.value = true;
        });
    }
);

</script>
<script lang="ts">
export default {
    name: 'Main'
};
</script>


<style scoped lang="scss">
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
    /* 动画过渡时间 */
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>