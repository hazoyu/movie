<script setup>
import { useAllDataStore } from '@/stores';
import { useRouter } from "vue-router";
const store = useAllDataStore()
const router = useRouter()
const handleCollapse = ()=>{
  store.state.isCollapse=!store.state.isCollapse
}
const handleOut = ()=>{
  router.push("/login")
}
</script>

<template>
  <div class="header">
    <div>
      <span>
        <img src="../../../assets/images/2.png" alt="">
        电影购票管理系统
      </span>
      <el-button class="button" size="small" @click="handleCollapse">
        <component class="icons" is="Menu"></component>
      </el-button>
    </div>

    <el-button type="primary" @click="handleOut">退出</el-button>
  </div>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  line-height: 32px;
  color: #fff;
  .button{
    margin-left: 10px;
    width: 30px;
    .icons {
    width: 18px;
    height: 18px;
  }
  }
  
}

.header img {
  width: 50px;
}
</style>