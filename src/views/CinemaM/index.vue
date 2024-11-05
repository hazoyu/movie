<script setup>
import { ref,reactive, onMounted } from 'vue';
import { getHotMovieAPI } from '@/apis/movie';

const currentPage = ref(1)
const movieLabel = reactive([
  {
    prop: 'id',
    label: '影院ID',
    width: 200
  },
  {
    prop: 'name',
    label: '影院名称',
    
  },
  {
    prop: 'addr',
    label: '影院地址',
    width: 300
  },
])

const movieList = ref([
  {
    id:1,
    name:"大地影院",
    addr:"顺德区人民路没的大道共和广场"
  },
  {
    id:2,
    name:"大地影院",
    addr:"顺德区人民路没的大道共和广场"
  },
  {
    id:3,
    name:"大地影院",
    addr:"顺德区人民路没的大道共和广场"
  },
  {
    id:4,
    name:"大地影院",
    addr:"顺德区人民路没的大道共和广场"
  },
  {
    id:5,
    name:"大地影院",
    addr:"顺德区人民路没的大道共和广场"
  },
])


</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <div class="table">
    <el-table :data="movieList.slice((currentPage-1)*10,10*currentPage)" style="width: 100%">
        <el-table-column 
        v-for="item in movieLabel" 
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
    <div class="layout">
      <el-pagination background layout="prev, pager, next" v-model:current-page="currentPage" :total="movieList.length" />
    </div>
  </div>
</template>

<style  scoped lang="less">
.user-header{
  display: flex;
  justify-content: space-between;
  
}
.table{
  position: relative;
  height: 420px;
  .layout{
  position: absolute;
  bottom: -150px;
  }
}

</style>