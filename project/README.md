**总结记录一下截至目前进行的内容(按照时间线) 用以了解学习大致的开发流程**  
1. 自动化配置了包括**eslint、prettier**等工具
2. 集成了**element-plus** （见src/main.ts）
3. 配置了**src别名** @ (见Vite.config  alias部分)  
4. 配置了项目的环境变量 .env.development (只配置了开发环境 没有考虑生产、测试环境)  
5. **封装**了svg图标并通过自定义插件**注册**了svg全局组件(见src/components/SvgIcon) `<svg-icon>`
6. 集成了**scss**样式表(包括reset等全局样式)
7. 用**mock**实现了**登录和获取用户信息**的假接口(见mock/user.ts)
8. 对**axios进行了二次封装**，配置了请求、响应拦截器(见src/utils/request.ts)
9. 对API接口及其数据类型进行了统一管理(见src/api)
10.  配置模板路由(src/router)和页面(src/pages)

