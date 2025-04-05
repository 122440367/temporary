
import '@/style/index.scss' //引入全局样式
import { createApp } from 'vue'      
import ElementPlus from 'element-plus'      
import 'element-plus/dist/index.css'        //引入ElementPlus及样式
import zhCn from 'element-plus/es/locale/lang/zh-cn' //配置国际化 引入中文语言包
import App from './App.vue'
import 'virtual:svg-icons-register' //引入svg图标注册
//引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components'
import router from '@/router' //引入路由器对象
import pinia from '@/stores' //引入仓库对象

const app = createApp(App)

app.use(pinia)

//安装ElementPlus插件
app.use(ElementPlus, {
    locale: zhCn,
})


app.use(router) //安装路由器对象

//安装自定义插件
app.use(globalComponent)





app.mount('#app')
