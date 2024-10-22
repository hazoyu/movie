<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const activeName = ref('/movie')
const handleClick = (tab) =>{
  router.push(tab.props.name)
}
</script>

<template>
  <div class="movie container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="正在热映" name="/movie"> <RouterView /></el-tab-pane>
      <el-tab-pane label="即将上映" name="/movie/future"><RouterView /></el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<style scoped>
.movie{
  /* height: 500px; */
  border: 1px solid rgb(212, 209, 209);
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 40px 20px;
  /* height: auto; */
}

</style>