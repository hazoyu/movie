<script setup>
import { ref,reactive, onMounted } from 'vue';
import { getFutureMovieAPI } from '@/apis/movie';

const form = ref()
const currentPage = ref(1)
const movieLabel = reactive([
  {
    prop: 'title',
    label: '电影名称',
   
  },
  {
    prop: 'director',
    label: '导演',
  },
  {
    prop: 'kind',
    label: '类型',
    
  },
  {
    prop: 'region',
    label: '地区',
  },
  {
    prop: 'language',
    label: '语言',

  },
  {
    prop: 'length',
    label: '时长',
    width: 100
  },
  {
    prop: 'rel',
    label: '上映时间',
  },
])

const movieList = ref([])

const getFutureMovieList =async ()=>{
  const res = await getFutureMovieAPI()
  res.forEach(item => {  //split切割
    item.director = item.director.split('：')[1]
    item.kind = item.kind.split('：')[1]
    item.region = item.region.split('：')[1]
    item.language = item.language.split('：')[1]
    item.length = item.length.split('：')[1]+'分钟'
    item.rel = item.rel.slice(4)
  });
  movieList.value = res
}
const handleAdd = ()=>{

}


onMounted(()=>{
  getFutureMovieList()
})
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="form" >
        <el-form-item label="请输入">
          <el-input  placeholder="请输入电影名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary">搜索</el-button>
        </el-form-item>
    </el-form>
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
  :deep(.cell){
    white-space: nowrap; /* 文本强制不换行 */
    text-overflow: ellipsis; /* 文本溢出显示省略号 */
    overflow: hidden; /* 溢出的部分隐藏 */
    }
  .layout{
  position: absolute;
  bottom: -150px;
  }
}

</style>