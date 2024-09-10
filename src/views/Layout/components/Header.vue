<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const login = () => {
  router.replace({ path: '/' })
}
</script>

<template>
  <div class="header">
    <!-- <el-button type="primary" @click="login">返回登录页</el-button> -->
    <div class="container">
      <div class="nav">
        <img class="logo" src="../../../assets/images/2.png" alt="">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/movie">电影</RouterLink>
        <RouterLink to="/cinema">影院</RouterLink>
      </div>
      <div class="user">
        <RouterLink to="/">个人中心</RouterLink>
        <RouterLink class="out" to="/login">退出登录</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgb(212, 209, 209);
}

.logo {
  height: 79px;
}

a {
  display: block;
  padding: 0 20px;
  width: auto;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}

.nav {
  float: left;
  display: flex;
}

.user {
  float: right;
  display: flex;
  line-height: 80px;
}
.out{
  font-size: 15px;
  font-weight: normal;
}
</style>