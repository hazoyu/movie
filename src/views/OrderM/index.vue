<script setup>
import { ref,reactive, nextTick, computed } from 'vue';
import { getDelOrderAPI } from '@/apis/order';
import { useAllDataStore } from '@/stores';
const store = useAllDataStore()
const currentPage = ref(1)
const cinemaLabel = reactive([
  {
    prop: 'id',
    label: '订单号',
    width:200
  },
  {
    prop: 'user',
    label: '用户名称',
    width:100
    
  },
  {
    prop: 'movie',
    label: '电影名称',
    
  },
  {
    prop: 'cinema',
    label: '影院名称',
  },
  {
    prop: 'hall',
    label: '影厅',
    width:100
  },
  {
    prop: 'time',
    label: '场次',
  },
  {
    prop: 'buytime',
    label: '下单时间',
  },
  {
    prop: 'seat',
    label: '座位',
    width:300
  },
  {
    prop: 'price',
    label: '价格',
  },
])
const search = reactive({
  name:""
})
let cinemaList = computed(()=>store.state.orders)

const form = ref(null)

//搜索
const handleSearch = async ()=>{ 
  if (search.name){
    await store.order()
    const list = cinemaList.value.filter(item =>{
      if (item.movie.indexOf(search.name) === -1) return false
      return true
    })
    if (list.length != 0){
      store.state.orders = list
    } else {
      ElMessage({ type: 'warning', message: '无该电影的订单' })
    }
  } else {
    store.order()
  }
}

//删除
const handleDelete = (val)=>{
  // let id = parseInt(val.id) 字符串转数字
  ElMessageBox.confirm("你确定要删除吗").then(async() => {
    await getDelOrderAPI(val.id)
    store.order()
    ElMessage({
      showClose: true,
      message: '删除成功',
      type: 'success'
    })
  })
}


</script>

<template>
  <div class="user-header">
    <el-form :inline="true" :model="search" >
        <el-form-item label="请输入">
          <el-input v-model="search.name"  placeholder="请输入电影名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary"   @click="handleSearch">搜索</el-button>
        </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="cinemaList.slice((currentPage-1)*10,10*currentPage)" style="width: 100%">
        <el-table-column 
        v-for="item in cinemaLabel" 
        :width="item.width ? item.width : 155" 
        :prop="item.prop" 
        :label="item.label" 
        sortable 
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #="scope">
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="layout">
      <el-pagination background layout="prev, pager, next" v-model:current-page="currentPage" :total="cinemaList.length" />
    </div>
  </div>

</template>

<style  scoped lang="less">
.user-header{
  display: flex;
  justify-content: space-between;
  
}
.table{
  margin-top: 20px;
  position: relative;
  height: 420px;
  .layout{
  position: absolute;
  bottom: -150px;
  }
}

</style>