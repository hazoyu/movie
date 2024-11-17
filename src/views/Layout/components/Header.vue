<script setup>
import { computed } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { useAllDataStore } from '@/stores';


const stoer = useAllDataStore()
const router = useRouter()
const route = useRoute()
const user = computed(()=>stoer.state.user)

const out = () =>{
  ElMessageBox.confirm("你确定要退出登录",{    confirmButtonText: '确定',
  cancelButtonText: '取消', }).then(() => {
    ElMessage({
      showClose: true,
      message: '退出成功',
      type: 'success'
    })
    router.push('/')
  })
}
</script>

<template>
  <div class="header">
    <!-- <el-button type="primary" @click="login">返回登录页</el-button> -->
    <div class="container">
      <div class="nav">
        <img class="logo" src="../../../assets/images/2.png" alt="">
               
        <RouterLink :class="{ active: route.path === '/home' }" to="/home" >首页</RouterLink>

        <RouterLink :class="{ active: route.path.slice(0, 6) === '/movie' }" to="/movie">电影</RouterLink>
        <!-- <RouterLink :class="{ active: route.path === '/cinema' }" to="/cinema">影院</RouterLink> -->
      </div>
      <div class="user">
        <RouterLink v-show="user.role == '管理员'" to="/admin" target="_blank">管理</RouterLink>
        <RouterLink :class="{ active: route.path.slice(0, 5) === '/user' }"  to="/user">{{user.username}}</RouterLink>
        <span class="out" @click="out">退出登录</span>
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

.out {
  margin-left: 20px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}
.out:hover{
  color: hsla(242, 89%, 50%, 0.5)
}

.active {
  background-color: hsla(242, 89%, 50%, 0.5);
  color: white;
}

.se{
  padding: 24px 10px 0 0;
}
</style>