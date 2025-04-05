<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <!-- xs做简单的媒体响应式布局，xs表示手机端的屏幕宽度，xs=0表示在手机端不显示这个元素 -->
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>Welcome to the System</h2>
                    <el-form-item prop="username" :rules="rules.username">
                        <el-input :prefix-icon="User" v-model="loginForm.username" placeholder="UserName"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" :rules="rules.password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password
                            placeholder="Password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login()">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>


<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import useUserStore from '@/stores/modules/user';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';

//获取el-form实例
let loginForms = ref();

let $router = useRouter();

let loading = ref(false);

let useStore = useUserStore();

let loginForm = reactive({
    username: 'admin',
    password: '123456'
});


const login = async () => {
    //保证表单验证通过再发请求
    await loginForms.value.validate();
    
    loading.value = true;
    //通知仓库发登录请求
    //成功-》首页展示数据页面
    //失败-》提示错误信息
    try {
        await useStore.userLogin(loginForm);
        //登录成功，编程式导航跳转到首页
        $router.push('/');
        ElNotification({
            type: 'success',
            message: "Welcome Home",
            title: `Hi,${getTime()}好`,
        })
        loading.value = false;
    } catch (error) {
        loading.value = false;
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}
//rule-->校验规则对象
//value-->表单项的值
//callback-->校验结果的回调函数，参数为一个布尔值，true表示校验通过，false表示校验不通过
//函数：符合条件callback放行通过
//如果不符合条件callback方法，注入错误信息
const valadatorUsername=(rule:any,value:any,callback:any)=>{
    if(value.length>=6){
        callback();
    }else{
        callback(new Error('账号长度至少为6'));
    }
}
const validatorPassword=(rule:any,value:any,callback:any)=>{
    if(value.length>=6 && value.length<=15){
        callback();
    }else{
        callback(new Error('密码长度在6到15位'));
    }
}

//定义表单验证规则
const rules = {
    //required 字段是否必填
    //min 字段最小长度
    //max 字段最大长度
    //message 错误提示信息
    //trigger 触发方式 blur(失去焦点) change(值改变) submit(提交表单)
    username: [
        // { required: true, min: 6, message: '账号长度至少为6', trigger: 'change' }
        {validator:valadatorUsername,trigger:'change'}
    ],
    password: [
        // { required: true, min: 6, max: 15, message: '密码长度在6到15位', trigger: 'change' }
        {validator:validatorPassword,trigger:'change'}
    ]
}


</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            font-size: 40px;
            color: #fff;
        }

        h2 {
            font-size: 20px;
            color: #fff;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>