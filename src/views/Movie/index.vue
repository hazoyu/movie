<script setup>
import { ref } from 'vue';
import Future from './components/Future.vue';
import Hot from './components/Hot.vue';
const activeName = ref('/movie')

</script>

<template>
  <div class="movie container">
    <el-tabs v-model="activeName" class="demo-tabs" >
      <el-tab-pane label="正在热映" name="/movie"> <Hot /></el-tab-pane>
      <el-tab-pane label="即将上映" name="/movie/future"><Future /></el-tab-pane>
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