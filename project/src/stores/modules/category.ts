import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import { ref } from "vue";
import type { CategoryResponseData } from "@/api/product/attr/type";
import type { CategoryState } from "./types/type";

let useCategoryStore = defineStore("category", () => {

    const state = ref<CategoryState>(
        {
            c1Id: '',
            c1Arr: [], // 一级分类数据
            c2Id: '',
            c2Arr: [], // 二级分类数据
            c3Id: '',
            c3Arr: []
        }
    );

    const getC1 = async () => {
        let result: CategoryResponseData = await reqC1();
        if (result.code == 200) {
            state.value.c1Arr = result.data.categorys
        } else {
            console.log('获取一级分类数据失败')
        }
    }

    const getC2 = async (C1_id: number) => {
        let result: CategoryResponseData = await reqC2(C1_id);
        if (result.code == 200) {
            state.value.c2Arr = result.data.categorys
        } else {
            console.log('获取二级分类数据失败')
        }
    }

    const getC3 = async (C2_id: number) => {
        let result: CategoryResponseData = await reqC3(C2_id);
        if (result.code == 200) {
            state.value.c3Arr = result.data.categorys
        } else {
            console.log('获取三级分类数据失败')
        }
    }

    return {
        state,
        getC1,
        getC2,
        getC3
    };

});


export default useCategoryStore;