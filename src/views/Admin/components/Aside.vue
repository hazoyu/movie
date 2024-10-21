<script setup>
import { computed, ref } from 'vue';
import { useRouter,useRoute } from "vue-router";
import { useAllDataStore } from '@/stores';
const router = useRouter()
const route = useRoute()
const store = useAllDataStore()
const menuList =[
  {
    label:"用户管理",
    path:"/admin",
    icon:'User'
  },
  {
    label:"电影管理",
    path:"/admin/moviem",
    icon:'Film'
  },
  {
    label:"影院管理",
    path:"/admin/cinemam",
    icon:'VideoCameraFilled'
  },
]
const isCollapse = computed(()=>store.state.isCollapse)
const width = computed(()=>store.state.isCollapse ? '64px' : '128px')

const handleMenu = (item)=>{
  router.push(item.path)
  console.log(route.path);
}
const activeMenu = computed(()=>route.path)
</script>

<template>
 <el-aside class="el-aside" :width=width>
  <el-menu
    background-color="#545c64"
    text-color="#fff"
    :collapse="isCollapse"
    :collapse-transition="false"
    :default-active="activeMenu"
  >
    <el-menu-item  
      v-for="item in menuList"
      :index="item.path"
      :key="item.path"
      :collapse="isCollapse"
      @click="handleMenu(item)"
    >
    <component class="icons" :is="item.icon"></component>
      
    <span>{{item.label}}</span>
    </el-menu-item>

  </el-menu>
 </el-aside>
</template>

<style lang="less" scoped>
.el-aside{
  height: 100%;
  background-color: #545c64;
  // transition: all 0.5s;
  color: white;
  
  .el-menu{
    border: none;
    .icons {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    }
    span{
      font-size: 14px;
    }
  }
  
}

</style>