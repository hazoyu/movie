<script setup>
import { ref,reactive,computed, onMounted,nextTick } from 'vue';
import { getAddScreenAPI,getUpDateScreenAPI,getDelScreenAPI } from '@/apis/screen';
import { useAllDataStore } from '@/stores';

const store = useAllDataStore()
const currentPage = ref(1)
const cinemaList = computed(()=>store.state.cinemaList)
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
const search = reactive({
  name:""
})
const list = computed(()=>store.state.screenList)
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
//搜索
const handleSearch = async ()=>{ 
  if (search.name) {
    await store.screenList()
    const list2 = list.value.filter(item =>{
      if (item.cinemaname.indexOf(search.name) === -1) return false
      return true
    })
    if (list2.length != 0){
      store.state.screenList = list2
    } else {
      ElMessage({ type: 'warning', message: '无该影院' })
    }
  } else {
    store.screenList()
  }
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
  ElMessageBox.confirm("你确定要删除吗").then( async() => {
    await getDelScreenAPI(val.id)
    store.screenList()
    ElMessage({
      showClose: true,
      message: '删除成功',
      type: 'success'
    })
  })
}
const handleClose = ()=>{
  dialogVisible.value=false
  form.value.resetFields() //重置表单
}
//取消
const handleCancel = ()=>{
  dialogVisible.value=false
  form.value.resetFields() //重置表单
  
}
//确定
const onSubmit = ()=>{
  form.value.validate(async(valid)=>{
    if (valid) {
        if (action.value === 'add'){
          await getAddScreenAPI(formInfo)
          ElMessage({ type: 'success', message: '添加成功' })
        }else {
          await getUpDateScreenAPI(formInfo)
          ElMessage({ type: 'success', message: '修改成功' })
        }
        dialogVisible.value=false
        form.value.resetFields() //重置表单
        store.screenList()
      
    }
  })
}
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="search" >
        <el-form-item label="请输入">
          <el-input v-model="search.name"  placeholder="请输入影院名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary"   @click="handleSearch">搜索</el-button>
        </el-form-item>
    </el-form>
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
            <el-select
              v-model="formInfo.cinemaname"
              placeholder="影院名称"
              style="width: 210px"
            >
              <el-option
                v-for="item in cinemaList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>

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