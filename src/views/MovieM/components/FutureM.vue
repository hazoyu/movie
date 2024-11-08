<script setup>
import { ref,reactive, onMounted,nextTick } from 'vue';
import { getFutureMovieAPI,getUpdataFutureMovieAPI,getnewFutureMovieAPI,getDelFutureMovieAPI } from '@/apis/movie';

const form = reactive({
  title:''
})
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
    prop: 'detail',
    label: '电影简介',
    width:150
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
    Object.keys(item).forEach(key=>{   //Object.keys(obj)返回一个数组
      if (key != 'title' || key != 'rel'){
        const value = item[key]
        if (typeof value === 'string' && value.includes('：')){
          item[key] = item[key].split('：')[1]
        }
      } 
    })
    if(item.rel){    
      if (item.rel.slice(0,4)==='上映时间'){
      item.rel = item.rel.slice(4)
    }
    }
    
  });
  movieList.value = res
}

const action = ref('add')
const dialogVisible = ref(false)
const userForm = ref(null)
const formUser = reactive({
  url:'',
  title:'',
  director:'',
  kind:'',
  region:'',
  language:'',
  length:'',
  rel:'',
})
//表单校验规则
const rules = reactive({
  url: [{trigger: "blur" }],
  title: [{ required: true,validator: (rule, value, callback) => {
                if (action.value === 'add' && value!= '') {
                  let yes = 0
                  movieList.value.forEach(item=>{
                    if (item.title === value){
                      yes = 1
                    }
                  })

                  if (yes === 1){
                    callback(new Error('存在该电影'))
                  }else{
                    callback()
                  }

                } else if (value === ''){
                  callback(new Error('电影名称是必填项'))
                } else {
                  callback()
                }
              },trigger: "blur" }],
  director: [{ required: true, message: "导演是必填项", trigger: "blur" }],
  kind: [{ required: true, message: "类型是必填项", trigger: "blur" },],
  region: [{ required: true , message: "地区是必填项", trigger: "blur"}],
  language: [{ required: true , message: "语言是必填项", trigger: "blur"}],
  length: [{ required: true , message: "长度是必填项", trigger: "blur" },],
  rel: [{ required: false}],
})
//新增
const handleAdd = ()=>{
  dialogVisible.value=true
  action.value='add'
  console.log(formUser);
}
//搜索
const handleSearch = async()=>{
  if (form.title){
    await getFutureMovieList()    //需要用 await等待getHotMovieList执行完成再进行后面的操作，不然会导致为执行完
    const Search = movieList.value.filter(item=>{
      if (item.title.indexOf(form.title) === -1) return false
      return true
    })
    if (Search.length != 0){ 
      movieList.value = Search
    } else {
      ElMessage({ type: 'warning', message: '无该电影' })
    }
    
  }else{
    getFutureMovieList()
  }
}
//编辑
const handleUpdata = (val) =>{
  dialogVisible.value=true
  action.value='updata'
  nextTick(()=>{  //nextTick确保在正确的时机进行 DOM 操作
    Object.assign(formUser,{...val}) //assign对象合并，+''转为字符串
  })
  console.log(formUser);
}
//删除
const handleDelete = (val)=>{
  // let id = parseInt(val.id) 字符串转数字
  ElMessageBox.confirm("你确定要删除吗").then(async () => {
    await getDelFutureMovieAPI(val.id)
    ElMessage({
      showClose: true,
      message: '删除成功',
      type: 'success'
    })
    getFutureMovieList()
  })
}
const handleClose = ()=>{
  dialogVisible.value=false
  userForm.value.resetFields() //重置表单
  
}
//取消
const handleCancel = ()=>{
  dialogVisible.value=false
  userForm.value.resetFields() //重置表单
  
}
//确定
const onSubmit = ()=>{
  userForm.value.validate(async(valid)=>{
    if (valid) {
        if (action.value === 'add'){
          await getnewFutureMovieAPI(formUser)
          ElMessage({ type: 'success', message: '添加成功' })
        }else {
          await getUpdataFutureMovieAPI(formUser)
          ElMessage({ type: 'success', message: '修改成功' })
        }
        dialogVisible.value=false
        userForm.value.resetFields() //重置表单
        getFutureMovieList()
      
    }
  })
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
          <el-input v-model="form.title"  placeholder="请输入电影名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
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
            <el-button type="primary" size="small" @click="handleUpdata(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        
    </el-table>
    <div class="layout">
      <el-pagination background layout="prev, pager, next" v-model:current-page="currentPage" :total="movieList.length" />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增电影' : '编辑电影'" width="45%" :before-close="handleClose">
    <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
		在css进行处理
    dialogVisible=true显示对话框
    before-close点击关闭和点击外部时执行
    -->
    <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
      <div class="img">
        <el-form-item  prop="url">
          <img style="width: 100px; height: 140px;" :src="formUser.url" alt="">
        </el-form-item>
        <el-form-item prop="url">
          <span>图片网址</span>
          <el-input v-model="formUser.url" placeholder="图片网址" />
        </el-form-item>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电影名称" prop="title">
              <el-input v-model="formUser.title" placeholder="电影名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="导演" prop="director">
                <el-input v-model="formUser.director" placeholder="导演" />
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  label="类型" prop="kind">
              <el-input v-model="formUser.kind"  placeholder="类型" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item  label="地区" prop="region">
                <el-input v-model="formUser.region"  placeholder="地区" />
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="语言" prop="language">
              <el-input v-model="formUser.language" placeholder="语言" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时长" prop="length">
              <el-input v-model="formUser.length" placeholder="时长" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <el-form-item label="电影简介" prop="detail">
              <el-input style="width: 240px" v-model="formUser.detail" type="textarea" placeholder="电影简介" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="上映时间" prop="rel">
              <el-input v-model="formUser.rel" placeholder="上映时间" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="justify-content: flex-end">
          <el-form-item>
            <el-button type="primary" @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-row>
      </div>
    </el-form>
  </el-dialog>
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
.el-form{
  display: flex;
  .img {
    width: 110px;
    height: 180px;
    margin-right: 20px;
    text-align: center;
    .el-form-item{
      margin-right: 0px;
    }
    .el-button{
      position: relative;
      bottom: -10px;
    }
  }
}
</style>