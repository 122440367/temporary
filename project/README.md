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
15. 完成了顶部tabbar的静态搭建和左侧菜单折叠
16. 设置了顶部面包屑基于路由的动态展示和右侧控件的功效
17. 完成了获取用户信息的部分(利用pinia仓库 登陆后在组件挂载时带着token发请求获取用户信息(axios拦截器中将token作为公共参数)，将返回的数据存入pinia仓库并展示在页面)
18. 退出登录的业务以及路由鉴权（在路由守卫发请求获取用户信息）
19. 将mock接口替换成了真实接口并处理了一些相关业务(特别是路由鉴权部分)，更新了user仓库的代码使得local和仓库的token时刻保持一致
20. 完成了品牌管理模块的所有业务，基本熟悉了axios携带参数、发送请求、得到响应的操作和流程，加深了对前后端交互的理解以及对TS数据类型的理解和应用，**对功能模块的搭建已经基本可以脱离教学视频独立进行**
21. 属性管理的静态搭建（这几把属性管理是在干嘛）
22. 分类组件的业务搭建 (三级分类看懂了 但是这个attr是什么东西？)
23. 属性管理所有的业务和数据类型均已经完成 完全脱离了教学视频
24. 用户管理模块数据获取和展示

## 学习过程中发现的比较重要的知识点

1. v-model组件通信的本质(自己封装一些组件时要用到这部分)

## 学习时的一些心得和记录

### 1

    项目的路由页面：一级路由都在layout上通过左侧的菜单展示出来(当然有一部分页面没必要出现故隐藏),所以路由配置的component都是layout/index.vue，二级路由(最终需要展示的部分)则在layout骨架上的展示区展示各自的组件(注意路由的错误会导致页面无法正常加载 比如tmd`path`写成`Path`)  

    注意setup语法糖的默认导出 和 script手写导出的组件名称(写setting/index.vue时卡过手)

    redirect 是一个常见的 URL 查询参数，用于在用户登录后将其重定向回之前访问的页面。以下是它的工作原理和实现逻辑：

    代码解析
    $router.push:

    这是 Vue Router 提供的导航方法，用于编程式地跳转到指定的路由。
    path: '/login':

    指定跳转到的目标路由路径，这里是登录页面 /login。
    query: { redirect: $route.path }:

    query 是 URL 查询参数，类似于 ?key=value 的形式。
    redirect 是查询参数的键，$route.path 是当前页面的路径，作为值传递给 redirect。
    例如，如果用户当前在 /dashboard 页面，执行这段代码后，浏览器地址会变成：

    原理
    保存用户的原始访问路径:

    当用户未登录时，系统会将其重定向到登录页面。
    为了在登录后将用户带回原始页面，使用 redirect 参数保存当前路径。
    登录成功后处理:

    登录成功后，通常会检查 redirect 参数是否存在。
    如果存在，则通过 $router.push 或 $router.replace 将用户重定向回原始页面。
    例如，在登录逻辑中：

    如果 redirect 存在，则跳转到指定路径。
    如果 redirect 不存在，则跳转到默认路径（如首页 /）。
    应用场景
    未登录用户访问受保护页面:

    用户尝试访问需要登录的页面（如 /dashboard）。
    系统检测到用户未登录，将其重定向到 /login?redirect=/dashboard。
    用户登录后，系统读取 redirect 参数并将其带回 /dashboard。
    提升用户体验:

    避免用户登录后需要手动重新导航到之前的页面。
    注意事项
    安全性:

    确保 redirect 参数的值是受信任的路径，避免恶意重定向攻击。
    可以通过白名单或正则校验 redirect 的值。
    默认路径:

    如果 redirect 参数为空或无效，应该提供一个默认的跳转路径（如首页）。
    通过这种方式，用户体验会更加流畅，尤其是在需要登录的场景中。

### 2

trademark品牌管理页面，品牌LOGO的显示，涉及了上传图片 el-upload  后端转换路径映射并保存  后端返回映射后的相对路径 前端处理发来的相对路径 拿处理后的路径向后端获取图片 很值得一看  
目前基本掌握了前端的部分

## 遇到的bug和解决途径

### fitst

    menu.ts:162
    [Vue warn]: Component inside <Transition> renders non-element root node that cannot be animated.
    at <Index onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< null > key="/acl/user" >
    at <BaseTransition appear=false persisted=false mode=undefined ... >
    at <Transition name="fade" >
    at <RouterView >
    at <Main >
    at <Layout onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref<
    Proxy(Object) {__v_skip: true}

    at <RouterView >
    at <App>
    Promise.then
    handleMenuItemClick @ menu.ts:162 

在点击左侧菜单进行路由跳转时，第一次点击往往无效并报错，第二次点击正常跳转，但控制台会频繁报错(每次点击都报出上述警告)  
参考了别人代码后选择删掉Menu组件里goRoute的@click事件，而是在其父组件layout的el-menu组件中加了新的API配置项  `:router="true"`，到这里实现了单次点击即可跳转，但是控制台仍抛出警告  
细看警告内容发现，问题的根本原因是 `<Transition>` 组件包裹的内容不是有效的 DOM 元素，而是一个非元素根节点（如 null 或 undefined），于是找到main组件查看`<Transition>`标签，确认了配置正确后去检查了相应路由组件，最后发现当初写这些路由组件时图省事在`template`中只写了标识文字而没有写html标签，添加上div包裹后问题解决

### second

在修改路由鉴权部分时，处理“token过期导航至login界面”的逻辑时，仔细研究了一下执行流程，认定在手动修改token或者token过期情况下，由于各个钩子频繁抛出异常/错误，导致本地的token和仓库数据实际上都没有被清空，使得路由守卫无法正确处理跳转(因为这时候路由守卫还能读到token、ussername等)，最后就无法进入向登录页跳转的catch块(我估计是在这样那样的next里面不停跳了，因为带了错误的token导致userinf也好loggout也好不停抛出异常 也就导致进度条动画一直不停--因为到不了after路由守卫)(看得出来这个项目写的很屎了)

    const userLogout = async () => {
        let result = await reqLogout();
        if (result.code == 200) {
            // 退出登录成功
            state.value.token = null; // 清空 token
            state.value.username = ''; // 清空用户名
            state.value.avatar = ''; // 清空头像
            REMOVE_TOKEN(); // 删除 token
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message)); // 返回失败的 promise 对象
        }
    };
------
    const token = userStore.state.token;
    const username = userStore.state.username;

    if (token) {
        if (to.path === '/login') {
            next({ path: '/' }); // 如果访问的是登录页面，跳转到首页
        } else {
            if (username) {
                next(); // 如果用户名存在，直接放行
            } else {
                try {
                    // 如果没有用户信息，尝试获取用户信息
                    await userStore.userInfo(); 
                    next(); // 放行
                } catch (error) {
                    // 如果获取用户信息失败（如 token 过期）
                    await userStore.userLogout(); // 清除 token
                    next({ path: '/login', query: { redirect: to.path } }); // 跳转到登录页面
                }
            }
        }
    } else {
        if (to.path === '/login') {
            next(); // 如果访问的是登录页面，直接放行
        } else {
            next({ path: '/login', query: { redirect: to.path } }); // 跳转到登录页面
        }
    }

### third

在处理品牌管理的请求时不管怎么调整参数都报错 `Request Param Wrong` ，最后发现请求方法定义的不对，虽然postman测试发现post和get均可行，但是这里只能用post，似乎是因为axios的get方法没法带参数过去
