<script setup>
import { ref,reactive, onMounted } from 'vue';
import { getReviewAPI,getDelReviewAPI } from '@/apis/review';
const currentPage = ref(1)
const form = reactive({
  user:'',
  movie:''
})
const reviewLabel = reactive([
  {
    prop: 'username',
    label: '用户名称',
  },
  {
    prop: 'moviename',
    label: '电影名称',
    width:300
  },
  {
    prop: 'review',
    label: '评论',
    width:450
  },
  {
    prop: 'time',
    label: '时间',
    width:300
  },
])

const reviewList = ref([])
//获取评论列表
const getReviewList =async()=>{
  const res = await getReviewAPI()
  reviewList.value = res.sort((a,b)=>b.id-a.id)
}
//按用户名称搜索
const searchUser = async()=>{
  if (form.user){
    await getReviewList()    //需要用 await等待getHotMovieList执行完成再进行后面的操作，不然会导致为执行完
    const Search = reviewList.value.filter(item=>{
      if (item.username.indexOf(form.user) === -1) return false
      return true
    })
    if (Search.length != 0){ 
      reviewList.value = Search
    } else {
      ElMessage({ type: 'warning', message: '无该用户的评论' })
    }
  }else{
    getReviewList()
  }
}
//按电影名称搜索
const searchMovie =async()=>{
    if (form.movie){
    await getReviewList()    //需要用 await等待getHotMovieList执行完成再进行后面的操作，不然会导致为执行完
    const Search = reviewList.value.filter(item=>{
      if (item.moviename.indexOf(form.movie) === -1) return false
      return true
    })
    if (Search.length != 0){ 
      reviewList.value = Search
    } else {
      ElMessage({ type: 'warning', message: '无该电影的评论' })
    }
  }else{
    getReviewList()
  }
}
//删除
const handleDelete = (val)=>{
  // let id = parseInt(val.id) 字符串转数字
  ElMessageBox.confirm("你确定要删除吗").then(async () => {
    await getDelReviewAPI(val.id)
    ElMessage({
      showClose: true,
      message: '删除成功',
      type: 'success'
    })
    getReviewList()
  })
}
onMounted(()=>{
  getReviewList()
})
</script>

<template>
  <div class="header">
    <el-form :inline="true" :model="form" >
      <div>
        <el-form-item label="请输入">
          <el-input v-model="form.user"  placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="searchUser">搜索</el-button>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="请输入">
          <el-input v-model="form.movie"  placeholder="请输入电影名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="searchMovie">搜索</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="reviewList.slice((currentPage-1)*10,10*currentPage)" style="width: 100%">
        <el-table-column 
        v-for="item in reviewLabel" 
        :width="item.width ? item.width : 155" 
        :prop="item.prop" 
        :label="item.label" 
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #="scope">
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        
    </el-table>
    <div class="layout">
      <el-pagination background layout="prev, pager, next" v-model:current-page="currentPage" :total="reviewList.length" />
    </div>
  </div>
</template>

<style  scoped lang="less">
.header{
  .el-form{
    display: flex;
    justify-content: space-around;
  }
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