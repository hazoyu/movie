<script setup>
import { ref,reactive, onMounted,nextTick } from 'vue';
import { getHotMovieAPI } from '@/apis/movie';

const currentPage = ref(1)
const label = reactive([
  {
    prop: 'id',
    label: '放映厅编号',
  },
  {
    prop: 'name',
    label: '放映厅名称',
    
  },
  {
    prop: 'size',
    label: '放映厅容量',
  },
  {
    prop: 'cinemaname',
    label: '影院名称',
  },
])

const list = ref([
  {
    id:1,
    name:"一号厅",
    size:"100",
    cinemaname:'人民影院'
  },
  {
    id:2,
    name:"二号厅",
    size:"90",
    cinemaname:'人民影院'
  },
  {
    id:3,
    name:"三号厅",
    size:"100",
    cinemaname:'大地影院'
  },
  {
    id:4,
    name:"四号厅",
    size:"50",
    cinemaname:'万达影院'
  },
  {
    id:5,
    name:"五号厅",
    size:"80",
    cinemaname:'万达影院'
  },
])
const action = ref('add')
const dialogVisible = ref(false)
const form = ref(null)
const formInfo = reactive({
  name:'',
  size:'',
  cinemaname:'',
})
const rules = reactive({
  name:[],
  size:[],
  cinemaname:[]
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
          <el-form-item label="影院名称" prop="cinemaname">
            <el-input v-model="formInfo.cinemaname" placeholder="影院名称" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="放映厅名称" prop="name">
            <el-input v-model="formInfo.name" placeholder="放映厅名称" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item  label="放映厅容量" prop="size">
            <el-input v-model="formInfo.size"  placeholder="放映厅容量" />
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