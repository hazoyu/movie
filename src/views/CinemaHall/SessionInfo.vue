<script setup>
import { ref,reactive, onMounted,nextTick,computed } from 'vue';
import { getSessionListAPI,getAddSessionAPI,getUpDateSessionAPI,getDelSessionAPI } from '@/apis/screen';
import { getDelSeatAPI } from '@/apis/seat';
import { useAllDataStore } from '@/stores';
import {getHotMovieAPI} from '@/apis/movie'
const store = useAllDataStore()

const options = ref([])
const getHotMovie = async() =>{
  const res =await getHotMovieAPI()
  options.value = res
}

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
    width:300
  },
  {
    prop: 'price',
    label: '价格',
  },
])
const search = reactive({
  cinemaname:"",
  moviename:""
})
const list = ref([])
//获取场次列表
const getList =async ()=>{
  const res =await getSessionListAPI()
  list.value = res
}
const action = ref('add')
const dialogVisible = ref(false)
const form = ref(null)
const formInfo = reactive({
  cinema:'',
  addr:'',
  hall:'',
  movie:'',
  time:'',
  price:''
})
const cinemaList = computed(()=>store.state.cinemaList) //影院列表
const screenList = computed(()=>store.state.screenList.filter(item=>{
  if (item.cinemaname === formInfo.cinema) return true
  return false
})) //影厅列表

const rules = reactive({
  cinema:[{ required: true, message: "电影院是必填项", trigger: "blur" }],
  hall:[{ required: true, message: "影厅是必填项", trigger: "blur" }],
  movie:[{ required: true, message: "电影是必填项", trigger: "blur" }],
  time:[{ required: true, message: "时间是必填项", trigger: "blur" }],
  price:[{ required: true, message: "价格是必填项", trigger: "blur" }]
})
//新增
const handleAdd = ()=>{
  dialogVisible.value=true
  action.value='add'
}
//搜索
const searchCinema = async()=>{
  if (search.cinemaname) {
    await getList()
    const list2 = list.value.filter(item =>{
      if (item.cinema.indexOf(search.cinemaname) === -1) return false
      return true
    })
    if (list2.length != 0){
      list.value = list2
    } else {
      ElMessage({ type: 'warning', message: '无该影院的场次' })
    }
  } else {
    getList()
  }
}
const searchMovie = async()=>{
  if (search.moviename) {
    await getList()
    const list2 = list.value.filter(item =>{
      if (item.movie.indexOf(search.moviename) === -1) return false
      return true
    })
    if (list2.length != 0){
      list.value = list2
    } else {
      ElMessage({ type: 'warning', message: '无该电影的场次' })
    }
  } else {
    getList()
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
  ElMessageBox.confirm("你确定要删除吗").then(async() => {
    await getDelSessionAPI(val.id) //删除对应场次
    await getDelSeatAPI(val.id)    //删除对应座位列表
    getList()
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
          const a = cinemaList.value.filter(item=>{
            if (item.name === formInfo.cinema) return true
            return false
          })
          formInfo.addr = a[0].addr
          await getAddSessionAPI(formInfo)
          ElMessage({ type: 'success', message: '添加成功' })
        }else {
          await getUpDateSessionAPI(formInfo)
          ElMessage({ type: 'success', message: '修改成功' })
        }
        dialogVisible.value=false
        form.value.resetFields() //重置表单
        getList()
      
    }
  })
}
onMounted(()=>{
  getList(),
  getHotMovie()
})
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="search" >
        <el-form-item label="请输入">
          <el-input v-model="search.cinemaname"  placeholder="请输入影院名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary"   @click="searchCinema">搜索</el-button>
        </el-form-item>
        <el-form-item label="请输入">
          <el-input v-model="search.moviename"  placeholder="请输入电影名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary"   @click="searchMovie">搜索</el-button>
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
          <el-form-item label="影院" prop="cinema">
            <el-select
                v-model="formInfo.cinema"
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
          <el-form-item label="影厅" prop="hall">
            <el-select
                v-model="formInfo.hall"
                placeholder="影厅"
                style="width: 210px"
              >
                <el-option
                  v-for="item in screenList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item  label="电影" prop="movie">
              <el-select
                v-model="formInfo.movie"
                filterable
                placeholder="电影名称"
                style="width: 240px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.title"
                  :label="item.title"
                  :value="item.title"
                />
              </el-select>

          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item  label="场次时间" prop="time">
            <!-- <el-input v-model="formInfo.time"  placeholder="场次时间" />
              -->
              <el-date-picker
                v-model="formInfo.time"
                type="datetime"
                placeholder="场次时间"
                value-format="YYYY-MM-DD HH:mm"
              />
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