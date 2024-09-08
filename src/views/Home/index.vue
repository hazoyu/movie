<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter()
  const login = () =>{
    router.replace({path:'/'})
  }
</script>

<template>
  <div>
    <el-button type="primary" @click="login">返回登录页</el-button>
  </div>
 
</template>

<style  scoped>

</style>