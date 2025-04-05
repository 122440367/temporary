<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <!-- xs做简单的媒体响应式布局，xs表示手机端的屏幕宽度，xs=0表示在手机端不显示这个元素 -->
            <el-col :span="12" :xs="24">
                <el-form class="login_form">
                    <h1>Hello</h1>
                    <h2>Welcome to the System</h2>
                    <el-form-item>
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login()">登录</el-button>
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

let $router = useRouter();

let loading = ref(false);

let useStore = useUserStore();

let loginForm = reactive({
    username: 'admin',
    password: '123456'
});

const login=async()=>{
    //通知仓库发登录请求
    //成功-》首页展示数据页面
    //失败-》提示错误信息
    
    loading.value = true;
    try {
        await useStore.userLogin(loginForm);
        //登录成功，编程式导航跳转到首页
        $router.push('/');
        ElNotification({
            type: 'success',
            message: '登录成功',
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