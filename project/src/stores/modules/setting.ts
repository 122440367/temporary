import { defineStore } from 'pinia';
import { ref } from 'vue';

const useLayOutSettingStore = defineStore('SettingStore', () => {
    const fold = ref(false); // 是否折叠

    return {
        fold,
    };
});

export default useLayOutSettingStore;