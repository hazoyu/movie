<script setup>
import { ref,reactive, nextTick, computed } from 'vue';
import { getCreateCinemaAPI,getUpDataCinemaAPI,getDelCinemaAPI } from '@/apis/cinema';
import { useAllDataStore } from '@/stores';
const store = useAllDataStore()
const currentPage = ref(1)
const cinemaLabel = reactive([
  {
    prop: 'id',
    label: '影院ID',
  },
  {
    prop: 'name',
    label: '影院名称',
    
  },
  {
    prop: 'addr',
    label: '影院地址',
    width: 400
  },
])
const search = reactive({
  name:""
})
let cinemaList = computed(()=>store.state.cinemaList)
const action = ref('add')
const dialogVisible = ref(false)
const form = ref(null)
const formInfo = reactive({
  name:'',
  addr:'',
})
const rules = reactive({
  name:[{ required: true,validator: (rule, value, callback) => {
                if (action.value === 'add' && value!= '') {
                  let yes = 0
                  cinemaList.value.forEach(item=>{
                    if (item.name === value){
                      yes = 1
                    }
                  })
                  if (yes === 1){
                    callback(new Error('存在该影院'))
                  }else{
                    callback()
                  }

                } else if (value === ''){
                  callback(new Error('影院名称是必填项'))
                } else {
                  callback()
                }
              }, trigger: "blur" }],
  addr:[{ required: true, message: "地址是必填项", trigger: "blur" }],
})
//新增
const handleAdd = ()=>{
  dialogVisible.value=true
  action.value='add'
}
//搜索
const handleSearch = async ()=>{ 
  if (search.name) {
    await store.cinemaList()
    const list = cinemaList.value.filter(item =>{
      if (item.name.indexOf(search.name) === -1) return false
      return true
    })
    if (list.length != 0){
      store.state.cinemaList = list
    } else {
      ElMessage({ type: 'warning', message: '无该影院' })
    }
  } else {
    store.cinemaList()
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
  ElMessageBox.confirm("你确定要删除吗",{confirmButtonText: '确定',
  cancelButtonText: '取消', }).then(async() => {
    await getDelCinemaAPI(val.id)
    store.cinemaList()
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
  form.value.validate( async(valid)=>{
    if(valid){
      if (action.value === 'add'){
          await getCreateCinemaAPI(formInfo)
          ElMessage({ type: 'success', message: '添加成功' })
        }else {
          await getUpDataCinemaAPI(formInfo)
          ElMessage({ type: 'success', message: '修改成功' })
        }
        dialogVisible.value=false
        form.value.resetFields() //重置表单
        store.cinemaList()
    }
  })
}
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="search" @submit.native.prevent>
        <el-form-item label="请输入">
          <el-input v-model="search.name"  placeholder="请输入影院名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary"   @click="handleSearch">搜索</el-button>
        </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :default-sort="{ prop: 'id' }" :data="cinemaList.slice((currentPage-1)*10,10*currentPage)" style="width: 100%">
        <el-table-column 
        v-for="item in cinemaLabel" 
        :width="item.width ? item.width : 155" 
        :prop="item.prop" 
        :label="item.label" 
        sortable 
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120" >
          <template #="scope">
            <el-button type="primary" size="small" @click="handleUpdata(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="layout">
      <el-pagination background layout="prev, pager, next" v-model:current-page="currentPage" :total="cinemaList.length" />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增影院' : '编辑影院'" width="25%" :before-close="handleClose">
    <el-form :inline="true" :model="formInfo" :rules="rules" ref="form">
        <el-row>
          <el-form-item label="影院名称" prop="name">
            <el-input v-model="formInfo.name" placeholder="影院名称" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item  label="影院地址" prop="addr">
            <el-input v-model="formInfo.addr"  placeholder="影院地址" />
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