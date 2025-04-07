# **总结记录一下截至目前进行的内容(按照时间线) 用以了解学习大致的开发流程**

1. 自动化配置了包括**eslint、prettier**等工具
2. 集成了**element-plus** （见src/main.ts）
3. 配置了**src别名** @ (见Vite.config  alias部分)  
4. 配置了项目的环境变量 .env.development (只配置了开发环境 没有考虑生产、测试环境)  
5. **封装**了svg图标并通过自定义插件**注册**了svg全局组件(见src/components/SvgIcon) `<svg-icon>`
6. 集成了**scss**样式表(包括reset等全局样式)
7. 用**mock**实现了**登录和获取用户信息**的假接口(见mock/user.ts)
8. 对**axios进行了二次封装**，配置了请求、响应拦截器(见src/utils/request.ts)
9. 对API接口及其数据类型进行了统一管理(见src/api)
10. 配置模板路由(src/router)和页面(src/pages)
11. 引入并创建了Pinia仓库(见src/stores/index.ts~~没啥好见的其实~~) 封装了**登录业务**的方法(见src/stores/users和src/utils/token) 数据类型(见src/stores/types)
12. 登录模块的表单校验&自定义规则和时间提示
13. 封装了左侧菜单栏的组件，利用路由信息递归的展示菜单项目 顺便全局注册了elplus的组件
14. 配置了项目所有路由(注意路由命名不允许重复)

## 学习过程中发现的比较重要的知识点

1. v-model组件通信的本质(自己封装一些组件时要用到这部分)

## 学习时的一些心得

项目的路由页面：一级路由都在layout上通过左侧的菜单展示出来(当然有一部分页面没必要出现故隐藏),所以路由配置的component都是layout/index.vue，二级路由(最终需要展示的部分)则在layout骨架上的展示区展示各自的组件(注意路由的错误会导致页面无法正常加载 比如tmd`path`写成`Path`)  
