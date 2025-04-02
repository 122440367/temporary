<template>
  <div>
    <router-view></router-view>
    <svg-icon name="test" color="#f00" width="50px" height="50px"></svg-icon>
  </div>

</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import { reqLogin } from './api/user';
import router from './router';

onMounted(() => {
  // console.log('App组件挂载完成');
  reqLogin({
    username: 'admin',
    password: '123456'
  })
});

</script>

<style scoped lang="scss">
div {
  h1 {
    color: $base-color;
  }
}
</style>
