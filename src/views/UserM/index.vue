<script setup>
import { ref,reactive, onMounted } from 'vue';
import { getUserDataAPI } from '@/apis/user';

const form = ref()
const userLabel = reactive([
  {
    prop: 'username',
    label: '用户名'
  },
  {
    prop: 'sex',
    label: '性别'
  },
  {
    prop: 'birth',
    label: '出生日期',
    width: 255
  },
  {
    prop: 'phone',
    label: '手机号码',
    width: 255
  },
  {
    prop: 'role',
    label: '角色',
  },
])

const userData = ref([])

const getUserData =async ()=>{
  const res = await getUserDataAPI()
  userData.value = res
}
const handleAdd = ()=>{

}


onMounted(()=>{
  getUserData()
})
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="form" >
        <el-form-item label="请输入">
          <el-input  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary">搜索</el-button>
        </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="userData" style="width: 100%">
        <el-table-column 
        v-for="item in userLabel" 
        :width="item.width ? item.width : 155" 
        :prop="item.prop" 
        :label="item.label" 
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #="scope">
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
        
    </el-table>
  </div>
</template>

<style  scoped lang="less">
.user-header{
  display: flex;
  justify-content: space-between;
  
}

</style>