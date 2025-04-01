//引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue' //引入svg组件


//全局对象
const allGlobalcomponents = {
    SvgIcon,
}



//对外暴露插件对象
export default{
    install(app:any){
        //遍历注册全局组件
        for (const key in allGlobalcomponents) {
            //注册全局组件
            app.component(key, allGlobalcomponents[key as keyof typeof allGlobalcomponents])
        }
    }
}