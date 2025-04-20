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
25. 完成了用户管理模块除了角色分配、按角色搜索以外所有业务(角色分配的后端结构还没看明白 只有一个初步的大概印象)
26. 完成了用户管理模块角色分配业务(涉及好几个后端接口，但是向后端发请求已经轻车熟路~~所以不难~~，进一步感受到了TS约束数据类型的好处，出现了错误改一下数据类型就能把相关的地方全部提示出来)
27. 用户管理模块完成
28. 角色管理静态搭建和数据展示完成(静态搭建也可以脱离视频独立完成了)
29. 角色管理的各项业务全部完成(脱离视频)，但是对某些组件的使用还依赖copilot
30. 路由权限完成

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

### forth

处理用户管理的批量删除的内容时一直报Request Param Wrong,问Ai得知axios的delete方法不支持直接传递请求体数据。需要通过 data 属性传递请求体。

`
export const reqBatchDeleteUser = (data: any) =>
request.delete<any, Response>(API.BATCHDELETE, { data });
`

修改用户信息模块，前端接收到后端加密后的密码串，又作为修改后的新密码传入了后端，导致功能与期望不符，对此做了一定调整：  
将前端回显的密码设置为"******"(不再显性显示加密后的密码串) 像后端发请求时，如果没有对密码做修改则在请求体中去掉password字段(设为undefined)成功解决了该问题

### fifth

在acl的修改业务中 如果已经对名称之类的信息做了修改，即使点击取消也会导致页面显示错误  
sln1：取消后再发一次请求刷新页面数据(虽然我实际采取了该方案，但是这样会导致频繁发送网络请求，可能不是一个很好的实际方案)  
sln2：利用一个临时变量保存原始数据，如果最后取消了修改，将参数赋值为原始数据
后记：有了更好的解决方案`RoleParam.value = { ...data };`

    这行代码是用来将一个对象 `data` 的属性复制到 `RoleParam.value` 中。它使用了 JavaScript 的**对象展开运算符**（`...`），这是 ES6 中引入的一种语法，用于浅拷贝对象的属性。

    RoleParam.value = { ...data };
       - `{ ...data }` 是对象展开语法，表示将 `data` 对象的所有可枚举属性复制到一个新的对象中。
       - 这会创建一个新的对象，而不是直接引用 `data`，从而避免直接修改原始对象。

       - 将展开后的新对象赋值给 `RoleParam.value`，从而更新 `RoleParam` 的值。

    这种写法通常用于以下场景：
    1. **响应式数据更新**:
       - 在 Vue 3 中，直接修改 `ref` 的 `.value` 会触发视图更新。
       - 使用 `{ ...data }` 可以确保 `RoleParam.value` 是一个新的对象，从而触发 Vue 的响应式系统。

    2. **避免引用问题**:
       - 如果直接赋值 `RoleParam.value = data`，那么 `RoleParam.value` 和 `data` 会共享同一个引用，修改其中一个会影响另一个。
       - 使用 `{ ...data }` 创建了一个浅拷贝，避免了这种问题。

    3. **浅拷贝**:
       - 对象展开运算符只会进行浅拷贝。如果 `data` 中有嵌套对象或数组，嵌套部分仍然是引用。
       - 如果需要深拷贝，可以使用工具库（如 Lodash 的 `cloneDeep`）或 JSON 方法：

         RoleParam.value = JSON.parse(JSON.stringify(data));

    4. **响应式限制**:
       - 如果 `RoleParam` 是 Vue 的响应式对象，直接替换 `.value` 是可以的，但要确保 `data` 的结构与视图绑定的结构一致，否则可能导致意外的视图行为。

    这行代码的核心是利用对象展开运算符创建一个新对象，并将其赋值给响应式数据 `RoleParam.value`，从而触发 Vue 的响应式更新，同时避免直接引用带来的副作用。

### sixth

处理    角色管理-分配权限   的业务时始终无法根据获取到的RoleMenu勾选对应的树节点，控制台一直报错且执行流终端(uncaught exception)  
询问Ai后得知可能的原因是：treeRef 在 el-tree 渲染完成之前被访问  
也就是说：如果 AssignPermission 方法在 el-tree 尚未渲染完成时调用，treeRef.value 会是 undefined。

最终调整了组件渲染的顺序 成功解决了这个问题
