<script setup>
import { ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const activeName = ref(route.path)
const label = ref([
  {
    label:"正在热映",
    name:"/movie"
  },
  {
    label:"即将上映",
    name:"/movie/future",
  }
])
const click = (pane)=>{
  activeName.value = pane.props.name
  router.push(pane.props.name)
}
</script>

<template>
  <div class="movie container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="click" >
      <el-tab-pane 
      v-for="item in label"
      :label="item.label" 
      :name="item.name"
      > 
      <RouterView />
      </el-tab-pane>
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