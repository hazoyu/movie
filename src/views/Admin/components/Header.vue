<script setup>
import { useAllDataStore } from '@/stores';
import { useRouter } from "vue-router";
const store = useAllDataStore()
const router = useRouter()
const handleCollapse = ()=>{
  store.state.isCollapse=!store.state.isCollapse
}
const handleOut = ()=>{
  router.push("/home")
}
</script>

<template>
  <div class="header">
    <div>
      <span>
        <img class="img" src="../../../assets/images/2.png" alt="">
        电影购票管理系统
      </span>
      <el-button class="button" size="small" @click="handleCollapse">
        <component class="icons" is="Menu"></component>
      </el-button>
    </div>

    <el-button class="out" type="primary" @click="handleOut">退出</el-button>
  </div>
</template>

<style lang="less" scoped>
.header {
  // height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  line-height: 58px;
  color: #fff;
  .img{
    border-radius: 15px;
  }
  .button{
    margin-left: 10px;
    width: 30px;
    .icons {
    width: 18px;
    height: 18px;
  }
  }
  .out{
    margin-top: 15px;
  }
}

.header img {
  width: 50px;
}
</style>