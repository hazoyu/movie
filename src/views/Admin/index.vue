<script setup>
import { useRoute } from 'vue-router';
import Aside from './components/Aside.vue';
import Header from './components/Header.vue';
import { useAllDataStore } from '@/stores';
import { onMounted } from 'vue';
const store = useAllDataStore()
onMounted(()=>{
    store.cinemaList()
})
</script>

<template>
  <div class="admin">
    <el-container class="lay-container">
      <el-header class="el-header">
        <Header />
      </el-header>
      <el-container>
          <Aside />
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style  scoped lang="less">
.admin,.lay-container{
  width: 100%;
  height: 100%;
}
.el-header{
    height: 80px;
    background-color: #333;
  }
/* .admin{
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
} */
</style>