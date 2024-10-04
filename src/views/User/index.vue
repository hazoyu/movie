<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <div class="container">
    <div class="menuList">
      <h2>个人中心</h2>
      <RouterLink :class="{ active: route.path === '/user' }" to="/user">我的订单</RouterLink>
      <RouterLink :class="{ active: route.path === '/user/info' }" to="/user/info">基本信息</RouterLink>
      <RouterLink :class="{ active: route.path === '/user/revise' }" to="/user/revise">修改密码</RouterLink>
    </div>
    <div>
      <RouterView />
    </div>
  </div>
</template>

<style  scoped>
.container{
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;
  border: 1px solid rgb(212, 209, 209);
}
.menuList{
  display: flex;
  flex-direction: column;
  height: 500px;
  background-color: rgb(225, 224, 224);;
}
.menuList h2{
  padding: 20px;
  
}
.menuList a{
  text-align: center;
  padding: 15px 0;
}
.menuList .active{
  background-color: hsla(242, 89%, 50%, 0.5);
}
</style>