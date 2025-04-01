

import { createApp } from 'vue'
import { createPinia } from 'pinia'
//引入ElementPlus及样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//配置element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn' //引入中文语言包

import App from './App.vue'


const app = createApp(App)

app.use(createPinia())

//安装ElementPlus插件
app.use(ElementPlus, {
    locale: zhCn,
})

// console.log(import.meta.env) //获取当前环境变量

import 'virtual:svg-icons-register' //引入svg图标注册

app.mount('#app')
