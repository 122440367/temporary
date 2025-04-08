import { defineStore } from 'pinia';
import { ref } from 'vue';

const useLayOutSettingStore = defineStore('SettingStore', () => {
    const fold = ref(false); // 是否折叠
    const refresh = ref(false); // 是否刷新

    return {
        fold,
        refresh
    };
});

export default useLayOutSettingStore;