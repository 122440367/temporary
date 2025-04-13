//引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue' //引入svg组件
import * as ElIcon from '@element-plus/icons-vue' //引入element-plus的图标组件
import Category from './Category/index.vue' //引入分类组件
//全局对象
const allGlobalcomponents = {
    SvgIcon,
    Category
}




//对外暴露插件对象
export default{
    install(app:any){
        //遍历注册全局组件
        for (const key in allGlobalcomponents) {
            //注册全局组件
            app.component(key, allGlobalcomponents[key as keyof typeof allGlobalcomponents])
        }
        //遍历注册element-plus的图标组件
        for (const key in ElIcon) {
            //注册全局组件
            app.component(key, ElIcon[key as keyof typeof ElIcon])
        } 
    }
}