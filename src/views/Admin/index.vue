<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <div class="admin">
    <div class="header">
      <span>
        <img src="../../assets/images/2.png" alt="">
        电影购票管理系统
      </span>
      <el-button type="primary">退出</el-button>
    </div>
    <div class="content">
      <div class="nav">
        <RouterLink :class="{ active: route.path === '/admin' }" to="/admin">用户管理</RouterLink>
        <RouterLink :class="{ active: route.path === '/admin/moviem' }"to="/admin/moviem">电影管理</RouterLink>
        <RouterLink :class="{ active: route.path === '/admin/cinemam' }"to="/admin/cinemam">影院管理</RouterLink>
      </div>
      <div class="main">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style  scoped>
.admin{
  color: white;
  width: 100%;
  height: 100%;
  background-color: rgb(48, 48, 48);
}
.header{
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  line-height: 32px;
}
.header img{
  width: 50px;
}
.content{
  display: flex;
}
.nav {
  display: flex;
  flex-direction: column;
  height: 680px;
  width: 120px;
  padding: 0 20px;
}
.nav a{
  color: white;
  margin-bottom: 10px;
}
.main{
  color: black;
  background-color: white;
  width: 100%;
}
.nav .active{
  color: rgb(115, 115, 243);
}
</style>