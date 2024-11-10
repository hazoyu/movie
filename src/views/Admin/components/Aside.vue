<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useAllDataStore } from '@/stores';
const router = useRouter()
const route = useRoute()
const store = useAllDataStore()
const menuList = [
  {
    label: "用户管理",
    path: "/admin",
    icon: 'User'
  },
  {
    label: "影院管理",
    path: "/admin/cinemam",
    icon: 'VideoCameraFilled'
  },
  {
    label: "评论管理",
    path: "/admin/review",
    icon: 'ChatDotRound'
  },
]
const menuList2 = [
{
    label: "电影管理",
    path: "/admin/moviem",
    icon: 'Film',
    children: [
      {
        path: '/admin/hotm',
        label: '热门电影',
        icon: 'StarFilled',
        url: 'Page1'
      },
      {
        path: '/admin/futurem',
        label: '即将上映',
        icon: 'StarFilled',
        url: 'Page2'
      }
    ]
  },
]
const isCollapse = computed(() => store.state.isCollapse)
const width = computed(() => store.state.isCollapse ? '64px' : '150px')

const handleMenu = (item) => {
  router.push(item.path)
}
const activeMenu = computed(() => route.path)
</script>

<template>
  <el-aside class="el-aside" :width=width>

    <el-menu background-color="#545c64" text-color="#fff" :collapse="isCollapse" :collapse-transition="false"
      :default-active="activeMenu">
      <el-menu-item 
      v-for="item in menuList" 
      :index="item.path" 
      :key="item.path" 
      @click="handleMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        v-for="item in menuList2"
        :index="item.path" 
        :key="item.path"
        >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item 
            v-for="(sumItem, subIndex) in item.children" 
            :index="sumItem.path" 
            :key="sumItem.path"
            @click="handleMenu(sumItem)"
          >
            <component class="icons" :is="sumItem.icon"></component>
            <span>{{ sumItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}
.el-aside {
  height: 100%;
  background-color: #545c64;
  // transition: all 0.5s;
  color: white;
  .el-menu {
    border: none;
    span {
      font-size: 14px;
    }
  }

}
</style>