<script setup>
import { ref,reactive, onMounted,nextTick } from 'vue';
import { getHotMovieAPI } from '@/apis/movie';

const currentPage = ref(1)
const label = reactive([
  {
    prop: 'id',
    label: '场次编号',
  },
  {
    prop: 'cinema',
    label: '影院',
    
  },
  {
    prop: 'hall',
    label: '影厅',
  },
  {
    prop: 'movie',
    label: '电影',
  },
  {
    prop: 'time',
    label: '场次时间',
  },
  {
    prop: 'price',
    label: '价格',
  },
])

const list = ref([
  {
    id:1,
    cinema:"大地影院",
    hall:"一号厅",
    movie:'野孩子',
    time:'2024-11-11 10:00',
    price:'50'
  },
  {
    id:2,
    cinema:"大地影院",
    hall:"一号厅",
    movie:'野孩子',
    time:'2024-11-11 10:00',
    price:'50'
  },
  {
    id:3,
    cinema:"大地影院",
    hall:"一号厅",
    movie:'野孩子',
    time:'2024-11-11 10:00',
    price:'50'
  },
  {
    id:4,
    cinema:"大地影院",
    hall:"一号厅",
    movie:'野孩子',
    time:'2024-11-11 10:00',
    price:'50'
  },
  {
    id:5,
    cinema:"大地影院",
    hall:"一号厅",
    movie:'野孩子',
    time:'2024-11-11 10:00',
    price:'50'
  },
])
const action = ref('add')
const dialogVisible = ref(false)
const form = ref(null)
const formInfo = reactive({
  cinema:'',
  hall:'',
  movie:'',
  time:'',
  price:''
})
const rules = reactive({
  cinema:[],
  hall:[],
  movie:[],
  time:[],
  price:[]
})
//新增
const handleAdd = ()=>{
  dialogVisible.value=true
  action.value='add'
}
//编辑
const handleUpdata = (val) =>{
  dialogVisible.value=true
  action.value='updata'
  nextTick(()=>{  //nextTick确保在正确的时机进行 DOM 操作
    Object.assign(formInfo,{...val}) //assign对象合并，+''转为字符串
  })
}
//删除
const handleDelete = (val)=>{
  // let id = parseInt(val.id) 字符串转数字
  ElMessageBox.confirm("你确定要删除吗").then(() => {
    ElMessage({
      showClose: true,
      message: '删除成功',
      type: 'success'
    })
  })
}
const handleClose = ()=>{
  dialogVisible.value=false
  // userForm.value.resetFields() //重置表单
}
//取消
const handleCancel = ()=>{
  dialogVisible.value=false
  // userForm.value.resetFields() //重置表单
  
}
//确定
const onSubmit = ()=>{
  // userForm.value.validate(async(valid)=>{
  //   if (valid) {
  //       if (action.value === 'add'){
  //         await getnewFutureMovieAPI(formUser)
  //         ElMessage({ type: 'success', message: '添加成功' })
  //       }else {
  //         await getUpdataFutureMovieAPI(formUser)
  //         ElMessage({ type: 'success', message: '修改成功' })
  //       }
  //       dialogVisible.value=false
  //       userForm.value.resetFields() //重置表单
  //       getFutureMovieList()
      
  //   }
  // })
}
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </div>
  <div class="table">
    <el-table :data="list.slice((currentPage-1)*10,10*currentPage)" style="width: 100%">
        <el-table-column 
        v-for="item in label" 
        :width="item.width ? item.width : 155" 
        :prop="item.prop" 
        :label="item.label" 
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #="scope">
            <el-button type="primary" size="small" @click="handleUpdata(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        
    </el-table>
    <div class="layout">
      <el-pagination background layout="prev, pager, next" v-model:current-page="currentPage" :total="list.length" />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增放映厅' : '编辑放映厅'" width="25%" :before-close="handleClose">
    <el-form :inline="true" :model="formInfo" :rules="rules" ref="form">
        <el-row>
          <el-form-item label="影院" prop="cinema">
            <el-input v-model="formInfo.cinema" placeholder="影院名称" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="影厅" prop="hall">
            <el-input v-model="formInfo.hall" placeholder="影厅" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item  label="电影" prop="movie">
            <el-input v-model="formInfo.movie"  placeholder="电影名称" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item  label="场次时间" prop="time">
            <el-input v-model="formInfo.time"  placeholder="场次时间" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item  label="价格" prop="price">
            <el-input v-model="formInfo.price"  placeholder="场次时间" />
          </el-form-item>
        </el-row>
        <el-row style="justify-content: flex-end">
          <el-form-item>
            <el-button type="primary" @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-row>

    </el-form>
  </el-dialog>
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