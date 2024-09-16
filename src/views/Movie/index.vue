<script setup>
import { useRouter,useRoute } from 'vue-router';
const route = useRoute()
const router = useRouter()
const hot = () =>{
  router.push('/movie')
}
const future = () =>{
  router.push('/movie/future')
}
</script>

<template>
  <div class="movie container">
    <div>
      <span @click="hot" class="hot" :class="{active : route.path==='/movie'}">正在热映</span>
      <span @click="future" class="future" :class="{active : route.path==='/movie/future'}">即将上映</span>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.movie{
  /* height: 500px; */
  border: 1px solid rgb(212, 209, 209);
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 40px 20px;
}
.movie>div{
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(212, 209, 209);
}
.movie span{
  font-size: 16px;
  color: #999;
  cursor: pointer;
  padding-bottom: 10px;
}
.hot{
  margin-right: 10px;
}
.movie .active{
  color: blue;
  border-bottom: 1px solid blue;
}
</style>